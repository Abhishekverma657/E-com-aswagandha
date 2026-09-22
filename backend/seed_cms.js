import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ContentSettings from './models/ContentSettings.js';

dotenv.config();

const defaultContentSettings = {
  branding: {
    logoUrl: '',
    siteTitle: 'Nagori'
  },
  heroSliders: [
    { image: '/slider.png', altText: 'Slide 1', link: '/shop' },
    { image: '/Slider1.jpeg', altText: 'Slide 2', link: '/shop' }
  ],
  trustBadges: [
    { iconName: 'ShieldCheck', text: 'Ayush Dept. Licensed' },
    { iconName: 'CheckCircle2', text: 'NABL Lab Tested' },
    { iconName: 'Leaf', text: '100% Vegetarian' },
    { iconName: 'Award', text: 'Over 1 Lakh Happy Customers' }
  ],
  userStories: [
    { image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', name: 'Priya S.', location: 'Mumbai', quote: 'The most authentic ashwagandha I have used. My sleep quality has improved dramatically.' },
    { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', name: 'Rajeev M.', location: 'Delhi', quote: 'I can feel the difference in my energy levels. Highly recommend their premium root extract.' },
    { image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', name: 'Anita K.', location: 'Bangalore', quote: 'Finally, a brand that focuses on real Ayurvedic principles. The quality is unmatched.' }
  ],
  theDifference: {
    title: 'Why Nagori is Different',
    subtitle: 'We do not compromise on authenticity. Our ashwagandha is sourced directly from the arid soils of Nagaur, ensuring the highest concentration of active withanolides.',
    items: [
      { iconName: 'Beaker', title: 'High Withanolide Content', description: 'Our Nagori roots naturally yield a higher percentage of active alkaloids compared to standard ashwagandha.' },
      { iconName: 'CheckCircle2', title: 'Clinically Standardized', description: 'Every batch is standardized to ensure consistent potency and efficacy.' },
      { iconName: 'HeartHandshake', title: 'Direct from Farmers', description: 'Sourced directly from local farmers in Nagaur, supporting fair trade and sustainable agriculture.' }
    ]
  },
  foundersNote: {
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop',
    name: 'ABHISHEK NAGORI',
    title: 'Founder & CEO, Nagori',
    quote: 'From Frustration to Formulation',
    text: 'I started Nagori Ayurveda after realising how hard it is to trust supplements. Labels looked convincing, but I was never sure what was actually inside or if it would actually help. So we built things differently - using clinically studied ingredients in the right forms & doses. Something you can take daily without doubt, and see real progress over time.'
  },
  faqSection: [
    { question: 'Do I Need Supplements If I Eat A Normal Diet?', answer: 'While a balanced diet is ideal, our modern food sources often lack essential trace minerals. Supplements help bridge that gap, especially for targeted needs like stress management or high-performance recovery.' },
    { question: 'What Makes Nagori Different From Others?', answer: 'Nagori focuses on standardized extracts, ensuring you get clinically effective doses of active compounds like withanolides in Ashwagandha, unlike mass-market raw powders.' },
    { question: 'How Do I Know Which Supplement Is Right For Me?', answer: 'It depends on your goals. For stress and sleep, Ashwagandha KSM-66 is ideal. For energy and stamina, Testoboost or Shilajit is recommended.' },
    { question: 'Do Your Supplements Contain Artificial Colors, Flavors Or Preservatives?', answer: 'No, our supplements are 100% vegetarian and free from unnecessary additives, fillers, or artificial preservatives.' }
  ],
  blogSection: [
    { title: 'Fatigue in Monsoon: Why It Happens & What Helps', excerpt: 'There\'s something magical about the monsoon in India, the smell of wet earth, hot chai, pakoras...', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop', link: '/blog/1' },
    { title: 'How to Reduce Inflammation in the Body Naturally', excerpt: 'Have you ever felt tired even after enough sleep? Or noticed that your body aches fo...', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', link: '/blog/2' },
    { title: 'Cognitive Health: Supporting Brain Function Naturally', excerpt: 'By mid-morning, many people start to feel mentally tired. You may have had your tea...', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop', link: '/blog/3' }
  ],
  aboutUs: {
    heroTitle: 'About Nagori Ayurveda',
    heroSubtitle: 'Purity, Science & Authentic Ayurvedic Heritage',
    companyOverview: 'Nagori Ayurveda was founded with a singular purpose: to deliver the purest, single-origin Ayurvedic botanicals directly from the fertile, arid soils of Nagaur, Rajasthan. We bridge ancient Vedic wisdom with modern clinical validation.',
    mission: 'To bridge traditional Vedic wisdom with modern clinical validation, creating uncompromising botanical formulations you can trust daily.',
    vision: 'To become the global gold standard for single-origin, high-potency Ayurvedic nutrition.',
    directors: [
      {
        name: 'Parul Choudhary',
        title: 'Director, Nagori',
        bio: 'Leading the brand’s scientific formulations, clinical quality benchmarks, and ethical community outreach across India.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop'
      },
      {
        name: 'Manak Choudhary',
        title: 'Director, Nagori',
        bio: 'Championing direct-from-farm procurement in Nagaur, zero-middleman farmer partnerships, and world-class sustainable supply chain.',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    values: [
      {
        title: 'Soil-to-Shelf Transparency',
        description: 'Every root is ethically harvested in Nagaur and third-party tested with verifiable batch COAs.',
        iconName: 'CheckCircle2'
      },
      {
        title: 'Clinically Effective Doses',
        description: 'Standardized to maximum active alkaloids and withanolides without artificial fillers or shortcuts.',
        iconName: 'Beaker'
      },
      {
        title: 'Community First',
        description: 'A portion of proceeds directly benefits The Nagauri Welfare Society for local farmer upliftment.',
        iconName: 'HeartHandshake'
      }
    ]
  },
  ourStory: {
    heroTitle: 'Our Story',
    heroSubtitle: 'Rooted in tradition. Crafted for today.',
    intro: 'What started as a humble pursuit to harness the true power of Ayurveda has blossomed into a movement for transparent, uncompromising wellness.',
    chapters: [
      {
        title: 'The Genesis of Nagori',
        subtitle: 'Arid Soil. Exceptional Potency.',
        content: 'What started as a humble pursuit to harness the true power of Ayurveda has blossomed into a movement for transparent, uncompromising wellness. We realized that modern supplements lacked the soul and purity of ancient practices.',
        image: '/ourstory/image1.jpeg'
      },
      {
        title: 'A Problem of Trust',
        subtitle: 'Absolute Transparency.',
        content: "It's hard to trust supplement brands today. You're often left wondering—Is this safe? Is it actually working? We built Nagori to answer these questions with absolute transparency. No hidden proprietary blends, just honest ingredients.",
        image: '/ourstory/image2.jpeg'
      },
      {
        title: 'Sourced from Nature',
        subtitle: 'Centuries of Vedic Wisdom.',
        content: "For generations, our ancestors relied on the earth's purity. We've made it our mission to bridge that ancient wisdom with modern lifestyles, ensuring every formulation is as potent as it is pure.",
        image: '/ourstory/image3.jpeg'
      },
      {
        title: 'Uncompromising Purity',
        subtitle: 'Zero Synthetic Fillers.',
        content: 'No shortcuts. No synthetic fillers. Just the raw, transformative power of nature, respectfully sourced and expertly blended. We oversee every step to guarantee the highest quality.',
        image: '/ourstory/image4.jpeg'
      }
    ],
    bottomCard1: {
      title: 'Crafted with Care',
      image: '/ourstory/image5.jpeg'
    },
    bottomCard2: {
      title: 'Real Results',
      image: '/ourstory/image6.jpeg'
    }
  },
  welfareSociety: {
    heroTitle: 'The Nagauri Welfare Society',
    heroSubtitle: 'Empowering traditional Ashwagandha cultivators of Nagaur, Rajasthan through fair livelihood, ethical farming, and holistic community development.',
    stats: [
      { value: '500+', label: 'Farmer Families' },
      { value: '100%', label: 'Fair Trade Direct' },
      { value: 'Zero', label: 'Middlemen Cut' },
      { value: 'GI Tag', label: 'Authentic Heritage' }
    ],
    initiatives: [
      {
        title: 'Sustainable Agro-Practices',
        description: 'Technical guidance on regenerative arid-zone cultivation, rainwater conservation, and organic certification.',
        iconName: 'Sprout'
      },
      {
        title: 'Direct Financial Security',
        description: 'Purchasing crops directly at guaranteed premium rates above wholesale market volatility, ensuring stable incomes.',
        iconName: 'Users'
      },
      {
        title: 'Community Healthcare & Education',
        description: 'Supporting mobile medical camps, primary health screenings, and educational aid for children of farming families.',
        iconName: 'HeartHandshake'
      }
    ],
    commitments: [
      'Zero synthetic pesticides or chemicals in protected zones',
      'Fair on-spot digital payment directly into farmers\' bank accounts',
      'Preserving native GI Tag Rajasthan heritage root seeds',
      'Annual farmer recognition and excellence awards'
    ]
  },
  footer: {
    phone: '+91-77426-04334',
    email: 'thenagauri@gmail.com',
    address: 'Nagaur, Rajasthan\nIndia - 341001',
    socialLinks: {
      facebook: '#',
      instagram: '#',
      twitter: '#'
    }
  }
};

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB for seeding.");
    
    // Clear and re-seed
    await ContentSettings.deleteMany({});
    const newSettings = new ContentSettings(defaultContentSettings);
    await newSettings.save();
    console.log("Successfully re-seeded ContentSettings.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding ContentSettings:", error);
    process.exit(1);
  });
