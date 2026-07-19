import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const shippingThreshold = 1500;
  const shippingCost = 50;
  const shipping = cartTotal >= shippingThreshold ? 0 : shippingCost;
  const progressToFreeShipping = Math.min((cartTotal / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = shippingThreshold - cartTotal;

  if (cartItems.length === 0) {
    return (
      <div className="bg-secondary min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center animate-fade-in">
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-8">
          <Truck className="w-10 h-10 text-accent stroke-[1]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">Your Cart is Empty</h1>
        <div className="w-16 h-[2px] bg-accent mx-auto mb-6"></div>
        <p className="text-dark/65 font-light mb-10 max-w-md font-sans text-base">
          Unlock your body's natural balance. Explore our farm-direct Nagouri Ashwagandha and Himalayan Shilajit catalog to start your wellness journey.
        </p>
        <Link 
          to="/shop" 
          className="bg-primary text-secondary hover:bg-primary-light font-bold py-4.5 px-12 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-primary text-left tracking-wide">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3">
            {/* Table Headers (Desktop Only) */}
            <div className="hidden md:grid grid-cols-6 gap-4 border-b border-primary/10 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-8 font-sans">
              <div className="col-span-3">Formulation</div>
              <div className="col-span-1 text-center">Unit Price</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-right">Total</div>
            </div>

            {/* Items List */}
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center border-b border-primary/5 pb-8 animate-fade-in-up bg-white p-5 rounded-sm shadow-xs border border-primary/5">
                  
                  {/* Product image & details */}
                  <div className="col-span-1 md:col-span-3 flex items-center gap-6">
                    <div className="w-20 h-24 bg-secondary/30 border border-primary/5 flex-shrink-0 overflow-hidden rounded-xs flex items-center justify-center p-2">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-left space-y-1">
                      <Link to={`/product/${item.id}`} className="font-serif text-lg font-bold text-primary hover:text-accent transition-colors block leading-tight">
                        {item.title}
                      </Link>
                      <span className="text-[10px] bg-secondary text-primary font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs inline-block">
                        {item.category || "Wellness"}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-danger/80 hover:text-danger flex items-center gap-1 transition-colors pt-2 font-medium font-sans"
                        aria-label="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile price row */}
                  <div className="md:hidden flex justify-between items-center text-sm font-sans">
                    <span className="text-primary/60 uppercase tracking-widest text-xs">Price</span>
                    <span className="font-medium text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Desktop unit price */}
                  <div className="hidden md:block col-span-1 text-center font-medium text-dark/75 font-sans">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>

                  {/* Quantity selector */}
                  <div className="col-span-1 flex justify-center">
                    <div className="flex items-center border border-primary/10 bg-white rounded-xs">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        className="px-3 py-1.5 hover:bg-primary/5 transition-colors text-primary"
                        aria-label="Decrease Quantity"
                      >-</button>
                      <span className="px-4 py-1.5 font-bold min-w-[2.2rem] text-center text-xs font-sans">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="px-3 py-1.5 hover:bg-primary/5 transition-colors text-primary"
                        aria-label="Increase Quantity"
                      >+</button>
                    </div>
                  </div>

                  {/* Mobile total row */}
                  <div className="col-span-1 flex justify-between md:justify-end items-center md:block text-right">
                    <span className="md:hidden text-primary/60 text-xs uppercase tracking-widest">Total</span>
                    <span className="font-bold text-accent text-lg font-sans">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-8 border border-primary/5 shadow-md rounded-sm sticky top-36 space-y-6 text-left">
              <h2 className="font-serif text-2xl font-bold text-primary border-b border-primary/5 pb-4 tracking-wide">Order Summary</h2>
              
              {/* Free Shipping Progress bar */}
              <div className="space-y-2.5 font-sans">
                <div className="flex justify-between text-xs text-primary/80">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Truck className="w-4 h-4 text-accent" />
                    {shipping === 0 ? "You've unlocked Free Shipping!" : "Free Shipping Goal"}
                  </span>
                  {shipping > 0 && <span className="font-bold">₹{cartTotal} / ₹{shippingThreshold}</span>}
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-accent h-full transition-all duration-700 ease-out" 
                    style={{ width: `${progressToFreeShipping}%` }}
                  ></div>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-accent font-medium italic">
                    Add ₹{remainingForFreeShipping} more to unlock Free Standard Shipping!
                  </p>
                )}
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-4 font-sans text-sm text-dark/75 border-b border-primary/5 pb-6 pt-2 font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  <span className="font-medium text-primary">
                    {shipping === 0 ? <span className="text-accent font-bold">FREE</span> : `₹${shipping}`}
                  </span>
                </div>
              </div>
              
              {/* Total price */}
              <div className="flex justify-between items-end pt-2">
                <span className="font-serif text-xl font-bold text-primary">Estimated Total</span>
                <span className="font-bold text-2xl text-accent font-sans">₹{(cartTotal + shipping).toLocaleString('en-IN')}</span>
              </div>
              
              {/* Checkout buttons */}
              <button 
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    navigate('/checkout');
                  }
                }}
                className="w-full bg-primary text-secondary hover:bg-primary-light font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Proceed to Checkout</span>
              </button>

              <Link 
                to="/shop" 
                className="block text-center text-xs text-primary/60 hover:text-accent font-sans font-bold uppercase tracking-widest pt-2 transition-colors"
              >
                ← Continue Shopping
              </Link>
              
              {/* Trust footer badges */}
              <div className="border-t border-primary/5 pt-6 space-y-3.5 text-[10px] text-dark/65 font-sans">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Secure 256-bit SSL encrypted gateway.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Cash on Delivery (COD) available nationwide.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Hassle-free 30-day money-back guarantee.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
