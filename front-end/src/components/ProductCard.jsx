import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ id, title, price, image, rating = 4.9, reviewCount = 124, originalPrice }) {
  const { addToCart, cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartItem = cartItems.find(item => item.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Calculate a mock original price if not provided, to show a realistic premium discount
  const displayOriginalPrice = originalPrice || Math.round(price * 1.4);
  const discountPercent = Math.round(((displayOriginalPrice - price) / displayOriginalPrice) * 100);
  const savingsAmount = displayOriginalPrice - price;

  return (
    <div className="group flex flex-col bg-white border border-primary/5 rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(12,60,38,0.03)] hover:shadow-[0_10px_30px_rgba(12,60,38,0.08)] hover:border-accent/30 transition-all duration-500 text-left">
      
      {/* Product Image Area */}
      <Link 
        to={`/product/${id}`} 
        className="w-full relative overflow-hidden aspect-[4/5] bg-secondary/20 flex items-center justify-center border-b border-primary/5"
      >
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-secondary/50 flex items-center justify-center text-primary/30">
            <ShoppingBag className="w-12 h-12 stroke-[1]" />
          </div>
        )}

        {/* Sale & Category Badges */}
        <span className="absolute top-4 left-4 bg-accent text-primary text-[10px] font-bold py-1 px-2.5 uppercase tracking-wider rounded-xs shadow-sm">
          -{discountPercent}% OFF
        </span>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end justify-center pb-6">
          <button className="bg-secondary text-primary hover:bg-accent hover:text-primary font-bold py-3 px-6 uppercase text-[11px] tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg border border-primary/5">
            Quick View
          </button>
        </div>
      </Link>

      {/* Product Details Area */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          {/* Reviews Star Ribbon */}
          <div className="flex items-center gap-1">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current stroke-current" />
              ))}
            </div>
            <span className="text-[11px] text-dark/65 font-medium ml-1">
              {rating} ({reviewCount})
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${id}`} className="block">
            <h3 className="font-serif text-base text-primary font-bold hover:text-accent transition-colors duration-300 leading-snug line-clamp-2 min-h-[44px]">
              {title}
            </h3>
          </Link>
        </div>

        {/* Prices & Action Button */}
        <div>
          <div className="mt-4 pt-3 border-t border-primary/5 flex items-center justify-between">
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-primary font-bold text-base">₹{price.toLocaleString('en-IN')}</span>
              <span className="text-dark/45 line-through text-xs font-light">₹{displayOriginalPrice.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-accent font-semibold ml-0.5">
                (₹{savingsAmount.toLocaleString('en-IN')} OFF)
              </span>
            </div>
          </div>

          {/* Delivery Coordinates */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-dark/50 font-sans font-light">
            <span className="w-1.5 h-1.5 rounded-full bg-accent/80"></span>
            <span>Delivery in 3-4 days • COD Available</span>
          </div>

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
            className={`mt-3.5 w-full font-bold py-3.5 px-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 border shadow-xs rounded-xs cursor-pointer ${
              quantityInCart > 0 
                ? 'bg-accent/15 border-accent text-accent hover:bg-accent hover:text-primary' 
                : 'bg-primary border-primary text-secondary hover:bg-accent hover:border-accent hover:text-primary'
            }`}
          >
            {quantityInCart > 0 ? (
              <Check className="w-4.5 h-4.5 stroke-[2.5]" />
            ) : (
              <ShoppingBag className="w-4.5 h-4.5 stroke-[1.5]" />
            )}
            <span>{quantityInCart > 0 ? `In Cart (${quantityInCart})` : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
