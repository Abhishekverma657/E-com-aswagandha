import mongoose from 'mongoose';

const contentSettingsSchema = new mongoose.Schema({
  branding: {
    logoUrl: { type: String, default: '' },
    siteTitle: { type: String, default: 'Nagouri' }
  },
  heroSliders: [
    {
      image: { type: String },
      altText: { type: String, default: 'Slide' },
      link: { type: String, default: '' }
    }
  ],
  trustBadges: [
    {
      iconName: { type: String },
      text: { type: String }
    }
  ],
  userStories: [
    {
      image: { type: String },
      name: { type: String },
      location: { type: String },
      quote: { type: String }
    }
  ],
  videoReviews: [
    {
      videoUrl: { type: String },
      creatorName: { type: String },
      views: { type: String },
      caption: { type: String }
    }
  ],
  theDifference: {
    title: { type: String, default: 'Why Nagouri is Different' },
    subtitle: { type: String, default: 'We focus on authenticity and purity.' },
    items: [
      {
        iconName: { type: String },
        title: { type: String },
        description: { type: String }
      }
    ]
  },
  foundersNote: {
    image: { type: String },
    name: { type: String, default: 'Founder' },
    title: { type: String, default: 'Founder & CEO' },
    quote: { type: String, default: 'Our mission is purity.' },
    text: { type: String, default: 'We built this brand to bring authentic products to the world.' }
  },
  faqSection: [
    {
      question: { type: String },
      answer: { type: String }
    }
  ],
  blogSection: [
    {
      image: { type: String },
      title: { type: String },
      date: { type: String },
      excerpt: { type: String },
      link: { type: String }
    }
  ],
  footer: {
    aboutText: { type: String, default: 'Authentic Ayurvedic Formulations.' },
    address: { type: String, default: '123 Heritage Lane, Rajasthan, India' },
    phone: { type: String, default: '+91 98765 43210' },
    email: { type: String, default: 'support@nagouri.com' },
    socialLinks: {
      instagram: { type: String, default: '#' },
      facebook: { type: String, default: '#' },
      twitter: { type: String, default: '#' }
    }
  }
}, { timestamps: true });

export default mongoose.model('ContentSettings', contentSettingsSchema);
