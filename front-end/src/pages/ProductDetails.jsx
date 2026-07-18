import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Star, ShieldCheck, Truck, RefreshCw, Sparkles, Award } from 'lucide-react';

const productsDatabase = {
  1: {
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
  2: {
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
  3: {
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
  4: {
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
  5: {
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
  6: {
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
  7: {
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
  8: {
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
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');

  // Load product from database or default to product ID 1
  const product = useMemo(() => {
    const productId = parseInt(id) || 1;
    return productsDatabase[productId] || productsDatabase[1];
  }, [id]);

  const displayOriginalPrice = product.originalPrice || Math.round(product.price * 1.4);
  const savings = displayOriginalPrice - product.price;

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'inc') setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="bg-secondary min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Breadcrumb navigation */}
        <div className="mb-10 text-xs uppercase tracking-widest text-dark/50 font-sans">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2.5">/</span>
          <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <span className="mx-2.5">/</span>
          <span className="text-primary font-medium">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Product Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] bg-white flex items-center justify-center border border-primary/5 rounded-sm overflow-hidden shadow-md group">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-[90%] h-[90%] object-contain p-4 transition-transform duration-700 group-hover:scale-105" 
              />
              <span className="absolute top-6 left-6 bg-primary text-accent text-[10px] font-bold py-1 px-3 tracking-widest uppercase rounded-xs">
                {product.category}
              </span>
            </div>
          </div>

          {/* Right Column: Product Info panel */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-primary leading-tight">{product.title}</h1>
            
            {/* Rating Star ribbon */}
            <div className="flex items-center gap-2 mb-6 font-sans">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-dark/70">
                {product.rating} ★ ({product.reviewCount} Customer Reviews)
              </span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-4 mb-8 border-b border-primary/5 pb-6">
              <span className="text-3xl md:text-4xl text-primary font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-dark/45 line-through text-lg font-light">₹{displayOriginalPrice.toLocaleString('en-IN')}</span>
              <span className="bg-accent/15 text-accent text-xs font-bold px-3 py-1 rounded-sm border border-accent/25">
                Save ₹{savings.toLocaleString('en-IN')}
              </span>
            </div>
            
            {/* Description */}
            <div className="mb-8 text-sm md:text-base text-dark/75 leading-relaxed font-sans font-light">
              <p>{product.description}</p>
            </div>

            {/* Key Benefits */}
            <div className="mb-10 bg-white p-6 border border-primary/5 rounded-sm shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-4 text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" /> Key Benefits
              </h3>
              <ul className="space-y-3.5 text-sm text-dark/75 font-sans font-light">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-primary/10 bg-white rounded-sm">
                <button 
                  onClick={() => handleQuantity('dec')} 
                  className="px-5 py-4 hover:bg-primary/5 transition-colors text-lg font-light text-primary"
                  aria-label="Decrease Quantity"
                >-</button>
                <span className="px-6 py-4 font-bold min-w-[3.5rem] text-center text-sm font-sans">{quantity}</span>
                <button 
                  onClick={() => handleQuantity('inc')} 
                  className="px-5 py-4 hover:bg-primary/5 transition-colors text-lg font-light text-primary"
                  aria-label="Increase Quantity"
                >+</button>
              </div>
              
              {/* Add to Cart button */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-secondary hover:bg-primary-light font-bold py-4.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md"
              >
                Add to Cart
              </button>
            </div>
            
            {/* Buy it Now button */}
            <button 
              onClick={handleBuyNow}
              className="w-full bg-accent text-primary hover:bg-accent-dark font-bold py-4.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 mb-10 rounded-sm shadow-md border border-accent/20"
            >
              Buy It Now
            </button>

            {/* Fast checkout trust signals */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-primary/5 py-5 mb-10 text-center text-[10px] text-dark/70 uppercase tracking-wider font-semibold font-sans">
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>WHO-GMP Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-accent" />
                <span>Free & Safe Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RefreshCw className="w-5 h-5 text-accent" />
                <span>30-Day Money-Back</span>
              </div>
            </div>

            {/* Tabs panel */}
            <div className="border border-primary/5 bg-white p-6 rounded-sm shadow-sm">
              <div className="flex space-x-6 mb-6 font-serif text-sm md:text-base border-b border-primary/5 pb-2">
                <button 
                  className={`pb-2 font-bold tracking-wide transition-all ${activeTab === 'ingredients' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('ingredients')}
                >Ingredients</button>
                <button 
                  className={`pb-2 font-bold tracking-wide transition-all ${activeTab === 'usage' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('usage')}
                >How to Use</button>
                <button 
                  className={`pb-2 font-bold tracking-wide transition-all ${activeTab === 'sourcing' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('sourcing')}
                >Sourcing</button>
                <button 
                  className={`pb-2 font-bold tracking-wide transition-all ${activeTab === 'shipping' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('shipping')}
                >Shipping</button>
              </div>
              
              <div className="text-dark/75 font-sans font-light text-sm leading-relaxed min-h-[110px] animate-fadeIn">
                {activeTab === 'ingredients' && (
                  <p className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{product.ingredients}</span>
                  </p>
                )}
                {activeTab === 'usage' && <p>{product.usage}</p>}
                {activeTab === 'sourcing' && <p>{product.sourcing}</p>}
                {activeTab === 'shipping' && <p>{product.shipping}</p>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
