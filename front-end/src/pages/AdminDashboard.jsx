import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, Clipboard, Plus, Trash2, Edit3, Save, X, Loader2, ArrowLeft, TrendingUp, AlertTriangle, CheckCircle, Clock, Eye, ListTree, Settings, LayoutTemplate } from 'lucide-react';
import AdminStorefront from './AdminStorefront';

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'inventory'); // 'inventory' or 'orders'
  
  // Data lists
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);



  // Category Management states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  // Settings Management states
  const [siteSettings, setSiteSettings] = useState({
    paymentKeys: {
      razorpayKeyId: '',
      razorpayKeySecret: '',
      stripePublicKey: '',
      stripeSecretKey: ''
    }
  });
  const [savingSettings, setSavingSettings] = useState(false);

  // Authenticate Admin Role
  const isAuthorized = user && user.role === 'admin';

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (!isAuthorized && user) {
      // Access Denied
      return;
    }

    // Fetch Products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingProducts(false);
      });

    // Fetch Categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);

    // Fetch Settings
    fetch('/api/admin/settings', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.paymentKeys) {
          setSiteSettings(data);
        }
      })
      .catch(console.error);

    // Fetch Orders
    fetch('/api/admin/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to load orders");
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoadingOrders(false);
      })
      .catch(err => {
        console.error(err);
        setErrorMsg(err.message);
        setLoadingOrders(false);
      });
  }, [token, user, isAuthorized, navigate]);

  // Calculations for Admin Analytics Summary Widget
  const metrics = useMemo(() => {
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter(o => ['Order in process', 'Order accepted', 'Packed', 'Dispatch', 'On road', 'Delivering today'].includes(o.status)).length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    return {
      totalSales,
      pendingOrders,
      completedOrders,
      totalOrders: orders.length,
      totalProducts: products.length
    };
  }, [orders, products]);



  const handleDeleteProduct = async (prodId) => {
    if (!window.confirm('Are you sure you want to delete this product from the inventory? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/admin/products/${prodId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== prodId));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Delivered') return 'bg-green-50 border-green-200 text-green-700';
    if (['Packed', 'Dispatch', 'On road', 'Delivering today', 'Order accepted'].includes(status)) return 'bg-blue-50 border-blue-200 text-blue-700';
    if (status === 'Order in process') return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    return 'bg-red-50 border-red-200 text-red-700';
  };

  // Order Status Handler
  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update order status');
      
      // Update orders local state
      setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Format Date Helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Category Management Handlers
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCategoryName, description: newCategoryDesc })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCategories(prev => [data, ...prev]);
      setNewCategoryName('');
      setNewCategoryDesc('');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${catId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete category");
      setCategories(prev => prev.filter(c => c._id !== catId));
    } catch (err) {
      alert(err.message);
    }
  };

  // Settings Management Handlers
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(siteSettings)
      });
      if (!res.ok) throw new Error("Failed to save settings");
      alert("Settings saved successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  // Guard for Non-Admin access
  if (!isAuthorized) {
    return (
      <div className="bg-secondary min-h-screen pt-[184px] pb-20 flex items-center justify-center px-6 text-left">
        <div className="max-w-md w-full bg-secondary p-8 md:p-10 border border-primary/5 rounded-sm shadow-md text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary">Access Denied</h1>
          <div className="w-12 h-[2px] bg-accent mx-auto"></div>
          <p className="text-dark/65 font-sans font-light text-sm leading-relaxed">
            You do not possess the necessary admin privileges to view the backend management console. Please log out and sign in using administrative credentials.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-primary text-secondary hover:bg-primary-light font-bold py-3.5 px-8 uppercase tracking-widest text-xs transition-colors rounded-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen flex text-left font-sans text-sm text-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-secondary flex flex-col fixed h-full z-10 shadow-lg">
        <div className="p-6 border-b border-secondary/10 flex items-center justify-between">
          <Link to="/" className="text-xl font-serif font-bold text-accent tracking-widest uppercase">Nagouri</Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer ${activeTab === 'inventory' ? 'bg-accent text-primary' : 'text-secondary/70 hover:text-secondary hover:bg-secondary/5'}`}
          >
            <Package className="w-4 h-4" /> Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer ${activeTab === 'orders' ? 'bg-accent text-primary' : 'text-secondary/70 hover:text-secondary hover:bg-secondary/5'}`}
          >
            <Clipboard className="w-4 h-4" /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer ${activeTab === 'categories' ? 'bg-accent text-primary' : 'text-secondary/70 hover:text-secondary hover:bg-secondary/5'}`}
          >
            <ListTree className="w-4 h-4" /> Categories
          </button>
          <button 
            onClick={() => setActiveTab('storefront')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer ${activeTab === 'storefront' ? 'bg-accent text-primary' : 'text-secondary/70 hover:text-secondary hover:bg-secondary/5'}`}
          >
            <LayoutTemplate className="w-4 h-4" /> Storefront CMS
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer ${activeTab === 'settings' ? 'bg-accent text-primary' : 'text-secondary/70 hover:text-secondary hover:bg-secondary/5'}`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>

        <div className="p-4 border-t border-secondary/10">
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold text-secondary/70 hover:text-red-400 hover:bg-secondary/5 cursor-pointer"
          >
             Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 md:p-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-wide">Admin Console</h1>
            <p className="text-dark/50 text-xs mt-1">Sourcing inventory metrics, adaptogen formulations, and shipment logs.</p>
          </div>
          {activeTab === 'inventory' && (
            <button 
              onClick={() => navigate('/admin/product/new')}
              className="bg-primary text-secondary hover:bg-primary-light font-bold py-3.5 px-6 text-xs uppercase tracking-widest transition-all rounded-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>Add Product</span>
            </button>
          )}
        </div>

        {/* Analytics Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-secondary p-6 border border-primary/5 rounded-sm shadow-xs flex items-center gap-4">
            <div className="p-3.5 bg-accent/15 rounded-full text-accent">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-dark/45 tracking-wider block">Total Sales</span>
              <span className="text-xl font-bold font-serif">₹{metrics.totalSales.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="bg-secondary p-6 border border-primary/5 rounded-sm shadow-xs flex items-center gap-4">
            <div className="p-3.5 bg-accent/15 rounded-full text-accent">
              <Clipboard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-dark/45 tracking-wider block">Total Orders</span>
              <span className="text-xl font-bold font-serif">{metrics.totalOrders}</span>
            </div>
          </div>
          <div className="bg-secondary p-6 border border-primary/5 rounded-sm shadow-xs flex items-center gap-4">
            <div className="p-3.5 bg-yellow-50 text-yellow-600 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-dark/45 tracking-wider block">Pending Shipments</span>
              <span className="text-xl font-bold font-serif">{metrics.pendingOrders}</span>
            </div>
          </div>
          <div className="bg-secondary p-6 border border-primary/5 rounded-sm shadow-xs flex items-center gap-4">
            <div className="p-3.5 bg-green-50 text-green-600 rounded-full">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-dark/45 tracking-wider block">Catalog Range</span>
              <span className="text-xl font-bold font-serif">{metrics.totalProducts} Formulas</span>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xs flex justify-between items-center">
            <span>Error: {errorMsg}. Try logging out and logging in again to refresh your admin token.</span>
            <button onClick={() => setErrorMsg(null)} className="text-red-700 hover:text-red-900 font-bold uppercase text-[9px] tracking-wider">Dismiss</button>
          </div>
        )}

        {/* TAB CONTENT: INVENTORY CRUD */}
        {activeTab === 'inventory' && (
          <div className="space-y-8 animate-fade-in">

            {loadingProducts ? (
              <div className="text-center py-20 bg-secondary border border-primary/5 rounded-sm">
                <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-2" />
                <span className="text-xs uppercase font-bold text-dark/50">Fetching catalog...</span>
              </div>
            ) : (
              <div className="bg-secondary border border-primary/5 rounded-sm shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-secondary/45 text-[10px] uppercase font-bold tracking-wider text-dark/60 border-b border-primary/5">
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Image</th>
                        <th className="px-6 py-4">Formula Details</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 font-sans font-light">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-secondary/15 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-primary/60">{prod.id}</td>
                          <td className="px-6 py-4">
                            <div className="w-12 h-12 bg-secondary/30 border border-primary/5 rounded-xs flex items-center justify-center overflow-hidden">
                              <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="px-6 py-4 max-w-[280px]">
                            <span className="font-serif font-bold text-sm text-primary block">{prod.title}</span>
                            <span className="text-dark/50 text-[10px] block truncate mt-1">{prod.description}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-secondary px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-xs border border-primary/5 text-primary/75">{prod.category}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-primary block">₹{prod.price.toLocaleString('en-IN')}</span>
                            {prod.originalPrice > prod.price && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[9px] text-dark/40 line-through">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                                <span className="text-[9px] text-red-500 font-bold">
                                  ({Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF)
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-xs border ${prod.stockQuantity > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                              {prod.stockQuantity > 0 ? prod.stockQuantity : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => navigate(`/admin/product/${prod.id}`)}
                                className="text-primary/60 hover:text-accent p-2 bg-secondary/30 rounded-xs transition-colors"
                                title="Modify Inventory Details"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-xs transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-secondary border border-primary/5 rounded-sm p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-primary mb-4">Add New Category</h3>
              <form onSubmit={handleAddCategory} className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <label className="font-bold text-xs uppercase tracking-wider block">Category Name</label>
                  <input 
                    type="text" 
                    value={newCategoryName} 
                    onChange={(e) => setNewCategoryName(e.target.value)} 
                    className="w-full border border-primary/10 bg-secondary/15 p-3 focus:outline-none focus:border-accent text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
                <div className="flex-2 space-y-2">
                  <label className="font-bold text-xs uppercase tracking-wider block">Description (Optional)</label>
                  <input 
                    type="text" 
                    value={newCategoryDesc} 
                    onChange={(e) => setNewCategoryDesc(e.target.value)} 
                    className="w-full border border-primary/10 bg-secondary/15 p-3 focus:outline-none focus:border-accent text-primary font-medium rounded-xs" 
                  />
                </div>
                <button type="submit" className="bg-primary text-secondary hover:bg-primary-light font-bold py-3 px-6 uppercase tracking-widest text-xs transition-colors rounded-xs cursor-pointer flex items-center gap-2 h-[46px]">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </form>
            </div>

            <div className="bg-secondary border border-primary/5 rounded-sm shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/45 text-[10px] uppercase font-bold tracking-wider text-dark/60 border-b border-primary/5">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5 font-sans font-light">
                    {categories.map((cat) => (
                      <tr key={cat._id} className="hover:bg-secondary/15 transition-colors">
                        <td className="px-6 py-4 font-bold text-primary">{cat.name}</td>
                        <td className="px-6 py-4 text-dark/60">{cat.description}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteCategory(cat._id)}
                            className="text-red-500 hover:text-red-700 transition-colors flex items-center justify-end gap-1 cursor-pointer w-full"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-6 py-8 text-center text-dark/50">No categories found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in space-y-6">
            {loadingOrders ? (
              <div className="text-center py-20 bg-secondary border border-primary/5 rounded-sm">
                <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-2" />
                <span className="text-xs uppercase font-bold text-dark/50">Fetching orders...</span>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-secondary p-12 text-center border border-primary/5 rounded-sm shadow-md">
                <p className="text-dark/50 font-light mb-2">No customer orders recorded in the system.</p>
              </div>
            ) : (
              <div className="bg-secondary border border-primary/5 rounded-sm shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-secondary/45 text-[10px] uppercase font-bold tracking-wider text-dark/60 border-b border-primary/5">
                        <th className="px-6 py-4">Order Ref</th>
                        <th className="px-6 py-4">Client Detail</th>
                        <th className="px-6 py-4">Formulas Sourced</th>
                        <th className="px-6 py-4">Total Paid</th>
                        <th className="px-6 py-4">Placed Date</th>
                        <th className="px-6 py-4">Tracking Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 font-sans font-light">
                      {orders.map((order) => (
                        <tr key={order.orderId} className="hover:bg-secondary/15 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-accent select-all">{order.orderId}</td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-primary block">{order.firstName} {order.lastName}</span>
                            <span className="text-dark/50 text-[10px] block mt-0.5">{order.phone}</span>
                            <span className="text-dark/50 text-[10px] block truncate max-w-[200px]">{order.address}, {order.city}</span>
                          </td>
                          <td className="px-6 py-4 max-w-[220px]">
                            {order.items.map((item, i) => (
                              <span key={i} className="block text-[11px] font-medium leading-tight mb-1 text-primary">
                                {item.title} (Qty: {item.quantity})
                              </span>
                            ))}
                          </td>
                          <td className="px-6 py-4 font-bold text-primary">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4">{formatDate(order.createdAt)}</td>
                          <td className="px-6 py-4">
                            <select 
                              value={order.status}
                              onChange={(e) => handleOrderStatusUpdate(order.orderId, e.target.value)}
                              className={`border px-2 py-1.5 font-bold uppercase tracking-wider text-[10px] rounded-xs focus:outline-none cursor-pointer ${getStatusColor(order.status)}`}
                            >
                              <option value="Order in process">Order in process</option>
                              <option value="Order accepted">Order accepted</option>
                              <option value="Order rejected">Order rejected</option>
                              <option value="Packed">Packed</option>
                              <option value="Dispatch">Dispatch</option>
                              <option value="On road">On road</option>
                              <option value="Delivering today">Delivering today</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Out of stock">Out of stock</option>
                              <option value="Order cancel from admin">Order cancel from admin</option>
                              <option value="Order cancel">Order cancel</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => setViewingOrder(order)}
                              className="text-primary/60 hover:text-accent transition-colors flex items-center justify-end gap-1 cursor-pointer ml-auto text-[10px] uppercase font-bold tracking-wider"
                            >
                              <Eye className="w-3.5 h-3.5" /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Order Details Modal */}
            {viewingOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/80 backdrop-blur-sm p-4">
                <div className="bg-secondary border border-primary/10 shadow-2xl rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in relative">
                  <div className="sticky top-0 bg-secondary px-8 py-6 border-b border-primary/10 flex justify-between items-center z-10">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-primary">Order Details</h3>
                      <span className="text-[10px] uppercase font-bold text-dark/50 tracking-wider">Ref: {viewingOrder.orderId}</span>
                    </div>
                    <button onClick={() => setViewingOrder(null)} className="text-dark/50 hover:text-red-500 transition-colors p-2 cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-8 space-y-8 text-sm">
                    {/* Customer & Shipping Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] uppercase font-bold text-dark/45 tracking-wider mb-3">Customer Information</h4>
                        <div className="bg-secondary/35 p-4 border border-primary/5 rounded-xs space-y-1.5">
                          <p className="font-bold text-primary">{viewingOrder.firstName} {viewingOrder.lastName}</p>
                          <p className="text-dark/60"><span className="font-semibold text-primary/70">Email:</span> {viewingOrder.email}</p>
                          <p className="text-dark/60"><span className="font-semibold text-primary/70">Phone:</span> {viewingOrder.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-bold text-dark/45 tracking-wider mb-3">Shipping Address</h4>
                        <div className="bg-secondary/35 p-4 border border-primary/5 rounded-xs space-y-1.5">
                          <p className="text-dark/60"><span className="font-semibold text-primary/70">Street:</span> <span className="font-bold text-primary">{viewingOrder.address}</span></p>
                          <p className="text-dark/60"><span className="font-semibold text-primary/70">City/State:</span> {viewingOrder.city}, {viewingOrder.state}</p>
                          <p className="text-dark/60"><span className="font-semibold text-primary/70">ZIP Code:</span> {viewingOrder.zipCode}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-dark/45 tracking-wider mb-3">Payment & Tracking</h4>
                      <div className="bg-secondary/35 p-4 border border-primary/5 rounded-xs flex flex-wrap gap-x-12 gap-y-4">
                        <div>
                          <p className="text-[10px] uppercase text-dark/45 mb-1">Method</p>
                          <p className="font-bold text-primary">{viewingOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-dark/45 mb-1">Status</p>
                          <span className={`inline-block px-2 py-0.5 font-bold uppercase tracking-wider text-[10px] rounded-xs border ${getStatusColor(viewingOrder.status)}`}>
                            {viewingOrder.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-dark/45 mb-1">Order Date</p>
                          <p className="font-bold text-primary">{formatDate(viewingOrder.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-dark/45 tracking-wider mb-3">Formulas Sourced ({viewingOrder.items.length})</h4>
                      <div className="bg-secondary border border-primary/5 rounded-xs overflow-hidden">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-secondary/45 text-[9px] uppercase text-dark/60">
                            <tr>
                              <th className="px-4 py-3 font-bold">Item</th>
                              <th className="px-4 py-3 font-bold text-center">Qty</th>
                              <th className="px-4 py-3 font-bold text-right">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-primary/5 font-light text-primary">
                            {viewingOrder.items.map((item, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-3 font-medium">{item.title}</td>
                                <td className="px-4 py-3 text-center">{item.quantity}</td>
                                <td className="px-4 py-3 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="flex justify-end pt-4 border-t border-primary/5">
                      <div className="w-64 space-y-2">
                        <div className="flex justify-between text-xs text-dark/60">
                          <span>Subtotal</span>
                          <span>₹{(viewingOrder.totalAmount - viewingOrder.shippingCost).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-xs text-dark/60">
                          <span>Shipping</span>
                          <span>{viewingOrder.shippingCost === 0 ? 'Free' : `₹${viewingOrder.shippingCost}`}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-primary/5 mt-2">
                          <span>Total Paid</span>
                          <span className="text-accent text-base">₹{viewingOrder.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: STOREFRONT CMS */}
        {activeTab === 'storefront' && (
          <AdminStorefront token={token} />
        )}

        {/* TAB CONTENT: SETTINGS MANAGEMENT */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-secondary border border-primary/5 rounded-sm shadow-md overflow-hidden">
              <div className="p-6 border-b border-primary/5 bg-secondary/30">
                <h3 className="font-serif font-bold text-lg text-primary">Payment Configuration</h3>
                <p className="text-dark/50 text-xs mt-1">Manage API keys for Razorpay and Stripe to enable online payments.</p>
              </div>
              <form onSubmit={handleSaveSettings} className="p-6 space-y-8">
                
                {/* Razorpay Section */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-primary border-b border-primary/10 pb-2">Razorpay Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-bold text-xs uppercase tracking-wider block">Key ID</label>
                      <input 
                        type="text" 
                        value={siteSettings.paymentKeys.razorpayKeyId} 
                        onChange={(e) => setSiteSettings(prev => ({...prev, paymentKeys: {...prev.paymentKeys, razorpayKeyId: e.target.value}}))} 
                        placeholder="rzp_test_..."
                        className="w-full border border-primary/10 bg-secondary/15 p-3 focus:outline-none focus:border-accent text-primary font-medium rounded-xs" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-xs uppercase tracking-wider block">Key Secret</label>
                      <input 
                        type="password" 
                        value={siteSettings.paymentKeys.razorpayKeySecret} 
                        onChange={(e) => setSiteSettings(prev => ({...prev, paymentKeys: {...prev.paymentKeys, razorpayKeySecret: e.target.value}}))} 
                        placeholder="••••••••••••••••"
                        className="w-full border border-primary/10 bg-secondary/15 p-3 focus:outline-none focus:border-accent text-primary font-medium rounded-xs" 
                      />
                    </div>
                  </div>
                </div>

                {/* Stripe Section */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-primary border-b border-primary/10 pb-2">Stripe Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-bold text-xs uppercase tracking-wider block">Publishable Key</label>
                      <input 
                        type="text" 
                        value={siteSettings.paymentKeys.stripePublicKey} 
                        onChange={(e) => setSiteSettings(prev => ({...prev, paymentKeys: {...prev.paymentKeys, stripePublicKey: e.target.value}}))} 
                        placeholder="pk_test_..."
                        className="w-full border border-primary/10 bg-secondary/15 p-3 focus:outline-none focus:border-accent text-primary font-medium rounded-xs" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-xs uppercase tracking-wider block">Secret Key</label>
                      <input 
                        type="password" 
                        value={siteSettings.paymentKeys.stripeSecretKey} 
                        onChange={(e) => setSiteSettings(prev => ({...prev, paymentKeys: {...prev.paymentKeys, stripeSecretKey: e.target.value}}))} 
                        placeholder="sk_test_..."
                        className="w-full border border-primary/10 bg-secondary/15 p-3 focus:outline-none focus:border-accent text-primary font-medium rounded-xs" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={savingSettings}
                    className="bg-primary text-secondary hover:bg-primary-light font-bold py-3.5 px-8 uppercase tracking-widest text-xs transition-colors rounded-xs cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {savingSettings ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Save className="w-4 h-4 text-accent" />}
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
