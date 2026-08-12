import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  description: { type: String, required: true },
  benefits: [{ type: String }],
  ingredients: { type: String, required: true },
  usage: { type: String, required: true },
  sourcing: { type: String, required: true },
  shipping: { type: String, required: true },
  codAvailable: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 0 },
  offerText: { type: String, default: "Flat 5% OFF on Prepaid Orders" },
  estimatedDelivery: { type: String, default: "2-3 Days" },
  images: [{ type: String }],
  packs: [{
    name: { type: String, required: true }, // e.g. 'Pack of 1'
    subtitle: { type: String }, // e.g. '60 Tablets'
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    stockQuantity: { type: Number, default: 0 },
    isRecommended: { type: Boolean, default: false }
  }]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
