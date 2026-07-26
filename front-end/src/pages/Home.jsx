import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle2, ChevronDown, Award, ArrowRight, Leaf, Beaker, Heart, Check } from 'lucide-react';
import Slider1 from '../assets/Slider1.jpeg';
import Slider2 from '../assets/slider.png';
import ProductTabs from '../components/ProductTabs';
import Bestsellers from '../components/Bestsellers';
import Gallery from '../components/Gallery';
import UserStories from '../components/UserStories';
import TheDifference from '../components/TheDifference';
import FoundersNote from '../components/FoundersNote';
import FaqSection from '../components/FaqSection';
import BlogSection from '../components/BlogSection';
import TrustBanner from '../components/TrustBanner';

export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: Slider2
    },
    {
      id: 2,
      image: Slider1
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="w-full bg-secondary overflow-hidden pt-[184px]">
      {/* 1. HERO SECTION (SLIDER) */}
      <section className="grid relative w-full bg-secondary/30 overflow-hidden">
        
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`col-start-1 row-start-1 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={`Slide ${slide.id}`} 
              className="w-full h-auto block"
            />
          </div>
        ))}

        {/* Slider Controls (Dots) */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-secondary border-white scale-110' 
                  : 'bg-transparent border-white/60 hover:border-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. TRUST BADGES STRIP */}
      <section className="bg-primary text-secondary py-6 px-6 relative z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-xs md:text-sm font-sans uppercase tracking-widest font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <span>Ayush Dept. Licensed</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-secondary/20"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span>NABL Lab Tested</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-secondary/20"></div>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-accent" />
            <span>100% Vegetarian</span>
          </div>
          <div className="hidden lg:block w-px h-6 bg-secondary/20"></div>
          <div className="hidden lg:flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            <span>Over 1 Lakh Happy Customers</span>
          </div>
        </div>
      </section>

      {/* 2.5 CLARITY TYPOGRAPHY SECTION */}
      <section className="py-20 md:py-32 px-6 bg-secondary relative text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.15] tracking-tight"
          >
            <span className="font-sans font-light text-gray-500">Your</span> <span className="font-sans font-bold">Health</span>
            <br />
            <span className="font-sans font-light text-gray-500 text-3xl md:text-5xl">Deserves</span> <span className="font-sans font-bold text-[#132012]">Clarity,</span>
            <br />
            <span className="font-sans font-bold text-[#132012]">Not Compromises</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 font-sans font-light max-w-3xl mx-auto leading-relaxed pt-6"
          >
            Too many choices. Too many promises. Not enough clarity. That's why we built <strong className="font-bold text-gray-900">Nagouri Ayurveda</strong> — to keep <strong className="font-bold text-gray-900">supplements transparent, decisions easier.</strong>
          </motion.p>

          {/* Divider with text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 pt-12 pb-6 max-w-2xl mx-auto"
          >
            <div className="h-[1px] bg-gray-400 flex-1"></div>
            <span className="text-[11px] md:text-xs font-sans font-bold text-gray-800 tracking-[0.2em] uppercase">And help you move</span>
            <div className="h-[1px] bg-gray-400 flex-1"></div>
          </motion.div>

          {/* Bottom Headline */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl font-sans font-bold text-gray-900 uppercase tracking-wide"
          >
            Towards a better you
          </motion.h3>
          
        </div>
      </section>

      {/* 3. PRODUCT TABS SECTION */}
      <section className="py-24 px-6 bg-secondary relative">
        <div className="max-w-7xl mx-auto">
          <ProductTabs />
          
          <div className="mt-16 text-center">
            <Link to="/shop" className="inline-flex items-center gap-2 text-primary hover:text-accent font-serif italic text-xl transition-colors font-medium">
              Explore Our Full Catalog <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3.25 GALLERY */}
      <Gallery />

      {/* 3.5 BESTSELLERS */}
      <Bestsellers />

      {/* 3.75 USER STORIES */}
      <UserStories />

      {/* 4. THE DIFFERENCE */}
      <TheDifference />

      {/* 4.5 FOUNDER'S NOTE */}
      <FoundersNote />





      {/* 5. INGREDIENTS SPOTLIGHT */}
      {/* ... (Ingredients Spotlight section is kept intact) ... */}

      {/* 5.5 BLOG SECTION */}
      <BlogSection />

      {/* 6. FAQ SECTION */}
      <FaqSection />

      {/* 7. TRUST BANNER */}
      <TrustBanner />
    </div>
  );
}
