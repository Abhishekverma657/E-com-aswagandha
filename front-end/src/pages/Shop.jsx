import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck, ChevronDown, SlidersHorizontal } from 'lucide-react';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', count: 37 },
    { name: 'Stamina & Vitality', count: 3 },
    { name: 'Stress & Sleep', count: 2 },
    { name: 'Focus & Brain Fog', count: 5 },
    { name: 'Recovery & Joint Mobility', count: 5 },
    { name: 'Low Energy & Fatigue', count: 7 },
    { name: 'Functional Support', count: 4 },
    { name: 'Combo', count: 16 },
  ];

  const products = [
    {
      id: 1,
      name: "Testoboost - Lift Harder, Last Longer",
      description: "Supports strength, stamina & sexual performance",
      rating: 4.7,
      reviews: 300,
      price: 1399,
      originalPrice: 1898,
      discount: 499,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1500&auto=format&fit=crop", // gym guy
      delivery: "2-3 Days",
      category: "Stamina & Vitality"
    },
    {
      id: 2,
      name: "Ashwagandha KSM-66 (600 mg)",
      description: "Clinically proven dosage for stress relief, strength & recovery",
      rating: 4.7,
      reviews: 399,
      price: 1299,
      originalPrice: 2398,
      discount: 1099,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1500&auto=format&fit=crop", // stretching
      delivery: "2-3 Days",
      category: "Stress & Sleep"
    },
    {
      id: 3,
      name: "Multivitamin Tablets for Men",
      description: "Complete daily nutrition for energy, immunity & performance",
      rating: 4.3,
      reviews: 105,
      price: 1099,
      originalPrice: 1398,
      discount: 299,
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1500&auto=format&fit=crop", // abstract tech/health
      delivery: "2-3 Days",
      category: "Functional Support"
    },
    {
      id: 4,
      name: "Plant-Based Omega-3 - The Vegan Alternative to Fish Oil",
      description: "Vegan Omega-3 Without Fishy Burps",
      rating: 4.2,
      reviews: 75,
      price: 1999,
      originalPrice: 2398,
      discount: 399,
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1500&auto=format&fit=crop", // runner
      delivery: "2-3 Days",
      category: "Functional Support"
    },
    {
      id: 5,
      name: "Pure Original Himalayan Shilajit",
      description: "Authentic shilajit for long lasting energy & peak performance",
      rating: 4.8,
      reviews: 820,
      price: 1499,
      originalPrice: 2199,
      discount: 700,
      image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1500&auto=format&fit=crop", 
      delivery: "1-2 Days",
      category: "Stamina & Vitality"
    },
    {
      id: 6,
      name: "Multivitamin for Women",
      description: "Daily 360° nutrition for energy, hormones & overall wellness",
      rating: 4.5,
      reviews: 210,
      price: 1099,
      originalPrice: 1398,
      discount: 299,
      image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=1500&auto=format&fit=crop",
      delivery: "2-3 Days",
      category: "Low Energy & Fatigue"
    },
    {
      id: 7,
      name: "Pure Amla Juice - With 2X Vitamin C",
      description: "For Hair That Grows & Skin That Glows",
      rating: 4.6,
      reviews: 440,
      price: 499,
      originalPrice: 799,
      discount: 300,
      image: "https://images.unsplash.com/photo-1590308709564-9b578c7c933c?q=80&w=1500&auto=format&fit=crop",
      delivery: "2-3 Days",
      category: "Functional Support"
    },
    {
      id: 8,
      name: "Plant Based Vitamin B12",
      description: "Daily B12 support for energy, nerves & mental clarity",
      rating: 4.5,
      reviews: 180,
      price: 699,
      originalPrice: 999,
      discount: 300,
      image: "https://images.unsplash.com/photo-1608248593842-83b38c234a92?q=80&w=1500&auto=format&fit=crop",
      delivery: "2-3 Days",
      category: "Focus & Brain Fog"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      
      {/* Hero Banner Section */}
      <div className="w-full relative bg-[#050505] min-h-[300px] md:min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-90">
          <img 
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2000&auto=format&fit=crop" 
            alt="Supplements" 
            className="w-full h-full object-cover object-left"
          />
          {/* Gradient fade to merge image with black background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-12 w-full">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-sans font-bold leading-[1.2] tracking-tight max-w-xl">
            SUPPLEMENTS MADE <br/>
            FOR RESULTS YOU <br/>
            CAN ACTUALLY FEEL
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-12">
        
        {/* Header and Filters */}
        <div className="mb-10 flex items-end justify-between flex-wrap gap-6">
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-[1px] bg-gray-400"></div>
              <span className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase text-gray-900">Browse By</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 tracking-tight">Shop</h2>
          </div>

          <button className="flex items-center gap-2 bg-[#1b2633] text-white px-5 py-2.5 rounded hover:bg-[#2c3b4d] transition-colors font-sans text-sm font-medium">
            <SlidersHorizontal className="w-4 h-4" /> Filter By
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full border text-[13px] font-sans transition-all duration-300 ${
                activeCategory === cat.name 
                ? 'bg-[#1a232c] text-white border-[#1a232c]' 
                : 'bg-white text-gray-700 border-gray-600 hover:border-gray-900'
              }`}
            >
              <span className="font-medium">{cat.name}</span>
              <span className={`text-[11px] ${activeCategory === cat.name ? 'text-gray-300' : 'text-gray-500'}`}>({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-sm overflow-hidden">
              
              {/* Image */}
              <Link to={`/product/${product.id}`} className="relative aspect-[4/5] bg-[#f5f5f5] w-full block overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-sans font-bold text-[15px] text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans font-light text-[12px] text-gray-500 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="flex text-[#85b525]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-sans font-bold text-[12px] text-gray-900 ml-1">{product.rating}</span>
                  <span className="font-sans text-[12px] text-gray-400 font-light">{product.reviews} ratings</span>
                </div>

                {/* Price block */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans font-bold text-xl text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="font-sans text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="bg-[#f0fdf4] text-[#166534] font-sans font-bold text-[10px] px-2 py-0.5 rounded-sm border border-[#dcfce7]">
                      ₹{product.discount} OFF
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <Truck className="w-4 h-4 text-gray-600" />
                    <span className="font-sans text-[11px] text-gray-600">Estimated Delivery in <span className="font-semibold">{product.delivery}</span></span>
                  </div>

                  {/* Add to Cart Controls */}
                  <div className="flex h-11 border border-gray-200 rounded-sm overflow-hidden mb-2">
                    <button className="flex-1 bg-white text-gray-700 font-sans text-sm font-medium flex items-center justify-between px-3 hover:bg-gray-50 transition-colors">
                      Pack of 2 <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="w-[1px] bg-gray-200"></div>
                    <button className="flex-1 bg-[#16202c] hover:bg-[#253549] text-white font-sans text-[13px] font-bold uppercase tracking-wider transition-colors">
                      + ADD
                    </button>
                  </div>

                  {/* Footer tags */}
                  <div className="flex items-center justify-between font-sans text-[10px] text-[#258750] font-medium px-1">
                    <span>+₹70 OFF on Prepaid</span>
                    <span className="text-gray-400 font-light">COD Available</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
