import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from './db.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Order from './models/Order.js';
import Contact from './models/Contact.js';
import User from './models/User.js';
import SiteSettings from './models/SiteSettings.js';
import ContentSettings from './models/ContentSettings.js';
import Review from './models/Review.js';
import auth from './middleware/auth.js';
import admin from './middleware/admin.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadImage, deleteFile } from './services/s3.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Removed local saveBase64Image in favor of S3

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5048;
const JWT_SECRET = process.env.JWT_SECRET || 'nagouri_premium_secret_key_123!';

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors(

));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logger middleware for testing
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// --- Authentication Endpoints ---

// 1. Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create and save user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      cart: [],
      savedProducts: []
    });

    const savedUser = await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email, role: savedUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        cart: savedUser.cart,
        savedProducts: savedUser.savedProducts,
        addresses: savedUser.addresses,
        role: savedUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        cart: user.cart,
        savedProducts: user.savedProducts,
        addresses: user.addresses,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get Current User Info
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      cart: user.cart,
      savedProducts: user.savedProducts,
      addresses: user.addresses,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- User Profile / Personalization Endpoints (Protected) ---

// 4. Sync Cart
app.put('/api/users/cart', auth, async (req, res) => {
  try {
    const { cart } = req.body; // array of { id, quantity }
    if (!cart) {
      return res.status(400).json({ error: 'Cart data is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { cart },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Toggle Saved Product (Wishlist)
app.put('/api/users/saved', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (productId === undefined) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const index = user.savedProducts.indexOf(productId);
    if (index > -1) {
      // Remove product ID
      user.savedProducts.splice(index, 1);
    } else {
      // Add product ID
      user.savedProducts.push(productId);
    }

    await user.save();
    res.json({ savedProducts: user.savedProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Get Saved Products (Full Details)
app.get('/api/users/saved-products', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all products whose sequential 'id' is in the saved list
    const products = await Product.find({ id: { $in: user.savedProducts } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Get User Order History
app.get('/api/users/orders', auth, async (req, res) => {
  try {
    // Find all orders associated with this user ID or user email, ordered by newest first
    const orders = await Order.find({
      $or: [
        { userId: req.user.id },
        { email: req.user.email.toLowerCase() }
      ]
    }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7.1 Update user profile (name, email)
app.put('/api/users/profile', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.user.id } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use by another account' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email.toLowerCase();
    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      cart: user.cart,
      savedProducts: user.savedProducts,
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7.2 Add new shipping address
app.post('/api/users/addresses', auth, async (req, res) => {
  try {
    const { firstName, lastName, address, city, state, zipCode, phone, isDefault } = req.body;
    if (!firstName || !lastName || !address || !city || !state || !zipCode || !phone) {
      return res.status(400).json({ error: 'All address fields are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (isDefault) {
      user.addresses.forEach(addr => { addr.isDefault = false; });
    }

    user.addresses.push({ firstName, lastName, address, city, state, zipCode, phone, isDefault });
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7.3 Edit shipping address
app.put('/api/users/addresses/:addressId', auth, async (req, res) => {
  try {
    const { firstName, lastName, address, city, state, zipCode, phone, isDefault } = req.body;
    if (!firstName || !lastName || !address || !city || !state || !zipCode || !phone) {
      return res.status(400).json({ error: 'All address fields are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const addr = user.addresses.id(req.params.addressId);
    if (!addr) {
      return res.status(404).json({ error: 'Address not found' });
    }

    if (isDefault) {
      user.addresses.forEach(a => { a.isDefault = false; });
    }

    addr.firstName = firstName;
    addr.lastName = lastName;
    addr.address = address;
    addr.city = city;
    addr.state = state;
    addr.zipCode = zipCode;
    addr.phone = phone;
    addr.isDefault = isDefault;

    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7.4 Delete shipping address
app.delete('/api/users/addresses/:addressId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.addresses.pull({ _id: req.params.addressId });
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// CATEGORY ROUTES (Admin Only for POST/PUT/DELETE)
// ==========================================

// Get all categories (Public)
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create category (Admin)
app.post('/api/admin/categories', auth, admin, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ error: 'Category already exists' });
    res.status(500).json({ error: error.message });
  }
});

// Update category (Admin)
app.put('/api/admin/categories/:id', auth, admin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete category (Admin)
app.delete('/api/admin/categories/:id', auth, admin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// SITE SETTINGS ROUTES (Admin Only)
// ==========================================

// Get settings
app.get('/api/admin/settings', auth, admin, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update settings
app.put('/api/settings', auth, admin, async (req, res) => {
  try {
    const { paymentKeys } = req.body;
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
    }
    
    settings.paymentKeys = paymentKeys;
    await settings.save();
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Content Settings (CMS) Endpoints ---

// 1. Get Public Content
app.get('/api/content', async (req, res) => {
  try {
    const content = await ContentSettings.findOne();
    if (!content) {
      return res.status(404).json({ error: 'Content settings not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Update Content (Admin only)
app.put('/api/admin/content', auth, admin, async (req, res) => {
  try {
    const contentData = req.body;
    let content = await ContentSettings.findOne();
    if (!content) {
      content = new ContentSettings();
    }

    // Handle base64 uploads for Hero Sliders
    if (contentData.heroSliders && contentData.heroSliders.length > 0) {
      for (let slide of contentData.heroSliders) {
        if (slide.image && slide.image.startsWith('data:image')) {
          const s3Url = await uploadImage(slide.image);
          slide.image = s3Url;
        }
      }
    }

    // Handle base64 uploads for User Stories
    if (contentData.userStories && contentData.userStories.length > 0) {
      for (let story of contentData.userStories) {
        if (story.image && story.image.startsWith('data:image')) {
          const s3Url = await uploadImage(story.image);
          story.image = s3Url;
        }
      }
    }

    // Handle base64 upload for Founder Note Image
    if (contentData.foundersNote && contentData.foundersNote.image && contentData.foundersNote.image.startsWith('data:image')) {
      const s3Url = await uploadImage(contentData.foundersNote.image);
      contentData.foundersNote.image = s3Url;
    }

    // Handle base64 uploads for Blog Section
    if (contentData.blogSection && contentData.blogSection.length > 0) {
      for (let blog of contentData.blogSection) {
        if (blog.image && blog.image.startsWith('data:image')) {
          const s3Url = await uploadImage(blog.image);
          blog.image = s3Url;
        }
      }
    }

    // Handle base64 upload for Logo
    if (contentData.branding && contentData.branding.logoUrl && contentData.branding.logoUrl.startsWith('data:image')) {
      const s3Url = await uploadImage(contentData.branding.logoUrl);
      contentData.branding.logoUrl = s3Url;
    }

    Object.assign(content, contentData);
    await content.save();

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update settings
app.put('/api/admin/settings', auth, admin, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
    }
    
    if (req.body.paymentKeys) {
      settings.paymentKeys = {
        ...settings.paymentKeys,
        ...req.body.paymentKeys
      };
    }
    
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// --- Admin Inventory & Orders Endpoints ---
// ============================================

// 1. Create new product
app.post('/api/admin/products', auth, admin, async (req, res) => {
  try {
    const { title, price, originalPrice, image, imageFile, imageName, category, description, benefits, ingredients, usage, sourcing, shipping, codAvailable, stockQuantity, packs, offerText, estimatedDelivery, images, additionalImageFiles } = req.body;
    if (!title || !price || !category || !description) {
      return res.status(400).json({ error: 'Title, price, category, and description are required' });
    }

    let finalImageUrl = image || '/vitality-gummies.png';
    if (imageFile && imageName) {
      finalImageUrl = await uploadImage(imageFile, "products", "image", imageName);
    }
    
    let finalImages = Array.isArray(images) ? [...images] : [];
    if (additionalImageFiles && additionalImageFiles.length > 0) {
      for (const fileObj of additionalImageFiles) {
        if (fileObj.file && fileObj.name) {
          const uploadedUrl = await uploadImage(fileObj.file, "products", "images", fileObj.name);
          finalImages.push(uploadedUrl);
        }
      }
    }

    const maxProduct = await Product.findOne().sort({ id: -1 });
    const nextId = maxProduct ? maxProduct.id + 1 : 1;

    const newProduct = new Product({
      id: nextId,
      title,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price) * 1.4,
      image: finalImageUrl,
      rating: 4.8,
      reviewCount: 1,
      category,
      description,
      benefits: benefits || [],
      ingredients: ingredients || '',
      usage: usage || '',
      sourcing: sourcing || '',
      shipping: shipping || 'Standard shipping charges apply. Free shipping on orders above ₹1500. Expected delivery: 3-5 business days.',
      codAvailable: codAvailable !== undefined ? codAvailable : true,
      stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : 0,
      offerText: offerText || "Flat 5% OFF on Prepaid Orders",
      estimatedDelivery: estimatedDelivery || "2-3 Days",
      images: finalImages,
      packs: Array.isArray(packs) ? packs.map(p => ({
        name: p.name,
        subtitle: p.subtitle,
        price: p.price,
        originalPrice: p.originalPrice,
        stockQuantity: p.stockQuantity,
        isRecommended: p.isRecommended || false
      })) : []
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Edit existing product by numeric id
app.put('/api/admin/products/:id', auth, admin, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { title, price, originalPrice, image, imageFile, imageName, category, description, benefits, ingredients, usage, sourcing, shipping, codAvailable, stockQuantity, packs, offerText, estimatedDelivery, images, additionalImageFiles } = req.body;

    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (title !== undefined) product.title = title;
    if (price !== undefined) product.price = parseFloat(price);
    if (originalPrice !== undefined) product.originalPrice = parseFloat(originalPrice);

    if (imageFile && imageName) {
      product.image = await uploadImage(imageFile, "products", "image", imageName);
    } else if (image !== undefined) {
      product.image = image;
    }

    if (category !== undefined) product.category = category;
    if (description !== undefined) product.description = description;
    if (benefits !== undefined) product.benefits = benefits;
    if (ingredients !== undefined) product.ingredients = ingredients;
    if (usage !== undefined) product.usage = usage;
    if (sourcing !== undefined) product.sourcing = sourcing;
    if (shipping !== undefined) product.shipping = shipping;
    if (codAvailable !== undefined) product.codAvailable = codAvailable;
    if (stockQuantity !== undefined) product.stockQuantity = parseInt(stockQuantity);
    if (offerText !== undefined) product.offerText = offerText;
    if (estimatedDelivery !== undefined) product.estimatedDelivery = estimatedDelivery;
    
    let finalImages = Array.isArray(images) ? [...images] : (product.images || []);
    if (additionalImageFiles && additionalImageFiles.length > 0) {
      for (const fileObj of additionalImageFiles) {
        if (fileObj.file && fileObj.name) {
          const uploadedUrl = await uploadImage(fileObj.file, "products", "images", fileObj.name);
          finalImages.push(uploadedUrl);
        }
      }
    }
    product.images = finalImages;

    if (packs !== undefined) {
      product.packs = packs.map(p => ({
        name: p.name,
        subtitle: p.subtitle,
        price: p.price,
        originalPrice: p.originalPrice,
        stockQuantity: p.stockQuantity,
        isRecommended: p.isRecommended || false
      }));
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Delete product by numeric id
app.delete('/api/admin/products/:id', auth, admin, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findOneAndDelete({ id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', id: productId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Retrieve all orders (across all users)
app.get('/api/admin/orders', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Update order tracking status
app.put('/api/admin/orders/:orderId/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      'Order in process', 'Order accepted', 'Order rejected', 
      'Packed', 'Dispatch', 'On road', 'Delivering today', 
      'Delivered', 'Out of stock', 'Order cancel from admin', 'Order cancel'
    ];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid order tracking status' });
    }

    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Public Product Catalog Endpoints ---

// 8. Get all products (with optional filtering, sorting, price range)
app.get('/api/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    let query = {};

    // Category filter
    if (category && category !== 'All Products') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // Price range filters
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    let productsQuery = Product.find(query);

    // Sorting
    if (sort === 'price-asc') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === 'price-desc') {
      productsQuery = productsQuery.sort({ price: -1 });
    } else if (sort === 'alpha-asc') {
      productsQuery = productsQuery.sort({ title: 1 });
    } else {
      productsQuery = productsQuery.sort({ id: 1 });
    }

    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Get individual product by sequential product id
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Checkout and Order Processing Endpoints ---

// Create Razorpay Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    let settings = await SiteSettings.findOne();
    if (!settings || !settings.paymentKeys || !settings.paymentKeys.razorpayKeyId || !settings.paymentKeys.razorpayKeySecret) {
      return res.status(400).json({ error: 'Razorpay keys not configured' });
    }

    const instance = new Razorpay({
      key_id: settings.paymentKeys.razorpayKeyId,
      key_secret: settings.paymentKeys.razorpayKeySecret,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await instance.orders.create(options);
    res.json({
      order,
      keyId: settings.paymentKeys.razorpayKeyId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Razorpay Payment and Place Order
app.post('/api/payment/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderPayload
    } = req.body;

    let settings = await SiteSettings.findOne();
    const secret = settings?.paymentKeys?.razorpayKeySecret;

    if (!secret) {
      return res.status(400).json({ error: 'Razorpay keys not configured' });
    }

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Payment is verified, now create the order
    const {
      firstName, lastName, email, phone, address, city, state, zipCode,
      items, shippingCost, totalAmount, userId
    } = orderPayload;

    // Verify Stock Availability Before Creating Order
    for (const item of items) {
      const product = await Product.findOne({ id: item.id });
      if (!product) return res.status(404).json({ error: `Product with ID ${item.id} not found` });
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.title}. Only ${product.stockQuantity} left.` });
      }
    }

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderId = `NAG-${randomDigits}`;

    const newOrder = new Order({
      orderId,
      userId: userId || null,
      firstName, lastName, email, phone, address, city, state, zipCode,
      paymentMethod: 'Razorpay',
      items, shippingCost, totalAmount,
      isPaid: true
    });

    const savedOrder = await newOrder.save();

    // Decrement Stock
    for (const item of items) {
      await Product.findOneAndUpdate(
        { id: item.id },
        { $inc: { stockQuantity: -item.quantity } }
      );
    }

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. Place new order (COD)
app.post('/api/orders', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      paymentMethod,
      items,
      shippingCost,
      totalAmount,
      userId // optional, sent from frontend if logged in
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zipCode || !paymentMethod || !items || !items.length) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    if (paymentMethod !== 'COD') {
      return res.status(400).json({ error: 'This endpoint is only for COD orders.' });
    }

    // Verify Stock Availability Before Creating Order
    for (const item of items) {
      const product = await Product.findOne({ id: item.id });
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.id} not found` });
      }
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.title}. Only ${product.stockQuantity} left.` });
      }
    }

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderId = `NAG-${randomDigits}`;

    const newOrder = new Order({
      orderId,
      userId: userId || null, // link user account if provided
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      paymentMethod,
      items,
      shippingCost,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    // Decrement Stock
    for (const item of items) {
      await Product.findOneAndUpdate(
        { id: item.id },
        { $inc: { stockQuantity: -item.quantity } }
      );
    }

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User cancel order
app.put('/api/orders/:orderId/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId, userId: req.user.id });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status !== 'Order in process' && order.status !== 'Order accepted') {
      return res.status(400).json({ error: 'Order cannot be cancelled at this stage' });
    }

    order.status = 'Order cancel';
    await order.save();

    // Restock the items
    for (const item of order.items) {
      await Product.findOneAndUpdate(
        { id: item.id },
        { $inc: { stockQuantity: item.quantity } }
      );
    }

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST user rate a delivered order
app.post('/api/orders/:orderId/rate', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Valid rating between 1 and 5 is required' });
    }

    const order = await Order.findOne({ orderId: req.params.orderId, userId: req.user.id });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (order.status !== 'Delivered') {
      return res.status(400).json({ error: 'You can only rate orders that have been delivered' });
    }

    if (order.isRated) {
      return res.status(400).json({ error: 'You have already rated this order' });
    }

    // Since our e-commerce cart groups multiple products into one order, we'll assign the review to the first product for simplicity
    // Alternatively, if there are multiple items, they would rate individual products, but this fulfills the user's base requirement
    const primaryProductId = order.items.length > 0 ? order.items[0].id : null;
    if (!primaryProductId) {
      return res.status(400).json({ error: 'No products in this order to rate' });
    }

    const review = new Review({
      userId: req.user.id,
      orderId: order.orderId,
      productId: primaryProductId,
      rating: Number(rating),
      comment
    });

    await review.save();

    order.isRated = true;
    await order.save();

    // Update product rating aggregate
    const product = await Product.findOne({ id: primaryProductId });
    if (product) {
      // Very basic aggregate math for the sake of the feature
      const newReviewCount = product.reviewCount + 1;
      const newRating = ((product.rating * product.reviewCount) + Number(rating)) / newReviewCount;
      product.reviewCount = newReviewCount;
      product.rating = parseFloat(newRating.toFixed(1));
      await product.save();
    }

    res.status(201).json({ message: 'Rating submitted successfully', review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'You have already rated this product for this order' });
    }
    res.status(500).json({ error: error.message });
  }
});

// 11. Get order details by custom orderId
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Support / Contacts Endpoints ---

// 12. Submit contact message
app.post('/api/contacts', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      message
    });

    const savedContact = await newContact.save();
    res.status(201).json({ success: true, contact: savedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
