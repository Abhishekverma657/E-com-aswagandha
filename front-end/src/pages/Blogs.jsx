import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const defaultBlogsData = [
  {
    id: 1,
    title: "Frequent Muscle Cramps During Monsoon? Read This First",
    readTime: "5 min read",
    date: "July 6, 2026",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop",
    category: "Strong Bones & Joints",
    excerpt: "Monsoon humidity and electrolyte imbalances frequently cause nocturnal cramps. Here is how authentic Ayurvedic nutrition helps."
  },
  {
    id: 2,
    title: "Fatigue in Monsoon: Why It Happens & What Helps",
    readTime: "6 min read",
    date: "July 6, 2026",
    image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=2000&auto=format&fit=crop",
    category: "Energy & Strength",
    excerpt: "Unlocking cellular ATP production naturally with potent single-origin withanolide extracts."
  },
  {
    id: 3,
    title: "Top NAC Benefits for NAFLD: Science, Dosage & Safety",
    readTime: "5 min read",
    date: "July 6, 2026",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2000&auto=format&fit=crop",
    category: "Detox & Weight Balance",
    excerpt: "Clinical research on antioxidant pathways and cellular liver detoxification."
  },
  {
    id: 4,
    title: "Best Source of Vitamin D for Indians: Sunlight vs Supplements",
    readTime: "6 min read",
    date: "June 30, 2026",
    image: "https://images.unsplash.com/photo-1525992982823-10e30d740eb4?q=80&w=2000&auto=format&fit=crop",
    category: "Immunity & Everyday Health",
    excerpt: "Why modern lifestyle creates widespread deficiency despite abundant sunlight in India."
  },
  {
    id: 5,
    title: "Magnesium and Blood Pressure: What's the Real Connection?",
    readTime: "6 min read",
    date: "June 19, 2026",
    image: "https://images.unsplash.com/photo-1616422285623-aa30eb070098?q=80&w=2000&auto=format&fit=crop",
    category: "Heart & Blood Sugar Support",
    excerpt: "How chelated magnesium and bioavailable minerals support cardiovascular relaxation."
  },
  {
    id: 6,
    title: "Ashwagandha for Testosterone & Stamina: Science, Dosage & Results",
    readTime: "5 min read",
    date: "April 30, 2026",
    image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2000&auto=format&fit=crop",
    category: "Men's Wellness",
    excerpt: "Standardized Nagori root extract and its proven impact on hormonal harmony and physical endurance."
  }
];

export default function Blogs() {
  const { content } = useContent();
  const [activeCategory, setActiveCategory] = useState('All');

  // Dynamic CMS Blogs
  const blogs = (content?.blogSection && content.blogSection.length > 0)
    ? content.blogSection.map((b, idx) => ({
        id: b._id || `blog-${idx}`,
        title: b.title || 'Ayurvedic Wellness Article',
        readTime: b.readTime || '5 min read',
        date: b.date || 'July 6, 2026',
        image: b.image || defaultBlogsData[idx % defaultBlogsData.length].image,
        category: b.category || 'General Wellness',
        excerpt: b.excerpt || '',
        link: b.link || '#'
      }))
    : defaultBlogsData;

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === activeCategory);

  return (
    <div className="bg-secondary min-h-screen pt-[215px] md:pt-[230px] pb-20">
      
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
                : 'bg-secondary text-gray-700 border-gray-300 hover:border-gray-400'
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
          {filteredBlogs.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.id}`}
              className="group cursor-pointer flex flex-col h-full bg-white/70 rounded-2xl p-5 border border-primary/10 hover:shadow-xl hover:border-primary/30 transition-all text-left"
            >
              {/* Image Container with overlay */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-gray-100 shadow-xs">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-primary text-secondary text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow">
                  {blog.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-gray-900 leading-snug mb-2.5 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  {blog.excerpt && (
                    <p className="text-sm text-gray-600 font-light line-clamp-3 mb-5 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  )}
                </div>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="font-sans font-bold text-[11px] text-gray-600 uppercase tracking-wide">
                    {blog.readTime} <span className="text-gray-300 font-normal mx-1">•</span> <span className="font-medium text-gray-500">{blog.date}</span>
                  </p>
                  <span className="px-4 py-1.5 rounded-full bg-primary text-secondary text-xs font-sans font-bold uppercase tracking-wider group-hover:bg-primary-light transition-colors shadow-xs">
                    Read More
                  </span>
                </div>
              </div>
            </Link>
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
