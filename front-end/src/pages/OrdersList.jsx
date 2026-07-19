import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Check, Package, Clock, ArrowLeft, Loader2, ClipboardList } from 'lucide-react';

export default function OrdersList() {
  const { token, navigate } = useAuth();
  const routerNavigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getStatusStep = (status) => {
    // Return numeric step: 1 (Pending), 2 (Processing), 3 (Shipped), 4 (Delivered)
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 2; // default Processing
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
      <div className="bg-secondary min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-xs font-sans font-medium text-primary/60 uppercase tracking-widest">Loading Order History...</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen pt-28 pb-24 text-left">
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
          <div className="bg-white p-12 md:p-20 text-center border border-primary/5 rounded-sm shadow-md max-w-xl mx-auto space-y-6">
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
                <div key={order.orderId} className="bg-white border border-primary/5 rounded-sm shadow-md overflow-hidden font-sans">
                  
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
                          <span className="font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracker Bar Section */}
                  <div className="p-6 bg-secondary/10">
                    <h4 className="text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-6 text-left">Real-time Order Tracking</h4>
                    
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
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= 1 ? 'bg-accent border-accent text-primary' : 'bg-white border-primary/20 text-primary/40'}`}>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 1 ? 'text-primary' : 'text-primary/40'}`}>Confirmed</span>
                      </div>

                      {/* Step 2: Processing */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= 2 ? 'bg-accent border-accent text-primary' : 'bg-white border-primary/20 text-primary/40'}`}>
                          <Clock className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 2 ? 'text-primary' : 'text-primary/40'}`}>Processing</span>
                      </div>

                      {/* Step 3: Shipped */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= 3 ? 'bg-accent border-accent text-primary' : 'bg-white border-primary/20 text-primary/40'}`}>
                          <Truck className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 3 ? 'text-primary' : 'text-primary/40'}`}>Shipped</span>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="z-10 flex flex-col items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= 4 ? 'bg-accent border-accent text-primary' : 'bg-white border-primary/20 text-primary/40'}`}>
                          <Package className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${currentStep >= 4 ? 'text-primary' : 'text-primary/40'}`}>Delivered</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
