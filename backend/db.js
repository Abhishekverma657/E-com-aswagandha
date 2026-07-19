import mongoose from 'mongoose';
import Product from './models/Product.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const initialProducts = [
  {
    id: 1,
    title: "Nagouri Ashwagandha Root Extract (600mg)",
    price: 799.00,
    originalPrice: 1199.00,
    image: "/nagori-ashwagandha.png",
    rating: 4.9,
    reviewCount: 186,
    category: "Ashwagandha",
    description: "Sourced directly from the arid soils of Nagaur, Rajasthan, our premium Ashwagandha extract is standardized to 5% active Withanolides. This high-potency adaptogen is traditionally celebrated for lowering cortisol levels, calming the nervous system, and restoring physical vitality.",
    benefits: [
      "Lowers cortisol levels to reduce daily stress and anxiety",
      "Promotes deep, restful sleep cycles without morning grogginess",
      "Supports physical endurance, muscle recovery, and stamina",
      "Standardized to 5% Withanolides for guaranteed therapeutic potency"
    ],
    ingredients: "100% Pure Nagouri Ashwagandha (Withania somnifera) Root Extract, standardized to 5% Withanolides. Vegetarian capsule shells (HPMC). No fillers or chemicals.",
    usage: "Consume 1 capsule twice daily with lukewarm milk or water, preferably after meals, or as directed by an Ayurvedic physician.",
    sourcing: "Our Ashwagandha is ethically harvested by local farmers in Nagaur, Rajasthan. The dry weather and alkaline soil of this region give Nagouri roots their signature high alkaloid concentration.",
    shipping: "Free shipping included on this order. Dispatched within 24 hours. Delivered in 3-5 business days with secure tracking."
  },
  {
    id: 2,
    title: "Pure Himalayan Shilajit Resin (Gold Grade)",
    price: 1699.00,
    originalPrice: 2398.00,
    image: "/himalayan-shilajit.png",
    rating: 4.95,
    reviewCount: 312,
    category: "Shilajit",
    description: "Harvested from the highest altitudes of the Himalayas (above 16,000 ft), our Gold Grade Shilajit resin is purified using traditional Shodhana methods. Rich in 60%+ Fulvic Acid and over 84 trace minerals, it represents the ultimate natural rejuvenator for cellular energy and immune support.",
    benefits: [
      "Provides natural, sustained energy boost at a cellular level",
      "Contains 60%+ Fulvic Acid to enhance nutrient absorption",
      "Rich in 84+ ionic trace minerals for healthy cognitive function",
      "WHO-GMP certified purification ensures zero heavy metal contamination"
    ],
    ingredients: "100% Pure, Organic Himalayan Shilajit Resin (Gold Grade). Free from artificial additives, heavy metals, or chemical solvents.",
    usage: "Dissolve a pea-sized portion (250mg - 500mg) in warm water, milk, or herbal tea. Drink on an empty stomach first thing in the morning.",
    sourcing: "Sourced responsibly from rock clefts in high-altitude Himalayan ranges. Purified using solar evaporation and traditional water wash methods.",
    shipping: "Free shipping included on this order. Dispatched within 24 hours. Delivered in 3-5 business days with secure tracking."
  },
  {
    id: 3,
    title: "Ashwagandha & Wild Berry Vitality Gummies",
    price: 899.00,
    originalPrice: 1299.00,
    image: "/vitality-gummies.png",
    rating: 4.8,
    reviewCount: 94,
    category: "Gummies",
    description: "Our delicious, pectin-based wellness gummies combine premium Nagouri Ashwagandha with natural wild berries. Formulated for active lifestyles, they offer a convenient, delicious way to balance stress, support cognitive clarity, and boost vitality on the go.",
    benefits: [
      "Delightful natural berry flavor without artificial sweeteners",
      "100% Vegan & Gluten-Free (pectin-based, no gelatin)",
      "Supports mental clarity, cognitive focus, and stress management",
      "Convenient daily nutrition for busy, active lifestyles"
    ],
    ingredients: "Nagouri Ashwagandha Extract (300mg per serving), Natural Wild Berry Juice Extract, Pectin, Organic Cane Sugar, Citric Acid, Sodium Citrate.",
    usage: "Chew 2 gummies daily at any time. No water needed. Do not exceed the recommended daily serving.",
    sourcing: "Formulated in a state-of-the-art facility using organic berry extracts and certified Rajasthan Ashwagandha roots.",
    shipping: "Standard shipping charges of ₹50 apply. Free shipping on orders above ₹1500. Expected delivery: 3-5 business days."
  },
  {
    id: 4,
    title: "Testoboost Combo (Shilajit & Ashwagandha)",
    price: 1599.00,
    originalPrice: 2398.00,
    image: "/himalayan-shilajit.png",
    rating: 4.9,
    reviewCount: 147,
    category: "Combos",
    description: "The ultimate Ayurvedic synergy. This combo combines our high-altitude Himalayan Shilajit Resin (15g) and Nagouri Ashwagandha Capsules (60 count). Together, they regulate stress hormones, optimize mitochondrial energy, and support peak athletic performance.",
    benefits: [
      "Synergistic formula boosts stamina, strength, and vitality",
      "Ashwagandha regulates cortisol while Shilajit rejuvenates cells",
      "Enhances oxygen uptake and stamina during workouts",
      "Excellent value combo saving over 30% compared to separate purchases"
    ],
    ingredients: "Pack includes: 1 jar of Pure Himalayan Shilajit Resin (15g) and 1 bottle of Nagouri Ashwagandha Extract Capsules (60 capsules).",
    usage: "Take Shilajit in the morning with warm water. Take 1 Ashwagandha capsule in the afternoon and 1 at night after meals.",
    sourcing: "Features hand-collected Himalayan Shilajit and farm-direct Nagouri Ashwagandha from Rajasthan.",
    shipping: "Free shipping included on this order. Dispatched within 24 hours. Delivered in 3-5 business days with secure tracking."
  },
  {
    id: 5,
    title: "Nagouri Ashwagandha Churna Powder (200g)",
    price: 599.00,
    originalPrice: 899.00,
    image: "/nagori-ashwagandha.png",
    rating: 4.75,
    reviewCount: 88,
    category: "Ashwagandha",
    description: "Pure, single-origin Nagouri Ashwagandha root powder. Ground slowly at low temperatures to preserve natural oils and active alkaloids. Free from preservatives, fillers, or binding agents, this traditional churna is perfect for mixing into milk decoctions.",
    benefits: [
      "Traditional churna powder ideal for classic Ayurvedic preparations",
      "Slow-ground roots retain maximum nutritional integrity",
      "Supports sleep quality when mixed with warm milk and nutmeg",
      "100% raw, organic, and unadulterated root powder"
    ],
    ingredients: "100% Pure, Organic slow-ground Nagouri Ashwagandha (Withania somnifera) roots. Zero additives.",
    usage: "Mix 1/2 to 1 teaspoon (3g - 5g) in warm milk, water, or honey. Drink before bedtime for sleep support.",
    sourcing: "Grown naturally in Rajasthan. Roots are sun-dried and slowly processed in stone mills.",
    shipping: "Standard shipping charges apply. Free shipping on orders above ₹1500. Expected delivery: 3-5 business days."
  },
  {
    id: 6,
    title: "Deep Sleep Melatonin-Free Capsules",
    price: 1099.00,
    originalPrice: 1499.00,
    image: "/nagori-ashwagandha.png",
    rating: 4.85,
    reviewCount: 112,
    category: "Stress & Sleep",
    description: "A non-habit-forming herbal sleep aid combining Nagouri Ashwagandha with Shankhpushpi, Tagar (Valerian Root), and Jatamansi. Formulated to calm overactive minds, ease nighttime tension, and regulate natural circadian rhythm without synthetic melatonin.",
    benefits: [
      "100% melatonin-free formula prevents dependency and morning grogginess",
      "Calms mind chatter and racing thoughts at bedtime",
      "Supports natural circadian rhythms and deep REM sleep phases",
      "Synergized with traditional calming Ayurvedic herbs"
    ],
    ingredients: "Nagouri Ashwagandha extract, Tagar (Valerian root) extract, Shankhpushpi, Jatamansi, Chamomile extract. Vegetarian capsules.",
    usage: "Take 1-2 capsules 30 minutes before bedtime with warm water or milk.",
    sourcing: "Formulated using carefully selected calming herbs sourced from high-quality farms in India.",
    shipping: "Standard shipping charges apply. Free shipping on orders above ₹1500. Expected delivery: 3-5 business days."
  },
  {
    id: 7,
    title: "Shilajit Gold Resin with 24k Gold Bhasma",
    price: 2099.00,
    originalPrice: 2998.00,
    image: "/himalayan-shilajit.png",
    rating: 4.97,
    reviewCount: 76,
    category: "Shilajit",
    description: "Our signature luxury wellness formulation. We infuse pure Himalayan Shilajit resin with 24k Gold (Swarna Bhasma) and Silver (Rajat Bhasma). This premium blend accelerates tissue renewal, enhances focus, and represents the zenith of Ayurvedic vitality.",
    benefits: [
      "Zenith of rejuvenation, infused with pure Swarna Bhasma (Gold)",
      "Enhances neurological function, memory retention, and focus",
      "Accelerates cellular healing and supports joint health",
      "Comes with an elegant premium gold-plated dosage spoon"
    ],
    ingredients: "Pure Himalayan Shilajit Resin (Gold Grade), Swarna Bhasma (24k Gold), Rajat Bhasma (Silver), Safed Musli extract.",
    usage: "Dissolve a pea-sized amount (250mg) in warm milk or consume directly using the gold spoon. Take in the morning.",
    sourcing: "Hand-harvested from pristine heights and blended with certified Swarna Bhasma prepared through ancient calcination processes.",
    shipping: "Free shipping included on this order. Dispatched within 24 hours. Delivered in 3-5 business days with secure tracking."
  },
  {
    id: 8,
    title: "Ashwagandha KSM-66 & Gokhru-60 Combo",
    price: 1199.00,
    originalPrice: 1848.00,
    image: "/vitality-gummies.png",
    rating: 4.9,
    reviewCount: 135,
    category: "Combos",
    description: "An athletic and vitality combination containing KSM-66 Ashwagandha capsules (60 count) and Gokshura capsules (60 count). Specially formulated for bodybuilders and active fitness enthusiasts seeking natural testosterone support, vascularity, and rapid muscle repair.",
    benefits: [
      "Optimized for sports performance and muscle synthesis",
      "Gokshura supports circulatory health and athletic endurance",
      "Ashwagandha regulates training fatigue and cortisol levels",
      "100% natural, safe for athletes, tested free from banned substances"
    ],
    ingredients: "Pack includes: 1 bottle of Nagouri Ashwagandha Capsules (60 count) and 1 bottle of Pure Gokshura Extract Capsules (60 count).",
    usage: "Take 1 capsule of Ashwagandha and 1 capsule of Gokshura together twice daily after meals.",
    sourcing: "Grown in nutrient-dense soils under supervised organic agricultural guidelines.",
    shipping: "Standard shipping charges apply. Free shipping on orders above ₹1500. Expected delivery: 3-5 business days."
  }
];

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecom-ashwagandha';
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
    
    // Seed products data if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(initialProducts);
      console.log('Products database seeded successfully');
    }

    // Seed default admin account if none exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = bcrypt.hashSync('AdminPassword123!', 10);
      const adminUser = new User({
        name: 'Nagouri Admin',
        email: 'admin@nagouri.com',
        password: hashedPassword,
        role: 'admin',
        cart: [],
        savedProducts: [],
        addresses: []
      });
      await adminUser.save();
      console.log('Default admin account seeded successfully (admin@nagouri.com / AdminPassword123!)');
    }
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}
