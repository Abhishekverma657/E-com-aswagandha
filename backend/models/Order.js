import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // The product's sequential ID (e.g. 1-8)
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, // custom formatted order ID
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional associated user
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  items: [orderItemSchema],
  shippingCost: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Processing', enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
