import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Check, Truck, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ id, title, subtitle, price, image, rating = 4.7, reviewCount = 300, originalPrice, categoryTag, badge }) {
  const { addToCart, cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartItem = cartItems.find(item => item.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Calculate a mock original price if not provided
  const displayOriginalPrice = originalPrice || Math.round(price * 1.4);
  const savingsAmount = displayOriginalPrice - price;
  
  // Dummy data based on Rasayanam screenshot if not provided
  const displaySubtitle = subtitle || "Clinically proven dosage for stress relief, strength & recovery";
  const displayTag = categoryTag || "STRESS RELIEF";

  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left relative">
      
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
          <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-md border border-white/40 text-white text-[10px] font-bold py-1 px-3 uppercase tracking-wider rounded-full shadow-sm z-10">
            {badge}
          </span>
        )}

        {/* Category Tag Overlay (Bottom Left) */}
        <span className="absolute bottom-3 left-3 bg-[#111827] text-white text-[9px] md:text-[10px] font-bold py-1 px-3 uppercase tracking-wider rounded-md shadow-md z-10">
          {displayTag}
        </span>
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
              <span className="text-gray-900 font-bold text-xl md:text-2xl">₹{price.toLocaleString('en-IN')}</span>
              <span className="text-gray-400 line-through text-sm">₹{displayOriginalPrice.toLocaleString('en-IN')}</span>
            </div>
            {/* Discount Tag */}
            <span className="bg-[#f0fdf4] text-[#166534] font-bold text-[11px] px-2 py-1 rounded-sm">
              ₹{savingsAmount.toLocaleString('en-IN')} OFF
            </span>
          </div>

          {/* Delivery Info */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] md:text-[12px] text-gray-600 font-sans">
            <Truck className="w-4 h-4 text-gray-700" />
            <span>Estimated Delivery in 2-3 Days</span>
          </div>

          {/* Action Buttons Row */}
          <div className="mt-4 flex gap-2 w-full">
            <button className="flex-1 flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-[12px] md:text-[13px] font-sans font-medium text-gray-800 hover:border-gray-400 transition-colors bg-white">
              Pack of 2
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!user) {
                  navigate('/login');
                  return;
                }
                addToCart({ id, title, price, image }, 1);
              }}
              className={`flex-1 font-bold py-2 px-3 text-[12px] md:text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-1 rounded-md cursor-pointer ${
                quantityInCart > 0 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-[#0f172a] text-white hover:bg-[#1e293b]'
              }`}
            >
              {quantityInCart > 0 ? (
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
            <span className="text-[#65a30d]">+₹70 OFF on Prepaid</span>
            <span className="text-gray-400 font-normal">COD Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
