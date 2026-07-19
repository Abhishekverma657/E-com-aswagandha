import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Mail, Calendar, MapPin, Loader2, Truck } from 'lucide-react';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // Compute estimated delivery date (3-5 days from creation)
  const getDeliveryDateRange = (createdAtString) => {
    const createdDate = createdAtString ? new Date(createdAtString) : new Date();
    
    const minDelivery = new Date(createdDate);
    minDelivery.setDate(createdDate.getDate() + 3);
    
    const maxDelivery = new Date(createdDate);
    maxDelivery.setDate(createdDate.getDate() + 5);
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${minDelivery.toLocaleDateString('en-IN', options)} - ${maxDelivery.toLocaleDateString('en-IN', options)}`;
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 2;
    }
  };

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-xs font-sans font-medium text-primary/60 uppercase tracking-widest">Retrieving Order Details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-secondary min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">Order Not Found</h1>
        <div className="w-16 h-[2px] bg-accent mx-auto mb-6"></div>
        <p className="text-dark/65 font-light mb-10 max-w-md font-sans text-base">
          We could not find the order details for reference ID: <strong className="text-primary">{id}</strong>. Please check your verification link or contact support.
        </p>
        <Link 
          to="/shop" 
          className="bg-primary text-secondary hover:bg-primary-light font-bold py-4.5 px-12 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const currentStep = getStatusStep(order.status);

  return (
    <div className="bg-secondary min-h-screen pt-28 pb-24 text-left">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Header Card */}
        <div className="bg-white p-8 md:p-12 border border-primary/5 rounded-sm shadow-md text-center mb-10 space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
          
          <div className="w-20 h-20 bg-accent/15 rounded-full flex items-center justify-center mx-auto animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-accent stroke-[1.5]" />
          </div>
          
          <div className="space-y-2">
            <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold font-sans">Order Placed Successfully</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">Thank You For Your Order, {order.firstName}!</h1>
            <p className="text-dark/60 font-sans font-light text-sm max-w-lg mx-auto">
              Your order has been recorded in our system. A confirmation email has been dispatched to <strong className="text-primary font-medium">{order.email}</strong>.
            </p>
          </div>

          <div className="inline-block bg-secondary px-6 py-3 border border-primary/5 rounded-xs font-sans text-sm">
            <span className="text-dark/50 mr-2 font-semibold">Reference ID:</span> 
            <span className="font-bold text-primary font-mono select-all">{order.orderId}</span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Left Column: Shipment & Delivery Info */}
          <div className="bg-white p-8 border border-primary/5 rounded-sm shadow-md space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary border-b border-primary/5 pb-3.5 tracking-wide flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" /> Delivery Status
              </h3>
              
              <div className="space-y-4 font-sans text-sm text-dark/75 leading-relaxed font-light mt-4">
                <div className="flex gap-3">
                  <Truck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary block">Estimated Delivery Date</span>
                    <span className="text-accent font-semibold">{getDeliveryDateRange(order.createdAt)}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary block">Shipping Destination</span>
                    <span className="block">{order.firstName} {order.lastName}</span>
                    <span className="block text-dark/65 text-xs">{order.address}, {order.city}, {order.state} - {order.zipCode}</span>
                    <span className="block text-dark/65 text-xs">Phone: {order.phone}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary block">Payment Mode</span>
                    <span className="capitalize font-semibold text-primary">{order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Prepaid Card / Simulated Online'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Order tracking bar on success screen */}
            <div className="border-t border-primary/5 pt-6 mt-6">
              <span className="text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-4 block">Order Tracking</span>
              <div className="relative flex justify-between items-center px-2 mt-4 font-sans">
                <div className="absolute top-3.5 left-6 right-6 h-[2px] bg-secondary/80 z-0">
                  <div 
                    className="h-full bg-accent transition-all duration-1000"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  ></div>
                </div>

                <div className="z-10 flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${currentStep >= 1 ? 'bg-accent border-accent text-primary' : 'bg-white border-primary/20 text-primary/45'}`}>
                    ✓
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider mt-1 text-primary/70">Placed</span>
                </div>

                <div className="z-10 flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${currentStep >= 2 ? 'bg-accent border-accent text-primary' : 'bg-white border-primary/20 text-primary/45'}`}>
                    ⏱
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider mt-1 text-primary/70">Process</span>
                </div>

                <div className="z-10 flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${currentStep >= 3 ? 'bg-accent border-accent text-primary' : 'bg-white border-primary/20 text-primary/45'}`}>
                    🚚
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider mt-1 text-primary/70">Shipped</span>
                </div>

                <div className="z-10 flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${currentStep >= 4 ? 'bg-accent border-accent text-primary' : 'bg-white border-primary/20 text-primary/45'}`}>
                    📦
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider mt-1 text-primary/70">Arrived</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Items & Cost Details */}
          <div className="bg-white p-8 border border-primary/5 rounded-sm shadow-md space-y-6">
            <h3 className="font-serif text-xl font-bold text-primary border-b border-primary/5 pb-3.5 tracking-wide flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" /> Items Ordered
            </h3>

            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs font-sans">
                  <div className="text-left">
                    <span className="font-serif font-bold text-primary block truncate max-w-[200px]">{item.title}</span>
                    <span className="text-dark/50">Qty: {item.quantity} × ₹{item.price}</span>
                  </div>
                  <span className="font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-primary/5 pt-4 space-y-3 font-sans text-xs text-dark/75 font-light">
              <div className="flex justify-between">
                <span>Shipping Cost</span>
                <span>{order.shippingCost === 0 ? <span className="text-accent font-bold">FREE</span> : `₹${order.shippingCost}`}</span>
              </div>
              <div className="flex justify-between items-end border-t border-primary/5 pt-3">
                <span className="font-serif text-sm font-bold text-primary">Total Paid</span>
                <span className="font-bold text-base text-accent font-sans">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/orders" 
            className="bg-accent text-primary hover:bg-accent-dark font-bold py-4 px-12 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md text-center"
          >
            Track My Orders
          </Link>
          <Link 
            to="/shop" 
            className="bg-primary text-secondary hover:bg-primary-light font-bold py-4 px-12 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md text-center"
          >
            Continue Sourcing
          </Link>
          <Link 
            to="/" 
            className="bg-white text-primary border border-primary/10 hover:border-accent font-bold py-4 px-12 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-xs text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
