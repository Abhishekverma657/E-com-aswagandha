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
  shipping: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
