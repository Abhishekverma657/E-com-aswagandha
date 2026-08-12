import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Number, required: true },
  orderId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
}, { timestamps: true });

// A user can only review a product once per order
reviewSchema.index({ userId: 1, productId: 1, orderId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
