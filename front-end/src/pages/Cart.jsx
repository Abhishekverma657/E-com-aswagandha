import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const shipping = cartTotal > 1500 ? 0 : 50;

  if (cartItems.length === 0) {
    return (
      <div className="bg-secondary min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-primary">Your Cart is Empty</h1>
        <div className="w-16 h-px bg-accent mx-auto mb-8"></div>
        <p className="opacity-80 font-light mb-10 max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our Ayurvedic formulations to find your balance.
        </p>
        <Link 
          to="/shop" 
          className="bg-primary text-secondary font-bold py-4 px-10 uppercase tracking-[0.2em] text-sm hover:bg-accent transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif mb-12 text-primary text-center">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3">
            {/* Headers */}
            <div className="hidden md:grid grid-cols-6 gap-4 border-b border-primary/20 pb-4 text-xs font-bold uppercase tracking-widest text-primary/60 mb-6">
              <div className="col-span-3">Product</div>
              <div className="col-span-1 text-center">Price</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-right">Total</div>
            </div>

            {/* Items */}
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center border-b border-primary/10 pb-8 animate-fade-in-up">
                  
                  {/* Product Details */}
                  <div className="col-span-1 md:col-span-3 flex items-center gap-6">
                    <div className="w-24 h-32 bg-white border border-primary/10 flex-shrink-0 overflow-hidden shadow-sm">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-serif text-xl text-primary hover:text-accent transition-colors block mb-2">
                        {item.title}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-danger hover:text-danger/70 flex items-center gap-1 transition-colors group"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Mobile Price */}
                  <div className="md:hidden flex justify-between items-center text-sm">
                    <span className="text-primary/60 uppercase tracking-widest">Price</span>
                    <span className="font-medium text-accent">₹ {item.price.toFixed(2)}</span>
                  </div>

                  {/* Desktop Price */}
                  <div className="hidden md:block col-span-1 text-center font-medium text-primary/80">
                    ₹ {item.price.toFixed(2)}
                  </div>

                  {/* Quantity Selector */}
                  <div className="col-span-1 flex justify-center">
                    <div className="flex items-center border border-primary/20 bg-white">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 hover:bg-primary/5 transition-colors">-</button>
                      <span className="px-4 py-2 font-medium min-w-[2.5rem] text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 hover:bg-primary/5 transition-colors">+</button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-1 flex justify-between md:justify-end items-center md:block text-right">
                    <span className="md:hidden text-primary/60 text-sm uppercase tracking-widest">Total</span>
                    <span className="font-bold text-accent text-lg">₹ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-8 border border-primary/10 shadow-sm sticky top-32 animate-fade-in">
              <h2 className="font-serif text-2xl mb-6 text-primary border-b border-primary/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8 font-light text-primary/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹ ${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs italic text-accent text-right">
                    Spend ₹ {(1500 - cartTotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>
              
              <div className="flex justify-between items-end mb-8 pt-6 border-t border-primary/10">
                <span className="font-serif text-xl">Total</span>
                <span className="font-bold text-2xl text-accent">₹ {(cartTotal + shipping).toFixed(2)}</span>
              </div>
              
              <button className="w-full bg-accent text-primary font-bold py-4 uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-secondary transition-colors shadow-md">
                Proceed to Checkout
              </button>
              
              <div className="mt-6 text-center text-xs opacity-60 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Secure 256-bit SSL encryption.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
