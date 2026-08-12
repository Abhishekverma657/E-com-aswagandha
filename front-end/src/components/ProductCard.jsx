import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Check, Truck, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ id, title, subtitle, price, image, rating = 4.7, reviewCount = 300, originalPrice, categoryTag, badge, stockQuantity = 0, packs = [], offerText = "+₹70 OFF on Prepaid", estimatedDelivery = "2-3 Days" }) {
  const { addToCart, cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedPackName, setSelectedPackName] = useState(packs?.length > 0 ? packs[0].name : null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const cartItem = cartItems.find(item => item.id === id && item.packName === selectedPackName);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Active pricing based on pack or base
  let activePrice = price;
  let activeOriginalPrice = originalPrice || Math.round(price * 1.4);
  let activeStock = stockQuantity;
  
  if (selectedPackName && packs.length > 0) {
    const pack = packs.find(p => p.name === selectedPackName);
    if (pack) {
      activePrice = pack.price;
      activeOriginalPrice = pack.originalPrice || Math.round(pack.price * 1.4);
      activeStock = pack.stockQuantity;
    }
  }

  const discountPercent = activeOriginalPrice > activePrice 
    ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100) 
    : 0;
  
  const displaySubtitle = subtitle || "Clinically proven dosage for stress relief, strength & recovery";
  const displayTag = categoryTag || "STRESS RELIEF";

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeStock <= 0) return;
    if (!user) {
      navigate('/login');
      return;
    }
    setIsAddingToCart(true);
    await addToCart({ id, title, price, originalPrice, packs, image }, 1, selectedPackName);
    setIsAddingToCart(false);
  };

  return (
    <div className="group flex flex-col bg-secondary border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left relative">
      
      {/* Product Image Area */}
      <Link 
        to={`/product/${id}`} 
        className="w-full relative overflow-hidden aspect-[4/3] sm:aspect-[4/5] bg-gray-50 flex items-center justify-center"
      >
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
            <ShoppingBag className="w-12 h-12 stroke-[1]" />
          </div>
        )}

        {/* Top-Left Badge (e.g. BEST SELLER) */}
        {badge && (
          <span className="absolute top-3 left-3 bg-secondary/20 backdrop-blur-md border border-white/40 text-white text-[10px] font-bold py-1 px-3 uppercase tracking-wider rounded-full shadow-sm z-10">
            {badge}
          </span>
        )}

        {/* Category Tag Overlay (Bottom Left) */}
        <span className="absolute bottom-3 left-3 bg-[#111827] text-white text-[9px] md:text-[10px] font-bold py-1 px-3 uppercase tracking-wider rounded-md shadow-md z-10">
          {displayTag}
        </span>
        
        {activeStock <= 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 uppercase font-bold text-[10px] tracking-widest rounded-full">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Product Details Area */}
      <div className="p-4 md:p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Title */}
          <Link to={`/product/${id}`} className="block">
            <h3 className="font-sans text-[15px] md:text-[16px] text-gray-900 font-bold hover:text-accent transition-colors duration-300 leading-tight">
              {title}
            </h3>
          </Link>
          
          {/* Subtitle */}
          <p className="text-[12px] md:text-[13px] text-gray-500 font-sans font-light leading-snug line-clamp-2">
            {displaySubtitle}
          </p>

          {/* Reviews Star Ribbon */}
          <div className="flex items-center gap-1 pt-2">
            <div className="flex text-[#65a30d]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-current' : 'fill-transparent'} stroke-current`} />
              ))}
            </div>
            <span className="text-[12px] text-gray-900 font-bold ml-1">{rating}</span>
            <span className="text-[12px] text-gray-500 font-sans ml-1">{reviewCount} ratings</span>
          </div>
        </div>

        {/* Prices & Action Row */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-gray-900 font-bold text-xl md:text-2xl">₹{activePrice.toLocaleString('en-IN')}</span>
              {activeOriginalPrice > activePrice && (
                <span className="text-gray-400 line-through text-sm">₹{activeOriginalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            {/* Discount Tag */}
            {discountPercent > 0 && (
              <span className="bg-[#f0fdf4] text-[#166534] font-bold text-[11px] px-2 py-1 rounded-sm">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Delivery Info */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] md:text-[12px] text-gray-600 font-sans">
            <Truck className="w-4 h-4 text-gray-700" />
            <span>Estimated Delivery in {estimatedDelivery}</span>
          </div>

          {/* Action Buttons Row */}
          <div className="mt-4 flex gap-2 w-full">
            {packs?.length > 0 ? (
              <select 
                value={selectedPackName || ''} 
                onChange={(e) => setSelectedPackName(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-2 py-2 text-[12px] md:text-[13px] font-sans font-medium text-gray-800 hover:border-gray-400 outline-none cursor-pointer bg-secondary"
              >
                {packs.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            ) : (
              <div className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[12px] md:text-[13px] font-sans font-medium text-gray-800 bg-secondary/50 text-center flex items-center justify-center">
                Standard
              </div>
            )}
            <button
              disabled={activeStock <= 0 || isAddingToCart}
              onClick={handleAddToCart}
              className={`flex-1 font-bold py-2 px-3 text-[12px] md:text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-1 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                quantityInCart > 0 
                  ? 'bg-accent-dark text-white'
                  : 'bg-primary text-white hover:bg-primary-light'
              }`}
            >
              {isAddingToCart ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : activeStock <= 0 ? 'SOLD OUT' : quantityInCart > 0 ? (
                <>
                  <Check className="w-4 h-4" /> Added
                </>
              ) : (
                <>
                  <span className="text-lg leading-none mb-0.5">+</span> ADD
                </>
              )}
            </button>
          </div>

          {/* Bottom Tags */}
          <div className="mt-3 flex justify-between items-center text-[10px] md:text-[11px] font-sans font-bold">
            <span className="text-[#65a30d]" dangerouslySetInnerHTML={{ __html: offerText }}></span>
            <span className="text-gray-400 font-normal">COD Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
