import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  paymentKeys: {
    razorpayKeyId: { type: String, default: '' },
    razorpayKeySecret: { type: String, default: '' },
    stripePublicKey: { type: String, default: '' },
    stripeSecretKey: { type: String, default: '' }
  }
}, { timestamps: true });

export default mongoose.model('SiteSettings', siteSettingsSchema);
