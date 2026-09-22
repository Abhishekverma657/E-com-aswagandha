import mongoose from 'mongoose';

const contentSettingsSchema = new mongoose.Schema({
  branding: {
    logoUrl: { type: String, default: '' },
    siteTitle: { type: String, default: 'Nagori' },
    tagline: { type: String, default: "India's Heritage - Global Wellness" },
    announcementLine1: { type: String, default: 'NA-1143™' },
    announcementLine2: { type: String, default: 'GI Tag Premium Nagori Ashwagandha Powder & Capsules' }
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
    title: { type: String, default: 'Why Nagori is Different' },
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
  blogSectionHeader: {
    badge: { type: String, default: 'Learn With Us' },
    titlePrefix: { type: String, default: 'Simple reads for' },
    titleHighlight: { type: String, default: 'better health decisions' },
    buttonText: { type: String, default: 'View All Articles' },
    buttonLink: { type: String, default: '/blogs' }
  },
  blogSection: [
    {
      image: { type: String },
      title: { type: String },
      imageTitle: { type: String, default: '' },
      category: { type: String, default: 'Wellness' },
      readTime: { type: String, default: '5 min read' },
      date: { type: String, default: '' },
      excerpt: { type: String },
      content: { type: String, default: '' },
      link: { type: String, default: '' }
    }
  ],
  footer: {
    aboutText: { type: String, default: 'Authentic Ayurvedic Formulations.' },
    address: { type: String, default: '123 Heritage Lane, Rajasthan, India' },
    phone: { type: String, default: '+91-77426-04334' },
    email: { type: String, default: 'support@nagori.com' },
    socialLinks: {
      instagram: { type: String, default: '#' },
      facebook: { type: String, default: '#' },
      twitter: { type: String, default: '#' }
    }
  },
  aboutUs: {
    heroTitle: { type: String, default: 'About Nagori Ayurveda' },
    heroSubtitle: { type: String, default: 'Purity, Science & Authentic Ayurvedic Heritage' },
    companyOverview: { type: String, default: 'Nagori Ayurveda was founded with a singular purpose: to deliver the purest, single-origin Ayurvedic botanicals directly from the fertile, arid soils of Nagaur, Rajasthan.' },
    mission: { type: String, default: 'To bridge traditional Vedic wisdom with modern clinical validation, creating uncompromising botanical formulations you can trust daily.' },
    vision: { type: String, default: 'To become the global gold standard for single-origin, high-potency Ayurvedic nutrition.' },
    directors: [
      {
        name: { type: String, default: 'Parul Choudhary' },
        title: { type: String, default: 'Director, Nagori' },
        quote: { type: String, default: 'Purity, Science & Authentic Ayurvedic Heritage' },
        bio: { type: String, default: 'At Nagori Ayurveda, our vision is to provide uncompromised purity and clinically validated potency. Sourced directly from the arid, nutrient-rich soils of Nagaur, Rajasthan, every batch is crafted to honor traditional Ayurvedic wisdom while meeting the strictest modern quality benchmarks. We believe authentic wellness should be transparent, accessible, and life-changing.' },
        image: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop' }
      },
      {
        name: { type: String, default: 'Manak Choudhary' },
        title: { type: String, default: 'Director, Nagori' },
        quote: { type: String, default: 'From Frustration to True Formulation' },
        bio: { type: String, default: 'Growing up in Rajasthan, we saw firsthand the remarkable potency of indigenous Nagori Ashwagandha. But looking at the modern market, we realized most commercial supplements were heavily processed, diluted, or sourced from compromised soils. We established Nagori with a singular mission: to deliver single-origin, high-withanolide Ayurvedic formulations you can take with total confidence every single day.' },
        image: { type: String, default: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop' }
      }
    ],
    values: [
      {
        title: { type: String, default: 'Soil-to-Shelf Transparency' },
        description: { type: String, default: 'Every root is ethically harvested in Nagaur and third-party tested with verifiable batch COAs.' },
        iconName: { type: String, default: 'CheckCircle2' }
      },
      {
        title: { type: String, default: 'Clinically Effective Doses' },
        description: { type: String, default: 'Standardized to maximum active alkaloids and withanolides without artificial fillers or shortcuts.' },
        iconName: { type: String, default: 'Beaker' }
      },
      {
        title: { type: String, default: 'Community First' },
        description: { type: String, default: 'A portion of proceeds directly benefits The Nagauri Welfare Society for local farmer upliftment.' },
        iconName: { type: String, default: 'HeartHandshake' }
      }
    ]
  },
  ourStory: {
    heroTitle: { type: String, default: 'Our Story' },
    heroSubtitle: { type: String, default: 'Rooted in tradition. Crafted for today.' },
    intro: { type: String, default: 'What started as a humble pursuit to harness the true power of Ayurveda has blossomed into a movement for transparent, uncompromising wellness. We realized that modern supplements lacked the soul and purity of ancient practices.' },
    chapters: [
      {
        title: { type: String, default: 'The Genesis of Nagori' },
        subtitle: { type: String, default: 'Arid Soil. Exceptional Potency.' },
        content: { type: String, default: 'Centuries of Ayurvedic texts have celebrated the roots originating from the desert conditions of Nagaur, Rajasthan. The extreme temperature variations force the Ashwagandha plant to produce unmatched concentrations of bioactive withanolides.' },
        image: { type: String, default: '' }
      },
      {
        title: { type: String, default: 'Bridging Ancient Vedic Science with Modern Labs' },
        subtitle: { type: String, default: 'No shortcuts. Zero compromise.' },
        content: { type: String, default: 'We oversee every step—from seed selection and ethical harvesting by local farmers to gentle low-temperature drying and standardized extraction in GMP-certified facilities.' },
        image: { type: String, default: '' }
      }
    ],
    bottomCard1: {
      title: { type: String, default: 'Crafted with Care' },
      image: { type: String, default: '' }
    },
    bottomCard2: {
      title: { type: String, default: 'Real Results' },
      image: { type: String, default: '' }
    }
  },
  welfareSociety: {
    heroTitle: { type: String, default: 'The Nagauri Welfare Society' },
    heroSubtitle: { type: String, default: 'Empowering traditional Ashwagandha cultivators of Nagaur, Rajasthan through fair livelihood, ethical farming, and holistic community development.' },
    stats: [
      { value: { type: String, default: '500+' }, label: { type: String, default: 'Farmer Families' } },
      { value: { type: String, default: '100%' }, label: { type: String, default: 'Fair Trade Direct' } },
      { value: { type: String, default: 'Zero' }, label: { type: String, default: 'Middlemen Cut' } },
      { value: { type: String, default: 'GI Tag' }, label: { type: String, default: 'Authentic Heritage' } }
    ],
    initiatives: [
      {
        title: { type: String, default: 'Sustainable Agro-Practices' },
        description: { type: String, default: 'Technical guidance on regenerative arid-zone cultivation, rainwater conservation, and organic certification.' },
        iconName: { type: String, default: 'Sprout' }
      },
      {
        title: { type: String, default: 'Direct Financial Security' },
        description: { type: String, default: 'Purchasing crops directly at guaranteed premium rates above wholesale market volatility, ensuring stable incomes.' },
        iconName: { type: String, default: 'Users' }
      },
      {
        title: { type: String, default: 'Community Healthcare & Education' },
        description: { type: String, default: 'Supporting mobile medical camps, primary health screenings, and educational aid for children of farming families.' },
        iconName: { type: String, default: 'HeartHandshake' }
      }
    ],
    commitments: [
      { type: String, default: 'Zero synthetic pesticides or chemicals in protected zones' },
      { type: String, default: 'Fair on-spot digital payment directly into farmers\' bank accounts' },
      { type: String, default: 'Preserving native GI Tag Rajasthan heritage root seeds' },
      { type: String, default: 'Annual farmer recognition and excellence awards' }
    ]
  }
}, { timestamps: true });

export default mongoose.model('ContentSettings', contentSettingsSchema);
