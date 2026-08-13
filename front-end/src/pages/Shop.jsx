import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck, ChevronDown, SlidersHorizontal, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/products`),
          fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        setProducts(prodData);
        setCategories([{ name: 'All' }, ...catData]);
      } catch (err) {
        console.error('Failed to fetch shop data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-secondary min-h-screen pt-[184px] pb-20">
      
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
                : 'bg-secondary text-gray-700 border-gray-600 hover:border-gray-900'
              }`}
            >
              <span className="font-medium">{cat.name}</span>
              <span className={`text-[11px] ${activeCategory === cat.name ? 'text-gray-300' : 'text-gray-500'}`}>
                ({cat.name === 'All' ? products.length : products.filter(p => p.category === cat.name).length})
              </span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
            <span className="text-gray-500 uppercase tracking-widest font-bold text-xs">Loading Formulas...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-medium">No formulas found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stockQuantity <= 0;
              return (
            <div key={product.id} className="group border border-gray-100 bg-secondary hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-sm overflow-hidden">
              
              {/* Image */}
              <Link to={`/product/${product.id}`} className="relative aspect-[4/5] bg-[#f5f5f5] w-full block overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <span className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 uppercase font-bold text-[10px] tracking-widest rounded-full">Out of Stock</span>
                  </div>
                )}
              </Link>
              
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-sans font-bold text-[15px] text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-accent transition-colors">
                    {product.title}
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
                  <span className="font-sans font-bold text-[12px] text-gray-900 ml-1">{product.rating || "4.5"}</span>
                  <span className="font-sans text-[12px] text-gray-400 font-light">{product.reviewCount || "0"} ratings</span>
                </div>

                {/* Price block */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans font-bold text-xl text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="font-sans text-sm text-gray-400 line-through">
                        {product.originalPrice ? `₹${product.originalPrice.toLocaleString('en-IN')}` : ''}
                      </span>
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="bg-[#f0fdf4] text-[#166534] font-sans font-bold text-[10px] px-2 py-0.5 rounded-sm border border-[#dcfce7]">
                        ₹{product.originalPrice - product.price} OFF
                      </div>
                    )}
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <Truck className="w-4 h-4 text-gray-600" />
                    <span className="font-sans text-[11px] text-gray-600 truncate max-w-[200px]" title={product.shipping}>{product.shipping || 'Estimated Delivery in 2-3 Days'}</span>
                  </div>

                  {/* Add to Cart Controls */}
                  <div className="flex h-11 border border-gray-200 rounded-sm overflow-hidden mb-2">
                    <button className="flex-1 bg-secondary text-gray-700 font-sans text-sm font-medium flex items-center justify-between px-3 hover:bg-gray-50 transition-colors">
                      Pack of 2 <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="w-[1px] bg-gray-200"></div>
                    <button 
                      onClick={() => addToCart(product, 1)}
                      disabled={isOutOfStock}
                      className="flex-1 bg-[#16202c] hover:bg-[#253549] text-white font-sans text-[13px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isOutOfStock ? 'Sold Out' : '+ ADD'}
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
            )})}
          </div>
        )}

      </div>
    </div>
  );
}
