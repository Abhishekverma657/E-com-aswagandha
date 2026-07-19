import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, ShieldCheck, CheckCircle2, ChevronDown, Award, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        // Slice the first 4 products to display as featured
        setFeaturedProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggles = [
    {
      q: "What makes Nagouri Ashwagandha different from ordinary ashwagandha?",
      a: "Nagouri Ashwagandha is a premium variety grown in the unique, arid soil of the Nagaur district in Rajasthan. This specific terroir forces the roots to develop a higher concentration of active withanolides (our extract is standardized to 5% withanolides). In contrast, mass-market supplements use unstandardized powders with low efficacy."
    },
    {
      q: "How do I verify the purity of my product?",
      a: "Every batch of Nagouri Ayurveda is tested in NABL-accredited laboratories for heavy metals, pesticides, and microbial counts. You can download the specific lab certificate corresponding to the batch number printed on your jar directly from our website or by scanning the QR code on the packaging."
    },
    {
      q: "Is it safe to consume Shilajit and Ashwagandha together?",
      a: "Yes, Ashwagandha and Shilajit complement each other perfectly. Ashwagandha acts as a powerful adaptogen that reduces stress and regulates cortisol levels, while Shilajit provides 84+ minerals and fulvic acid to enhance cellular energy. Taking them together, as in our Testoboost combo, delivers optimal physical and mental vitality."
    },
    {
      q: "What is the recommended dosage for these supplements?",
      a: "For Nagouri Ashwagandha capsules, we recommend 1 capsule twice daily with warm milk or water after meals. For Shilajit resin, dissolve a pea-sized portion (approx 250-500mg) in warm water, milk, or green tea and consume on an empty stomach in the morning."
    }
  ];

  return (
    <div className="w-full bg-secondary overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary text-secondary overflow-hidden pt-28 pb-16">
        {/* Background Subtle Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
            alt="Organic Soil Background" 
            className="w-full h-full object-cover opacity-15 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Left Content */}
          <div className="flex flex-col space-y-8 text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/20 px-3.5 py-1.5 rounded-full text-accent font-sans text-xs uppercase tracking-[0.2em] w-fit">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Ancient Wisdom • Lab Certified</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-secondary leading-[1.1] tracking-wide">
              The Gold Standard of <br/>
              <span className="text-accent italic font-serif">Nagouri Ashwagandha</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-secondary/80 font-sans font-light max-w-xl">
              Sourced directly from the nutrient-rich, arid soils of Nagaur, Rajasthan. We bring you 100% pure, scientifically-validated Ayurvedic formulations designed to conquer modern stress, restore deep sleep, and optimize physical performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link 
                to="/shop" 
                className="group relative inline-flex items-center justify-center bg-accent text-primary font-bold text-xs sm:text-sm py-4.5 px-10 uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                <span className="relative z-10 group-hover:text-primary">Shop Collection</span>
              </Link>
              <a 
                href="#comparison" 
                className="inline-flex items-center justify-center border border-secondary/35 text-secondary hover:border-accent hover:text-accent font-bold text-xs sm:text-sm py-4.5 px-10 uppercase tracking-[0.2em] transition-all duration-300"
              >
                Why Choose Us
              </a>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="relative flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute w-[80%] aspect-square rounded-full bg-accent/5 blur-3xl -z-10"></div>
            <div className="relative max-w-md md:max-w-lg w-full aspect-[4/5] bg-primary-dark/20 border border-secondary/10 p-8 rounded-sm overflow-hidden flex items-center justify-center group shadow-2xl">
              <img 
                src="/nagori-ashwagandha.png" 
                alt="Nagouri Ashwagandha Capsules Premium Bottle" 
                className="w-[85%] h-[85%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-6 right-6 bg-accent text-primary text-[10px] font-bold tracking-widest uppercase py-2 px-4 border border-secondary/15">
                ★ 5% Withanolides
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* G7 GIFT PRESENTATION BANNER */}
      <section className="bg-primary-dark border-b border-accent/15 py-14 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]"></div>
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
              <Award className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-accent uppercase tracking-[0.25em] text-[10px] font-bold block">A Mark of National Distinction</span>
              <h3 className="font-serif text-2xl font-bold text-secondary mt-1">Presented to G7 World Leaders</h3>
              <p className="text-sm text-secondary/75 font-sans font-light mt-1.5 max-w-xl">
                GI-tagged Nagouri Ashwagandha was selected by the Prime Minister of India as an official state gift for G7 world leaders, processed by our network and delivered to the PMO.
              </p>
            </div>
          </div>
          <div className="border border-accent/30 px-6 py-4 rounded-sm flex flex-col items-center justify-center bg-primary/20 min-w-[200px] text-center">
            <span className="text-accent font-serif italic text-xs">Official Gift Selection</span>
            <span className="text-secondary font-sans font-black tracking-widest text-base mt-0.5">PMO INDIA</span>
          </div>
        </div>
      </section>

      {/* 2. CERTIFICATION RIBBON */}
      <section className="bg-primary-dark border-t border-b border-accent/15 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-20 text-secondary/60">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-accent" />
            <span className="font-serif text-sm tracking-wider uppercase text-secondary/85">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <span className="font-serif text-sm tracking-wider uppercase text-secondary/85">AYUSH DEPT. LICENSED</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="font-serif text-sm tracking-wider uppercase text-secondary/85">WHO-GMP CERTIFIED</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-accent" />
            <span className="font-serif text-sm tracking-wider uppercase text-secondary/85">NABL LAB TESTED</span>
          </div>
        </div>
      </section>

      {/* 3. INGREDIENTS SPOTLIGHT */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold font-sans">Active Botanical Wisdom</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Ingredients in Spotlight</h2>
            <div className="w-16 h-[2px] bg-accent mx-auto"></div>
            <p className="text-dark/65 font-light leading-relaxed">
              We extract only the most potent parts of the plants using zero chemical solvents to ensure standard purity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-secondary/30 p-8 border border-primary/5 hover:border-accent/45 transition-all duration-300 rounded-sm space-y-5">
              <span className="text-accent font-serif text-3xl font-bold">01</span>
              <h3 className="font-serif text-xl font-bold text-primary">Nagouri Ashwagandha</h3>
              <p className="text-dark/70 text-sm font-light leading-relaxed">
                Grown in the arid Rajasthan soils. Known for superior stress reduction, lowering cortisol, and raising core muscle strength.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-secondary/30 p-8 border border-primary/5 hover:border-accent/45 transition-all duration-300 rounded-sm space-y-5">
              <span className="text-accent font-serif text-3xl font-bold">02</span>
              <h3 className="font-serif text-xl font-bold text-primary">Himalayan Shilajit</h3>
              <p className="text-dark/70 text-sm font-light leading-relaxed">
                Purified via traditional Shodhana methods. Packed with 60%+ fulvic acid and 84 trace minerals for direct cellular energy.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-secondary/30 p-8 border border-primary/5 hover:border-accent/45 transition-all duration-300 rounded-sm space-y-5">
              <span className="text-accent font-serif text-3xl font-bold">03</span>
              <h3 className="font-serif text-xl font-bold text-primary">Safed Musli</h3>
              <p className="text-dark/70 text-sm font-light leading-relaxed">
                A highly prized rejuvenation herb that supports energy levels, builds endurance, and promotes healthy tissue regeneration.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-secondary/30 p-8 border border-primary/5 hover:border-accent/45 transition-all duration-300 rounded-sm space-y-5">
              <span className="text-accent font-serif text-3xl font-bold">04</span>
              <h3 className="font-serif text-xl font-bold text-primary">Gokshura</h3>
              <p className="text-dark/70 text-sm font-light leading-relaxed">
                Supports natural testosterone and stamina. Improves kidney filtration and optimizes athletic blood circulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 CINEMATIC ORIGIN & HARVEST VIDEO */}
      <section className="bg-primary text-secondary py-24 px-6 relative overflow-hidden">
        {/* Background sand grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d8b06c_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/20 px-3.5 py-1 rounded-full text-accent font-sans text-[11px] uppercase tracking-[0.2em] w-fit">
              <span>Rajasthan Heritage</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary leading-tight">
              Cinematic Origin: <br/>
              <span className="text-accent italic font-serif">Arid Desert Soil</span>
            </h2>
            <p className="text-base leading-relaxed text-secondary/80 font-sans font-light">
              Witness the authentic cultivation, harvesting, and traditional processing of our GI-tagged Nagouri Ashwagandha in Nagaur, Rajasthan. The extreme desert heat, sparse rainfall, and mineral-dense soil create the perfect environment for synthesizing raw, high-potency adaptogenic roots.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-accent/20">
              <div className="space-y-1">
                <span className="block text-accent font-serif text-2xl font-bold">100%</span>
                <span className="block text-xs uppercase tracking-wider text-secondary/60">Traceable Farms</span>
              </div>
              <div className="space-y-1">
                <span className="block text-accent font-serif text-2xl font-bold">Zero</span>
                <span className="block text-xs uppercase tracking-wider text-secondary/60">Middlemen Sourcing</span>
              </div>
            </div>
          </div>

          {/* Right Video Player Column */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-sm overflow-hidden border border-secondary/15 bg-primary-dark shadow-2xl aspect-video group">
              <video 
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                poster="https://www.nagoriashwagandha.com/product-ashwagandha.jpeg"
              >
                <source src="https://www.nagoriashwagandha.com/nagauri-ashwagandha.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent p-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none flex justify-between items-center text-xs text-secondary/70">
                <span>🎥 Nagaur Farm Harvest video</span>
                <span>Play / Pause to watch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE */}
      <section id="comparison" className="py-24 px-6 bg-secondary/50 border-t border-b border-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold">Compare the Quality</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Nagouri Ayurveda vs Others</h2>
            <div className="w-16 h-[2px] bg-accent mx-auto"></div>
          </div>

          <div className="bg-white border border-primary/10 overflow-hidden shadow-xl rounded-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-secondary">
                  <th className="p-5 font-serif text-base font-semibold tracking-wider w-1/3">Features</th>
                  <th className="p-5 font-serif text-base text-accent font-semibold tracking-wider w-1/3 border-l border-secondary/10">Nagouri Ayurveda</th>
                  <th className="p-5 font-serif text-base font-light opacity-75 tracking-wider w-1/3 border-l border-secondary/10">Ordinary Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10 font-sans text-sm text-dark/80">
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="p-5 font-semibold text-primary">Terroir Sourcing</td>
                  <td className="p-5 text-primary border-l border-primary/5 font-medium">100% Organic Farms in Nagaur, Rajasthan</td>
                  <td className="p-5 border-l border-primary/5 font-light text-dark/60">Mass-market, industrial imports</td>
                </tr>
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="p-5 font-semibold text-primary">Active Compound</td>
                  <td className="p-5 text-primary border-l border-primary/5 font-medium">Standardized extract (5% Withanolides)</td>
                  <td className="p-5 border-l border-primary/5 font-light text-dark/60">Unstandardized raw root powder (under 1%)</td>
                </tr>
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="p-5 font-semibold text-primary">Lab Transparency</td>
                  <td className="p-5 text-primary border-l border-primary/5 font-medium">QR scanner code for batch certificate</td>
                  <td className="p-5 border-l border-primary/5 font-light text-dark/60">No public batch reports available</td>
                </tr>
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="p-5 font-semibold text-primary">Extraction Process</td>
                  <td className="p-5 text-primary border-l border-primary/5 font-medium">Pure aqueous extraction (solvent free)</td>
                  <td className="p-5 border-l border-primary/5 font-light text-dark/60">Chemical alcohol solvents used</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left space-y-4">
              <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold block">Best Sellers</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Featured Formulations</h2>
              <div className="w-16 h-[2px] bg-accent"></div>
            </div>
            <Link to="/shop" className="text-primary hover:text-accent font-serif italic text-lg transition-colors flex items-center gap-2 font-medium">
              View Entire Collection <span className="text-2xl leading-none">&rarr;</span>
            </Link>
          </div>
          
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mb-4"></div>
              <p className="text-xs font-sans font-medium text-primary/60 uppercase tracking-widest">Loading Featured Products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 px-6 bg-secondary/35 border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold">Verified Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">What Our Customers Say</h2>
            <div className="w-16 h-[2px] bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-8 border border-primary/5 shadow-sm space-y-6">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-current" />
                ))}
              </div>
              <p className="text-dark/75 italic font-light text-sm leading-relaxed">
                "I've tried multiple Ashwagandha brands, but the Nagouri extract hits differently. My morning stress levels have dropped significantly, and I feel energized without the afternoon crash."
              </p>
              <div className="border-t border-primary/5 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                  AR
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm">Aman Rathore</h4>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 border border-primary/5 shadow-sm space-y-6">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-current" />
                ))}
              </div>
              <p className="text-dark/75 italic font-light text-sm leading-relaxed">
                "Pure Shilajit is hard to find in India. Most brands feel diluted. The gold cap resin has a strong, authentic earthy smell and dissolves completely in warm milk. Highly recommended!"
              </p>
              <div className="border-t border-primary/5 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                  SP
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm">Sneha Patel</h4>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Verified Buyer</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 border border-primary/5 shadow-sm space-y-6">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-current" />
                ))}
              </div>
              <p className="text-dark/75 italic font-light text-sm leading-relaxed">
                "The gummies are so convenient to carry when traveling. They taste amazing without any artificial sweetener aftertaste. My sleep quality has improved dramatically."
              </p>
              <div className="border-t border-primary/5 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                  VK
                </div>
                <div>
                  <h4 className="font-semibold text-primary text-sm">Vikram Kapoor</h4>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DYNAMIC FAQ SECTION */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold">Got Questions?</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Frequently Asked Questions</h2>
            <div className="w-16 h-[2px] bg-accent mx-auto"></div>
          </div>

          <div className="space-y-4">
            {toggles.map((item, index) => (
              <div 
                key={index} 
                className="border border-primary/10 rounded-sm overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 bg-secondary/20 hover:bg-secondary/40 text-left transition-colors font-serif font-bold text-primary text-base sm:text-lg"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${openFaq === index ? 'transform rotate-180' : ''}`} />
                </button>
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    openFaq === index ? 'max-h-60 opacity-100 border-t border-primary/5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-6 text-sm text-dark/75 leading-relaxed font-light font-sans bg-white">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER BANNER */}
      <section className="py-24 px-6 bg-primary text-secondary text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-radial-gradient from-white to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-accent">Join the Ayurveda Circle</h2>
          <p className="opacity-80 font-light text-base max-w-xl mx-auto leading-relaxed">
            Subscribe to receive holistic wellness routines, new product launches, and exclusive early access to secret sales.
          </p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-primary-light/40 border border-secondary/25 px-4 py-3 text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-accent text-sm"
              required
            />
            <button 
              type="submit" 
              className="bg-accent text-primary hover:bg-white hover:text-primary font-bold uppercase tracking-[0.2em] text-xs py-4 px-8 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

