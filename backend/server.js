import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from './db.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Contact from './models/Contact.js';
import User from './models/User.js';
import auth from './middleware/auth.js';
import admin from './middleware/admin.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to save base64 image
const saveBase64Image = (base64Data, originalName) => {
  try {
    const matches = base64Data.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 image data');
    }

    const ext = matches[1];
    const dataBuffer = Buffer.from(matches[2], 'base64');
    
    // Create a safe, unique filename
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `upload_${Date.now()}_${sanitizedName}`;
    
    // Save path inside front-end/public
    const publicPath = path.join(__dirname, '../front-end/public', filename);
    fs.writeFileSync(publicPath, dataBuffer);
    
    console.log(`Image saved successfully to ${publicPath}`);
    return `/${filename}`;
  } catch (error) {
    console.error('Failed to save image:', error);
    throw error;
  }
};

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5048;
const JWT_SECRET = process.env.JWT_SECRET || 'nagouri_premium_secret_key_123!';

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
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

// ============================================
// --- Admin Inventory & Orders Endpoints ---
// ============================================

// 1. Create new product
app.post('/api/admin/products', auth, admin, async (req, res) => {
  try {
    const { title, price, originalPrice, image, imageFile, imageName, category, description, benefits, ingredients, usage, sourcing, shipping } = req.body;
    if (!title || !price || !category || !description) {
      return res.status(400).json({ error: 'Title, price, category, and description are required' });
    }

    let finalImageUrl = image || '/vitality-gummies.png';
    if (imageFile && imageName) {
      finalImageUrl = saveBase64Image(imageFile, imageName);
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
      shipping: shipping || 'Standard shipping charges apply. Free shipping on orders above ₹1500. Expected delivery: 3-5 business days.'
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
    const { title, price, originalPrice, image, imageFile, imageName, category, description, benefits, ingredients, usage, sourcing, shipping } = req.body;

    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (title !== undefined) product.title = title;
    if (price !== undefined) product.price = parseFloat(price);
    if (originalPrice !== undefined) product.originalPrice = parseFloat(originalPrice);
    
    if (imageFile && imageName) {
      product.image = saveBase64Image(imageFile, imageName);
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
    if (!status || !['Pending', 'Processing', 'Shipped', 'Delivered'].includes(status)) {
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

// 10. Place new order
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
    res.status(201).json(savedOrder);
  } catch (error) {
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
