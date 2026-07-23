import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All', 'Men\'s Wellness', 'Women\'s Wellness', 'Energy & Strength',
    'Better Sleep & Stress Relief', 'Strong Bones & Joints',
    'Heart & Blood Sugar Support', 'Detox & Weight Balance',
    'Immunity & Everyday Health', 'Gut & Digestion', 'Skin, Hair & Beauty'
  ];

  const blogs = [
    {
      id: 1,
      title: "Frequent Muscle Cramps During Monsoon? Read This First",
      readTime: "5 min read",
      date: "July 6, 2026",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop",
      category: "Strong Bones & Joints"
    },
    {
      id: 2,
      title: "Fatigue in Monsoon: Why It Happens & What Helps",
      readTime: "6 min read",
      date: "July 6, 2026",
      image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=2000&auto=format&fit=crop",
      category: "Energy & Strength"
    },
    {
      id: 3,
      title: "Top NAC Benefits for NAFLD: Science, Dosage & Safety",
      readTime: "5 min read",
      date: "July 6, 2026",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2000&auto=format&fit=crop",
      category: "Detox & Weight Balance"
    },
    {
      id: 4,
      title: "Best Source of Vitamin D for Indians: Sunlight vs Supplements",
      readTime: "6 min read",
      date: "June 30, 2026",
      image: "https://images.unsplash.com/photo-1525992982823-10e30d740eb4?q=80&w=2000&auto=format&fit=crop",
      category: "Immunity & Everyday Health"
    },
    {
      id: 5,
      title: "Magnesium and Blood Pressure: What's the Real Connection?",
      readTime: "6 min read",
      date: "June 19, 2026",
      image: "https://images.unsplash.com/photo-1616422285623-aa30eb070098?q=80&w=2000&auto=format&fit=crop",
      category: "Heart & Blood Sugar Support"
    },
    {
      id: 6,
      title: "what is the best time for vitamin d from sunlight?",
      readTime: "5 min read",
      date: "June 19, 2026",
      image: "https://images.unsplash.com/photo-1502472581566-f1c5040f7b0a?q=80&w=2000&auto=format&fit=crop",
      category: "Strong Bones & Joints"
    },
    {
      id: 7,
      title: "Ashwagandha for Testosterone: How It Works, Dosage & Results",
      readTime: "5 min read",
      date: "April 30, 2026",
      image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2000&auto=format&fit=crop",
      category: "Men's Wellness"
    },
    {
      id: 8,
      title: "Best Supplement Brand in India (2026): Top Picks for Quality & Results",
      readTime: "6 min read",
      date: "April 28, 2026",
      image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=2000&auto=format&fit=crop",
      category: "All"
    },
    {
      id: 9,
      title: "Natural Testosterone Supplements: What Actually Works for Men",
      readTime: "6 min read",
      date: "April 8, 2026",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop",
      category: "Men's Wellness"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-36 pb-20">
      
      {/* Breadcrumb */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center text-sm text-gray-500 font-sans font-light">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Blogs</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-[#352516] tracking-tight mb-10">
          Your Wellness Decoded
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded text-sm font-sans font-medium transition-all duration-300 border ${
                activeCategory === category 
                ? 'bg-[#352516] text-white border-[#352516]' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {blogs.map((blog) => (
            <div key={blog.id} className="group cursor-pointer flex flex-col h-full">
              {/* Image Container with overlay to simulate the split graphic look */}
              <div className="relative aspect-[1.6/1] rounded overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="flex-grow flex flex-col">
                <h3 className="font-sans font-bold text-[17px] text-gray-900 leading-snug mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <div className="mt-auto flex items-center justify-between pt-4">
                  <p className="font-sans font-bold text-xs text-gray-900 uppercase tracking-wide">
                    {blog.readTime} <span className="text-gray-400 font-normal mx-1">•</span> <span className="font-medium text-gray-600">{blog.date}</span>
                  </p>
                  <button className="px-5 py-2 rounded-full border border-gray-300 text-xs font-sans font-bold text-gray-900 uppercase hover:bg-gray-50 transition-colors">
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 text-center">
          <button className="bg-[#352516] text-white px-8 py-3.5 rounded font-sans font-medium text-sm tracking-wide hover:bg-[#4a3621] transition-colors">
            Load More
          </button>
        </div>
      </div>

    </div>
  );
}
