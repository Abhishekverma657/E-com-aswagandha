import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Check, Package, Clock, ArrowLeft, Loader2, ClipboardList, Star, X } from 'lucide-react';

export default function OrdersList() {
  const { token, navigate } = useAuth();
  const routerNavigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Rating Modal State
  const [ratingModal, setRatingModal] = useState({ isOpen: false, orderId: null });
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    if (!token) {
      routerNavigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/users/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, routerNavigate]);

  const submitRating = async () => {
    if (ratingValue === 0) {
      alert("Please select a rating.");
      return;
    }
    setSubmittingRating(true);
    try {
      const res = await fetch(`/api/orders/${ratingModal.orderId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating: ratingValue, comment: ratingComment })
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(orders.map(o => o.orderId === ratingModal.orderId ? { ...o, isRated: true } : o));
        setRatingModal({ isOpen: false, orderId: null });
        setRatingValue(0);
        setRatingComment('');
        alert("Thank you for your feedback!");
      } else {
        alert(data.error || "Failed to submit rating.");
      }
    } catch (err) {
      alert("Failed to submit rating.");
    } finally {
      setSubmittingRating(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    
    try {
      const res = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(orders.map(o => o.orderId === orderId ? data.order : o));
        alert("Order cancelled successfully.");
      } else {
        alert(data.error || "Failed to cancel order.");
      }
    } catch (err) {
      alert("Failed to cancel order.");
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'Order in process': 
      case 'Order accepted': 
        return 1;
      case 'Packed': 
      case 'Dispatch': 
        return 2;
      case 'On road': 
      case 'Delivering today': 
        return 3;
      case 'Delivered': 
        return 4;
      default: 
        return 0; // Cancelled or Rejected
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen pt-[184px] pb-20 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-xs font-sans font-medium text-primary/60 uppercase tracking-widest">Loading Order History...</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen pt-[184px] pb-24 text-left">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/60 hover:text-accent font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span>Browse Shop</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-primary tracking-wide">My Orders</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-sm font-sans mb-8">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-secondary p-12 md:p-20 text-center border border-primary/5 rounded-sm shadow-md max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <ClipboardList className="w-8 h-8 text-accent stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary">No Orders Placed Yet</h2>
            <p className="text-dark/65 font-sans font-light text-sm max-w-md mx-auto leading-relaxed">
              Explore our premium organic collections. Place an order to start tracking its status here.
            </p>
            <Link 
              to="/shop" 
              className="inline-block bg-primary text-secondary hover:bg-primary-light font-bold py-4 px-10 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md"
            >
              Start Sourcing
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => {
              const currentStep = getStatusStep(order.status);
              
              return (
                <div key={order.orderId} className="bg-secondary border border-primary/5 rounded-sm shadow-md overflow-hidden font-sans">
                  
                  {/* Order Top Bar Header */}
                  <div className="bg-secondary/45 px-6 py-4 border-b border-primary/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <div>
                        <span className="text-dark/50 font-semibold block uppercase">Order Placed</span>
                        <span className="font-bold text-primary">{formatDate(order.createdAt)}</span>
                      </div>
                      <div>
                        <span className="text-dark/50 font-semibold block uppercase">Total Paid</span>
                        <span className="font-bold text-primary">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="text-dark/50 font-semibold block uppercase">Ship To</span>
                        <span className="font-bold text-primary truncate block max-w-[120px]">{order.firstName} {order.lastName}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-dark/50 font-semibold block uppercase text-right sm:text-right">Order Ref</span>
                      <span className="font-bold text-accent font-mono select-all block sm:text-right">{order.orderId}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="p-6 border-b border-primary/5">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <div className="text-left">
                            <span className="font-serif font-bold text-sm text-primary block">{item.title}</span>
                            <span className="text-dark/50 text-[10px] block mt-0.5">Quantity: {item.quantity} × ₹{item.price}</span>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                            <span className="font-bold text-primary block">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            {order.status === 'Delivered' && !order.isRated && (
                              <button 
                                onClick={() => setRatingModal({ isOpen: true, orderId: order.orderId })}
                                className="text-[10px] bg-accent/10 text-accent font-bold px-3 py-1.5 rounded hover:bg-accent hover:text-white transition-colors"
                              >
                                Rate Product
                              </button>
                            )}
                            {order.isRated && (
                              <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded">★ Rated</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracker Bar Section */}
                  <div className="p-6 bg-secondary/10">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-[10px] uppercase tracking-widest text-primary/60 font-bold text-left hidden sm:block">Real-time Order Tracking</h4>
                      <div className="flex items-center gap-3">
                        {(order.status === 'Order in process' || order.status === 'Order accepted') && (
                          <button 
                            onClick={() => handleCancelOrder(order.orderId)}
                            className="text-[10px] md:text-xs font-bold px-3 py-1 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                        <span className={`text-[10px] md:text-xs font-bold px-3 py-1 rounded ${currentStep === 0 ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'}`}>
                          Current Status: {order.status}
                        </span>
                      </div>
                    </div>
                    
                    {currentStep > 0 ? (
                      <div className="relative flex justify-between items-center max-w-xl mx-auto px-4 mt-2">
                        {/* Connection Line */}
                        <div className="absolute top-4.5 left-8 right-8 h-1 bg-secondary/80 z-0">
                          <div 
                            className="h-full bg-accent transition-all duration-1000 ease-out"
                            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                          ></div>
                        </div>

                      {/* Step 1: Confirmed */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= 1 ? 'bg-accent border-accent text-primary' : 'bg-secondary border-primary/20 text-primary/40'}`}>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 1 ? 'text-primary' : 'text-primary/40'}`}>Confirmed</span>
                      </div>

                      {/* Step 2: Processing */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= 2 ? 'bg-accent border-accent text-primary' : 'bg-secondary border-primary/20 text-primary/40'}`}>
                          <Clock className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 2 ? 'text-primary' : 'text-primary/40'}`}>Processing</span>
                      </div>

                      {/* Step 3: Shipped */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= 3 ? 'bg-accent border-accent text-primary' : 'bg-secondary border-primary/20 text-primary/40'}`}>
                          <Truck className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 3 ? 'text-primary' : 'text-primary/40'}`}>Shipped</span>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= 4 ? 'bg-accent border-accent text-primary' : 'bg-secondary border-primary/20 text-primary/40'}`}>
                          <Package className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 4 ? 'text-primary' : 'text-primary/40'}`}>Delivered</span>
                      </div>
                    </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4 opacity-50">
                        <span className="text-xs font-bold uppercase tracking-widest text-dark/70">No active tracking available</span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {ratingModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-secondary w-full max-w-md rounded-md shadow-2xl overflow-hidden relative animate-fade-in-up">
            <button 
              onClick={() => {
                setRatingModal({ isOpen: false, orderId: null });
                setRatingValue(0);
                setRatingComment('');
              }}
              className="absolute top-4 right-4 text-dark/40 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-2xl font-bold text-primary text-center mb-2">Rate Your Experience</h3>
              <p className="text-xs text-dark/60 text-center font-sans mb-8">How was the product? Your feedback helps us improve.</p>
              
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingValue(star)}
                    className="focus:outline-none transform transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-10 h-10 transition-colors ${ratingValue >= star ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>

              <div className="mb-6 font-sans">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-dark/70 mb-2">Review (Optional)</label>
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  className="w-full bg-secondary border border-primary/10 rounded-sm p-3 text-sm text-primary focus:outline-none focus:border-accent resize-none transition-colors h-24"
                  placeholder="Share your thoughts..."
                />
              </div>

              <button
                onClick={submitRating}
                disabled={submittingRating || ratingValue === 0}
                className="w-full bg-primary text-secondary hover:bg-primary-light font-bold py-3.5 px-6 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingRating ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : 'Submit Rating'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
