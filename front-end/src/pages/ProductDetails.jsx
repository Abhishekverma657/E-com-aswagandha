import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Star, ShieldCheck, Truck, RotateCcw, ChevronDown, Check, Search, Droplets, Zap, Activity, Shield, Pill, HeartPulse, Loader2 } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeImage, setActiveImage] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Zoom state
  const [zoom, setZoom] = useState({ show: false, lensX: 0, lensY: 0, bgX: 0, bgY: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Cursor position relative to container
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Lens dimensions
    const lensSize = 120;
    
    // Lens position bounded
    let lensX = x - lensSize / 2;
    let lensY = y - lensSize / 2;
    
    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > width - lensSize) lensX = width - lensSize;
    if (lensY > height - lensSize) lensY = height - lensSize;

    // Background position for zoom pane (percentage)
    const bgX = (lensX / (width - lensSize)) * 100;
    const bgY = (lensY / (height - lensSize)) * 100;

    setZoom({ show: true, lensX, lensY, bgX, bgY });
  };

  const handleMouseLeave = () => {
    setZoom((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/products/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.image);
        if (data.packs && data.packs.length > 0) {
          setSelectedPack(data.packs[0].name);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen pt-[184px] pb-20 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-xs font-sans font-medium text-gray-500 uppercase tracking-widest">Loading Product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-secondary min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Product Not Found</h1>
        <Link to="/shop" className="bg-gray-900 text-white font-bold py-3 px-8 rounded">
          Return to Shop
        </Link>
      </div>
    );
  }

  const thumbnails = [
    product.image,
    ...(product.images || [])
  ];

  const hasPacks = product?.packs && product.packs.length > 0;
  
  // Find recommended pack id (if any) to use as default fallback
  const recommendedPackId = hasPacks ? product.packs.find(p => p.isRecommended)?.name : null;

  const packs = hasPacks ? product.packs.map((p, index) => ({
    id: p.name,
    name: p.name,
    subtitle: p.subtitle || "",
    tag: p.originalPrice > p.price ? `SAVE ₹${p.originalPrice - p.price}` : '',
    tagColor: index === 0 ? "bg-green-600 text-white" : "bg-[#457b76] text-white",
    badge: p.isRecommended ? "RECOMMENDED" : "",
    mrpDisplay: p.originalPrice || p.price,
    priceDisplay: p.price,
    savePercent: p.originalPrice > p.price ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%` : '',
    quantity: 1, // Treat each pack as a single unit in cart with modified price
    stockQuantity: p.stockQuantity
  })) : [{
    id: 'base',
    name: 'Standard Pack',
    subtitle: '',
    tag: '',
    tagColor: "bg-green-600 text-white",
    badge: '',
    mrpDisplay: product?.originalPrice || product?.price,
    priceDisplay: product?.price,
    savePercent: product?.originalPrice > product?.price ? `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%` : '',
    quantity: 1,
    stockQuantity: product?.stockQuantity || 0
  }];

  const currentPackData = packs.find(p => p.id === (selectedPack || recommendedPackId || packs[0].id)) || packs[0];
  const isOutOfStock = currentPackData.stockQuantity <= 0;

  const packMatch = currentPackData.name.match(/\d+/);
  const packMultiplier = packMatch ? parseInt(packMatch[0], 10) : 1;
  const perPackPrice = Math.round(currentPackData.priceDisplay / packMultiplier);

  const quantityInCart = (() => {
    if (!cartItems || !product || !currentPackData) return 0;
    const item = cartItems.find(i => i.id === product.id && i.packName === (hasPacks ? currentPackData.name : null));
    return item ? item.quantity : 0;
  })();



  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    if (!user) {
      navigate('/login');
      return;
    }
    setIsAddingToCart(true);
    await addToCart(product, quantity, hasPacks ? currentPackData.name : null);
    setIsAddingToCart(false);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) return;
    if (!user) {
      navigate('/login');
      return;
    }
    setIsBuyingNow(true);
    await addToCart(product, quantity, hasPacks ? currentPackData.name : null);
    setIsBuyingNow(false);
    navigate('/cart');
  };

  return (
    <div className="bg-secondary min-h-screen pt-[140px] pb-32 font-sans text-gray-900 overflow-x-hidden">
      
      {/* Breadcrumb - Spans full width */}
      <div className="bg-[#f9fafb] border-b border-gray-100 py-3">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">Home</Link> <span className="mx-1.5">›</span> 
          <Link to="/shop" className="hover:text-gray-900">Shop</Link> <span className="mx-1.5">›</span> 
          <span className="text-gray-800">{product.title}</span>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Image Gallery (Sticky) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-[45%] flex gap-4 lg:sticky top-28 self-start z-50"
        >
          
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 w-16 md:w-20 shrink-0">
            {thumbnails.map((thumb, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(thumb)}
                className={`w-full aspect-square border-2 rounded overflow-hidden ${activeImage === thumb ? 'border-gray-800' : 'border-transparent'}`}
              >
                <img src={thumb} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
              </button>
            ))}
          </div>

          {/* Main Image Container */}
          <div 
            className="flex-1 bg-[#faf8ec] rounded aspect-[4/5] relative flex items-center justify-center p-8 cursor-crosshair group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseMove}
          >
            <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-contain mix-blend-multiply z-20 pointer-events-none" 
            />
            
            {/* Hover Lens */}
            {zoom.show && (
              <div 
                className="absolute border border-gray-400 bg-secondary/20 pointer-events-none z-30 shadow-[0_0_0_9999px_rgba(255,255,255,0.4)]"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  left: `${zoom.lensX}px`, 
                  top: `${zoom.lensY}px` 
                }}
              />
            )}

            {/* Tag */}
            <div className="absolute top-0 left-6 bg-[#3e2e1e] text-white text-xs px-3 py-1.5 font-medium rounded-b-md z-30">
              New & Better
            </div>
            
            {/* Zoomed Image Portal (shows on the right) */}
            {zoom.show && (
              <div 
                className="absolute top-0 left-[102%] w-full aspect-square bg-secondary z-50 border border-gray-200 shadow-2xl rounded pointer-events-none"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${zoom.bgX}% ${zoom.bgY}%`,
                  backgroundSize: '250%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
          </div>
        </motion.div>

        {/* Right Column: Details & Purchasing */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-[55%] flex flex-col lg:pl-4 relative z-0"
        >
          
          <h1 className="text-3xl md:text-[34px] font-bold text-[#1a2936] leading-tight mb-2 tracking-tight">
            {product.title}
          </h1>
          <p className="text-[#3c3021] text-[15px] font-medium mb-4">
            {product.description}
          </p>

          <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#1a2936] border-b border-[#1a2936] leading-none pb-0.5 mr-1">{product.rating || "4.7"}</span>
              <div className="flex text-[#ffb800]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500 underline ml-2 hover:text-gray-800">{product.reviewCount || 105} ratings</span>
            </div>
            
            {/* Badges */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-blue-600 flex items-center justify-center text-blue-600 font-bold text-[8px] text-center leading-[8px]">ISO<br/>9001</div>
              <div className="w-8 h-8 rounded-full border border-green-600 flex items-center justify-center text-green-600 font-bold text-[8px] text-center leading-[8px]">GMP<br/>CERT</div>
              <div className="h-8 flex flex-col justify-center text-green-700 font-serif font-bold text-lg italic leading-none ml-2">fssai</div>
            </div>
          </div>

          {/* What's Different Box */}
          <div className="border border-[#1f4a47] rounded-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#1b373e] to-[#2b5d61] text-white text-center py-2.5 font-bold text-[15px]">
              What's Different?
            </div>
            <div className="bg-[#f2f9f8] p-5 grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[#2b5d61] shadow-sm"><Activity className="w-4 h-4"/></div>
                <span className="text-[#1a2936] text-[13px] font-medium leading-snug pt-1">Premium Extract<br/>Maximum Potency</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[#2b5d61] shadow-sm font-bold text-sm">%</div>
                <span className="text-[#1a2936] text-[13px] font-medium leading-snug pt-1">100% RDA in Every Serving</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[#2b5d61] shadow-sm"><Droplets className="w-4 h-4"/></div>
                <span className="text-[#1a2936] text-[13px] font-medium leading-snug pt-1">Natural Herbs & Antioxidants</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[#2b5d61] shadow-sm"><Zap className="w-4 h-4"/></div>
                <span className="text-[#1a2936] text-[13px] font-medium leading-snug pt-1">Boosts Daily Energy & Vitality</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[#2b5d61] shadow-sm"><Shield className="w-4 h-4"/></div>
                <span className="text-[#1a2936] text-[13px] font-medium leading-snug pt-1">Supports Physical & Mental<br/>Wellness</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[#2b5d61] shadow-sm"><Activity className="w-4 h-4"/></div>
                <span className="text-[#1a2936] text-[13px] font-medium leading-snug pt-1">Tailored for Fast Results</span>
              </div>
            </div>
          </div>

          {/* Pack Selection */}
          <div className="flex flex-col gap-3 mb-6">
            {packs.map((pack) => (
              <div 
                key={pack.id}
                onClick={() => setSelectedPack(pack.id)}
                className={`relative border rounded cursor-pointer transition-all p-4 flex items-center justify-between ${
                  selectedPack === pack.id 
                  ? 'border-green-600 bg-[#f4fbf8]' 
                  : 'border-gray-200 bg-secondary hover:border-gray-300'
                }`}
              >
                {/* Badge if exists */}
                {pack.badge && (
                  <div className="absolute -top-2.5 right-4 bg-[#457b76] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {pack.badge}
                  </div>
                )}
                
                {/* Left side: Image and details */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center p-1 border border-gray-100">
                    <img src={product.image} className="w-full h-full object-contain mix-blend-multiply" alt="pack" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-[15px] text-[#1a2936]">{pack.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${pack.tagColor}`}>{pack.tag}</span>
                    </div>
                    <span className="text-[12px] text-gray-500">{pack.subtitle}</span>
                  </div>
                </div>

                {/* Right side: Prices */}
                <div className="flex flex-col items-end text-right">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-gray-400 line-through text-[13px]">₹{pack.mrpDisplay.toLocaleString('en-IN')}</span>
                    <span className="text-[#1a2936] font-bold text-[17px]">₹{pack.priceDisplay.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-green-600 text-[11px] font-semibold mt-0.5">Save {pack.savePercent}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col">
              <span className="font-medium text-[#1a2936] text-[17px]">{currentPackData.name}</span>
              <span className="text-green-700 font-bold text-[13px]">₹{perPackPrice.toLocaleString('en-IN')} / Pack</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-2xl text-[#1a2936]">₹{currentPackData.priceDisplay.toLocaleString('en-IN')}</span>
                <span className="text-gray-400 line-through text-sm">₹{currentPackData.mrpDisplay.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-gray-400 text-[10px] mt-1">MRP Inclusive. of all taxes</span>
            </div>
          </div>

          {/* Offer Box */}
          {product.offerText && (
            <div className="bg-[#f6eedd] border border-[#e8dcb9] rounded flex items-center justify-center py-2.5 gap-2 mb-6">
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">OFFER</span>
              <div className="w-4 h-4 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">%</div>
              <span className="text-[12px] text-[#3c3021]" dangerouslySetInnerHTML={{ __html: product.offerText }}></span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex gap-3 mb-6 items-stretch h-14">
            
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#e8dcb9] rounded-sm bg-white overflow-hidden w-28 shrink-0">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-[#1a2936] hover:bg-gray-50 transition-colors font-bold text-lg"
              >
                −
              </button>
              <div className="flex-1 h-full flex items-center justify-center font-bold text-[15px] text-[#1a2936] bg-[#fdfdfc] border-x border-[#e8dcb9]">
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-[#1a2936] hover:bg-gray-50 transition-colors font-bold text-lg"
              >
                +
              </button>
            </div>

            {quantityInCart > 0 ? (
              <button 
                onClick={() => navigate('/cart')}
                className="flex-1 font-bold rounded-sm flex items-center justify-center gap-2 transition-colors text-sm bg-green-600 hover:bg-green-700 text-white"
              >
                GO TO CART
              </button>
            ) : (
              <button 
                onClick={handleAddToCart} 
                disabled={isOutOfStock || isAddingToCart || addedSuccess}
                className={`flex-1 font-bold rounded-sm flex items-center justify-center gap-2 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  addedSuccess ? 'bg-green-600 text-white' : 'bg-[#3a2c1f] hover:bg-[#2b1f15] text-white'
                }`}
              >
                 {isAddingToCart ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : (addedSuccess ? '✓ ADDED TO CART' : (isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'))}
              </button>
            )}
            <button 
              onClick={handleBuyNow} 
              disabled={isOutOfStock || isBuyingNow}
              className="flex-1 bg-secondary border border-[#3a2c1f] hover:bg-gray-50 text-[#3a2c1f] font-bold rounded-sm flex items-center justify-center gap-2 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBuyingNow ? <Loader2 className="w-5 h-5 animate-spin text-[#3a2c1f]" /> : 'BUY NOW'}
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 border border-gray-100 rounded mb-8">
            <div className="flex items-center justify-center gap-2 py-3 border-r border-gray-100">
              <Truck className="w-4 h-4 text-[#3a2c1f]" />
              <span className="text-[11px] font-medium text-gray-700">Free Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-3 border-r border-gray-100">
              <Zap className="w-4 h-4 text-[#3a2c1f]" />
              <span className="text-[11px] font-medium text-gray-700">Next Day Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-3">
              <RotateCcw className="w-4 h-4 text-[#3a2c1f]" />
              <span className="text-[11px] font-medium text-gray-700">Easy Returns</span>
            </div>
          </div>



          {/* How to Consume Box */}
          <div className="bg-[#f7f2dc] border-t-0 border border-[#e8dcb9] rounded-b-md p-6 flex flex-col items-center">
            <span className="font-bold text-[#1b3447] text-[15px] mb-6">How to Consume</span>
            <div className="w-full flex justify-between items-start text-center">
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 mb-2 text-[#24424e]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <rect x="4" y="2" width="6" height="20" rx="3" />
                    <rect x="14" y="2" width="6" height="20" rx="3" />
                    <line x1="4" y1="12" x2="10" y2="12" />
                    <line x1="14" y1="12" x2="20" y2="12" />
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-[#1a2936]">2 Tablets Per Day</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 mb-2 text-[#24424e]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M7 12h10" />
                    <path d="M12 7v10" />
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-[#1a2936]">After Breakfast</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 mb-2 text-[#24424e]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                    <text x="12" y="17" textAnchor="middle" fontSize="6" fontWeight="bold" stroke="none" fill="currentColor">60</text>
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-[#1a2936]">60 days (minimum)</span>
              </div>
          </div>
        </div>
        </motion.div>
      </div>


      {/* --- Full Width Banners --- */}

      {/* Dark Marquee Bar */}
      <div className="bg-[#24424e] text-white py-3 overflow-hidden whitespace-nowrap border-y border-white/20 mt-10">
        <div className="flex animate-marquee gap-8 items-center text-[13px] font-medium">
          {Array(8).fill("• 360° Complete Nutrition For Men • 25+ Essential Vitamins & Minerals • No Added Preservatives • No Artificial Colors or Flavors • 100% Safe for Daily Use").map((text, i) => (
            <span key={i} className="inline-block">{text}</span>
          ))}
        </div>
      </div>

      {/* Huge Image Banner */}
      <div className="w-full bg-[#f1efe8] py-16 px-4 md:px-12 relative overflow-hidden min-h-[500px] flex items-center">
        <div className="max-w-[1300px] mx-auto w-full flex flex-col md:flex-row relative z-10">
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
             <img src={product.image} className="w-3/4 max-w-sm object-contain mix-blend-multiply drop-shadow-2xl opacity-90" alt={product.title} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-16 mt-10 md:mt-0">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a2936] mb-6 leading-[1.1]">
              THIS ISN'T YOUR<br/>REGULAR <span className="text-[#3b6b7a]">SUPPLEMENT</span>
            </h2>
            <p className="text-[#1a2936] text-lg max-w-md leading-relaxed font-medium">
              Designed to fill what modern life empties - delivering 100% of daily requirement of vital nutrients with {product.title}.
            </p>
          </div>
        </div>
      </div>

      {/* FOOD ALONE ISN'T ENOUGH ANYMORE */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-[34px] font-bold text-[#1a2936] mb-6">
          FOOD ALONE <span className="text-[#3b6b7a]">ISN'T ENOUGH</span> ANYMORE
        </h2>
        <p className="text-[#3c3021] text-lg font-medium max-w-2xl mx-auto mb-16">
          Even with balanced meals, hidden nutrition gaps could be slowing you down every day.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-[#3a2c1f] p-0.5 rounded-full bg-gray-200" />
              <h3 className="font-bold text-lg text-[#1a2936]">Nutrient-Depleted Food</h3>
            </div>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
              Modern soil, heat processing and storage lower the natural vitamin & mineral content in your meals.
            </p>
            <div className="flex gap-4">
              <div className="bg-[#f5f7f8] p-6 rounded text-center flex-1">
                <span className="text-[#2b7189] text-5xl font-bold">70%</span>
                <p className="text-[11px] text-gray-500 mt-2">Deficient in Magnesium</p>
              </div>
              <div className="bg-[#f5f7f8] p-6 rounded text-center flex-1">
                <span className="text-[#2b7189] text-5xl font-bold">55%</span>
                <p className="text-[11px] text-gray-500 mt-2">Deficient in Vitamin B12</p>
              </div>
            </div>
          </div>
          
          <div className="flex-[0.8] flex justify-center">
            <div className="w-64 h-64 bg-secondary rounded-full shadow-xl relative p-2 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-full mix-blend-multiply" alt="Salad plate" />
            </div>
          </div>

          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-[#3a2c1f] p-0.5 rounded-full bg-gray-200" />
              <h3 className="font-bold text-lg text-[#1a2936]">Stressful Modern Lifestyle</h3>
            </div>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
              Stress, poor sleep and long hours of inactivity reduce your body's ability to absorb nutrients.
            </p>
            <div className="flex gap-4">
              <div className="bg-[#f5f7f8] p-6 rounded text-center flex-1">
                <span className="text-[#2b7189] text-5xl font-bold">50%</span>
                <p className="text-[11px] text-gray-500 mt-2">Deficient in Iron</p>
              </div>
              <div className="bg-[#f5f7f8] p-6 rounded text-center flex-1">
                <span className="text-[#2b7189] text-5xl font-bold">45%</span>
                <p className="text-[11px] text-gray-500 mt-2">Deficient in Calcium</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-gray-200 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-50"
          >
        <div className="max-w-[1300px] mx-auto px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-4 flex-1">
            <img src={product.image} className="w-12 h-12 object-contain p-1 rounded border border-gray-100 bg-secondary mix-blend-multiply" alt="Thumb" />
            <span className="font-bold text-[15px] text-[#1a2936] hidden md:block max-w-[300px] truncate">{product.title}</span>
            
            <div className="ml-auto md:ml-4 border border-gray-200 rounded flex items-center px-3 py-2 bg-secondary min-w-[140px] cursor-pointer hover:border-gray-300">
              <span className="text-[13px] font-medium text-[#1a2936] flex-1">{currentPackData.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <button 
              onClick={handleBuyNow} 
              disabled={isOutOfStock || isBuyingNow}
              className="bg-[#3a2c1f] hover:bg-[#2b1f15] text-white font-bold py-3.5 px-8 rounded flex items-center justify-center gap-2 transition-colors text-[13px] uppercase tracking-wider ml-4 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
            >
              {isBuyingNow ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : `BUY NOW - ₹${currentPackData.priceDisplay.toLocaleString('en-IN')}`}
            </button>
          </div>
          
        </div>
        </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
