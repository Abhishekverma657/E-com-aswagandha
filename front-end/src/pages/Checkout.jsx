import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Truck, CreditCard, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shippingThreshold = 1500;
  const shippingCost = cartTotal >= shippingThreshold ? 0 : 50;
  const totalAmount = cartTotal + shippingCost;

  const [formData, setFormData] = useState({
    firstName: user ? user.name.split(' ')[0] : '',
    lastName: user ? user.name.split(' ').slice(1).join(' ') : '',
    email: user ? user.email : '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'COD' // default Cash on Delivery
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setSubmitting(true);
    setError(null);

    // Prepare order payload
    const orderPayload = {
      ...formData,
      userId: user ? (user.id || user._id) : null,
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      shippingCost,
      totalAmount
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      // Clear the cart
      clearCart();
      // Redirect to confirmation screen using the custom orderId returned from API
      navigate(`/order-confirmation/${data.orderId}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-secondary min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">Your Cart is Empty</h1>
        <div className="w-16 h-[2px] bg-accent mx-auto mb-6"></div>
        <p className="text-dark/65 font-light mb-10 max-w-md font-sans text-base">
          Add some premium Ayurvedic formulations to your cart before proceeding to checkout.
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
    <div className="bg-secondary min-h-screen pt-28 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/cart" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/60 hover:text-accent font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span>Back to Cart</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-primary tracking-wide">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-10 border border-primary/5 rounded-sm shadow-md">
            <h2 className="font-serif text-2xl font-bold text-primary border-b border-primary/5 pb-4 mb-6 tracking-wide">Shipping Address</h2>

            {user && user.addresses && user.addresses.length > 0 && (
              <div className="mb-8 p-5 bg-secondary/35 border border-primary/5 rounded-xs space-y-3">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">Use a Saved Address:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <button
                      key={addr._id}
                      type="button"
                      onClick={() => {
                        setFormData({
                          firstName: addr.firstName,
                          lastName: addr.lastName,
                          email: user.email,
                          phone: addr.phone,
                          address: addr.address,
                          city: addr.city,
                          state: addr.state,
                          zipCode: addr.zipCode,
                          paymentMethod: formData.paymentMethod
                        });
                      }}
                      className="bg-white p-4 border border-primary/10 hover:border-accent transition-all text-left text-xs rounded-xs font-sans space-y-1.5 cursor-pointer shadow-xs hover:shadow-md"
                    >
                      <div className="font-bold text-primary flex justify-between">
                        <span>{addr.firstName} {addr.lastName}</span>
                        {addr.isDefault && <span className="text-[9px] text-accent uppercase font-extrabold tracking-wider bg-accent/15 px-1.5 py-0.5 rounded-xs">Default</span>}
                      </div>
                      <div className="text-dark/75 truncate">{addr.address}</div>
                      <div className="text-dark/50">{addr.city}, {addr.state} - {addr.zipCode}</div>
                      <div className="text-dark/50 font-semibold">{addr.phone}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-sm font-sans">
                <strong>Error:</strong> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 font-sans text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider block">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider block">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider block">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider block">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase tracking-wider block">Shipping Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street name, apartment, unit, etc."
                  className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider block">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider block">State</label>
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider block">ZIP / Postal Code</label>
                  <input 
                    type="text" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-primary border-b border-primary/5 pb-4 pt-6 mb-6 tracking-wide">Payment Method</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cash on Delivery */}
                <label className={`border p-5 rounded-xs flex items-center justify-between cursor-pointer transition-all ${formData.paymentMethod === 'COD' ? 'border-accent bg-accent/5' : 'border-primary/10 hover:border-accent/40'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="COD" 
                      checked={formData.paymentMethod === 'COD'}
                      onChange={handleInputChange}
                      className="accent-accent"
                    />
                    <div className="text-left">
                      <span className="font-bold text-primary block">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-dark/60">Pay with cash upon delivery</span>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-accent" />
                </label>

                {/* Card Mock */}
                <label className={`border p-5 rounded-xs flex items-center justify-between cursor-pointer transition-all ${formData.paymentMethod === 'CARD' ? 'border-accent bg-accent/5' : 'border-primary/10 hover:border-accent/40'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="CARD" 
                      checked={formData.paymentMethod === 'CARD'}
                      onChange={handleInputChange}
                      className="accent-accent"
                    />
                    <div className="text-left">
                      <span className="font-bold text-primary block">Credit / Debit Card</span>
                      <span className="text-[10px] text-dark/60">Pay securely with online cards</span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-accent" />
                </label>
              </div>

              {formData.paymentMethod === 'CARD' && (
                <div className="p-5 bg-secondary/20 border border-primary/5 rounded-xs space-y-4 animate-fade-in text-left">
                  <span className="text-[10px] bg-accent/15 text-accent font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs inline-block mb-2">Secure Online Payment Simulator</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-primary/70 uppercase">Card Number</label>
                      <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full border border-primary/10 bg-white p-2.5 outline-none rounded-xs" disabled />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-primary/70 uppercase">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full border border-primary/10 bg-white p-2.5 outline-none rounded-xs" disabled />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-primary/70 uppercase">CVV</label>
                        <input type="password" placeholder="***" className="w-full border border-primary/10 bg-white p-2.5 outline-none rounded-xs" disabled />
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-dark/50 leading-relaxed italic">Note: Online payment integration is currently simulated. Placing the order will complete without real money transactions.</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-primary text-secondary hover:bg-primary-light font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-50 mt-8"
              >
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>{submitting ? 'Placing Order...' : 'Complete Order'}</span>
              </button>
            </form>
          </div>

          {/* Sidebar Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-8 border border-primary/5 shadow-md rounded-sm sticky top-36 space-y-6 text-left">
              <h2 className="font-serif text-2xl font-bold text-primary border-b border-primary/5 pb-4 tracking-wide">Items Summary</h2>
              
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center border-b border-primary/5 pb-4">
                    <div className="w-12 h-16 bg-secondary/35 border border-primary/5 flex-shrink-0 overflow-hidden rounded-xs flex items-center justify-center p-1.5">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow text-xs space-y-1 leading-tight">
                      <span className="font-serif font-bold text-primary block truncate max-w-[170px]">{item.title}</span>
                      <span className="text-dark/50">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-xs text-primary font-sans">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-4 font-sans text-xs text-dark/75 border-b border-primary/5 pb-6 font-light">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-medium text-primary">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  <span className="font-medium text-primary">
                    {shippingCost === 0 ? <span className="text-accent font-bold">FREE</span> : `₹${shippingCost}`}
                  </span>
                </div>
              </div>
              
              {/* Total price */}
              <div className="flex justify-between items-end pt-2">
                <span className="font-serif text-lg font-bold text-primary">Total Amount</span>
                <span className="font-bold text-xl text-accent font-sans">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
