import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  cart: [cartItemSchema],
  savedProducts: [{ type: Number }], // Array of product ids (sequential integers, e.g. 1-8)
  addresses: [addressSchema],
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
