import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, Clipboard, Plus, Trash2, Edit3, Save, X, Loader2, ArrowLeft, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'inventory'); // 'inventory' or 'orders'
  
  // Data lists
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Modal / form states for Inventory CRUD
  const [editingProduct, setEditingProduct] = useState(null); // 'new' or product object
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    originalPrice: '',
    image: '',
    imageFile: null,
    imageName: '',
    category: '',
    description: '',
    benefitsInput: '', // comma-separated strings
    ingredients: '',
    usage: '',
    sourcing: ''
  });
  const [savingProduct, setSavingProduct] = useState(false);

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
    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    return {
      totalSales,
      pendingOrders,
      completedOrders,
      totalOrders: orders.length,
      totalProducts: products.length
    };
  }, [orders, products]);

  // Product CRUD Handlers
  const openProductForm = (product = null) => {
    if (product === 'new') {
      setEditingProduct('new');
      setProductForm({
        title: '',
        price: '',
        originalPrice: '',
        image: '/vitality-gummies.png',
        imageFile: null,
        imageName: '',
        category: 'Ashwagandha',
        description: '',
        benefitsInput: '',
        ingredients: '',
        usage: '',
        sourcing: ''
      });
    } else {
      setEditingProduct(product);
      setProductForm({
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice || '',
        image: product.image,
        imageFile: null,
        imageName: '',
        category: product.category,
        description: product.description,
        benefitsInput: product.benefits ? product.benefits.join(', ') : '',
        ingredients: product.ingredients || '',
        usage: product.usage || '',
        sourcing: product.sourcing || ''
      });
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm(prev => ({
        ...prev,
        imageFile: reader.result,
        imageName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const closeProductForm = () => {
    setEditingProduct(null);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSavingProduct(true);

    const payload = {
      ...productForm,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : null,
      benefits: productForm.benefitsInput.split(',').map(b => b.trim()).filter(Boolean)
    };

    const url = editingProduct === 'new' 
      ? '/api/admin/products' 
      : `/api/admin/products/${editingProduct.id}`;
    const method = editingProduct === 'new' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      // Refresh products list
      if (editingProduct === 'new') {
        setProducts(prev => [...prev, data]);
      } else {
        setProducts(prev => prev.map(p => p.id === data.id ? data : p));
      }
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSavingProduct(false);
    }
  };

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

  // Guard for Non-Admin access
  if (!isAuthorized) {
    return (
      <div className="bg-secondary min-h-screen pt-24 pb-20 flex items-center justify-center px-6 text-left">
        <div className="max-w-md w-full bg-white p-8 md:p-10 border border-primary/5 rounded-sm shadow-md text-center space-y-6">
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
    <div className="bg-secondary min-h-screen pt-28 pb-24 text-left font-sans text-sm text-primary">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-wide">Admin Console</h1>
            <p className="text-dark/50 text-xs mt-1">Sourcing inventory metrics, adaptogen formulations, and shipment logs.</p>
          </div>
          {!editingProduct && activeTab === 'inventory' && (
            <button 
              onClick={() => openProductForm('new')}
              className="bg-primary text-secondary hover:bg-primary-light font-bold py-3.5 px-6 text-xs uppercase tracking-widest transition-all rounded-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-accent" />
              <span>Add Product</span>
            </button>
          )}
        </div>

        {/* Analytics Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 border border-primary/5 rounded-sm shadow-xs flex items-center gap-4">
            <div className="p-3.5 bg-accent/15 rounded-full text-accent">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-dark/45 tracking-wider block">Total Sales</span>
              <span className="text-xl font-bold font-serif">₹{metrics.totalSales.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="bg-white p-6 border border-primary/5 rounded-sm shadow-xs flex items-center gap-4">
            <div className="p-3.5 bg-accent/15 rounded-full text-accent">
              <Clipboard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-dark/45 tracking-wider block">Total Orders</span>
              <span className="text-xl font-bold font-serif">{metrics.totalOrders}</span>
            </div>
          </div>
          <div className="bg-white p-6 border border-primary/5 rounded-sm shadow-xs flex items-center gap-4">
            <div className="p-3.5 bg-yellow-50 text-yellow-600 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-dark/45 tracking-wider block">Pending Shipments</span>
              <span className="text-xl font-bold font-serif">{metrics.pendingOrders}</span>
            </div>
          </div>
          <div className="bg-white p-6 border border-primary/5 rounded-sm shadow-xs flex items-center gap-4">
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

        {/* Tab Selection */}
        <div className="flex border-b border-primary/10 mb-8 font-serif text-base tracking-wide">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-6 font-bold transition-all relative cursor-pointer ${
              activeTab === 'inventory' ? 'text-accent border-b-2 border-accent' : 'text-primary/50 hover:text-primary'
            }`}
          >
            Manage Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-6 font-bold transition-all relative cursor-pointer ${
              activeTab === 'orders' ? 'text-accent border-b-2 border-accent' : 'text-primary/50 hover:text-primary'
            }`}
          >
            Manage Orders
          </button>
        </div>

        {/* TAB CONTENT: INVENTORY CRUD */}
        {activeTab === 'inventory' && (
          <div className="space-y-8 animate-fade-in">
            {editingProduct && (
              <div className="bg-white p-8 border border-accent/20 rounded-sm shadow-md space-y-6">
                <div className="flex justify-between items-center border-b border-primary/5 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-primary">
                    {editingProduct === 'new' ? 'Create New Formulation' : 'Modify Formulation'}
                  </h3>
                  <button onClick={closeProductForm} className="text-dark/50 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleProductSubmit} className="space-y-6 text-xs font-sans">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider block">Product Title</label>
                      <input 
                        type="text" 
                        value={productForm.title}
                        onChange={(e) => setProductForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Pure Himalayan Shilajit Gold Resin"
                        className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider block">Category</label>
                      <select 
                        value={productForm.category}
                        onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs"
                      >
                        <option value="Ashwagandha">Ashwagandha</option>
                        <option value="Shilajit">Shilajit</option>
                        <option value="Gummies">Gummies</option>
                        <option value="Combos">Combos</option>
                        <option value="Stress & Sleep">Stress & Sleep</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider block">Sale Price (₹)</label>
                      <input 
                        type="number" 
                        value={productForm.price}
                        onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="799"
                        className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider block">Original Price (₹)</label>
                      <input 
                        type="number" 
                        value={productForm.originalPrice}
                        onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                        placeholder="1199"
                        className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider block">Product Image</label>
                      <div className="flex flex-col gap-2">
                        {/* File upload input */}
                        <div className="flex items-center gap-2">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="text-xs text-primary/80 file:mr-3 file:py-2.5 file:px-4 file:rounded-xs file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-accent/15 file:text-accent hover:file:bg-accent hover:file:text-primary transition-all cursor-pointer w-full"
                          />
                        </div>
                        {/* Manual URL entry fallback */}
                        <div className="space-y-1">
                          <span className="text-[9px] text-dark/45 font-bold block uppercase tracking-wider">Or enter image URL path:</span>
                          <input 
                            type="text" 
                            value={productForm.image}
                            onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                            placeholder="/nagori-ashwagandha.png"
                            className="w-full border border-primary/10 bg-secondary/15 p-2 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs text-[10px]" 
                          />
                        </div>
                        {productForm.imageName && (
                          <span className="text-[10px] text-green-600 font-bold block">✓ Selected: {productForm.imageName}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider block">Benefits Summary (Comma-separated)</label>
                    <input 
                      type="text" 
                      value={productForm.benefitsInput}
                      onChange={(e) => setProductForm(prev => ({ ...prev, benefitsInput: e.target.value }))}
                      placeholder="Lowers Cortisol, Supports sleep, Boosts stamina"
                      className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider block">Description</label>
                    <textarea 
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed sourcing explanation and benefits of this formulation..."
                      rows="4"
                      className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs resize-none" 
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider block">Ingredients Specification</label>
                      <textarea 
                        value={productForm.ingredients}
                        onChange={(e) => setProductForm(prev => ({ ...prev, ingredients: e.target.value }))}
                        placeholder="100% pure standardized Withanolides..."
                        rows="2"
                        className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs resize-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider block">Usage Recommendation</label>
                      <textarea 
                        value={productForm.usage}
                        onChange={(e) => setProductForm(prev => ({ ...prev, usage: e.target.value }))}
                        placeholder="Take 1 capsule twice daily..."
                        rows="2"
                        className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs resize-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold uppercase tracking-wider block">Sourcing Location details</label>
                      <textarea 
                        value={productForm.sourcing}
                        onChange={(e) => setProductForm(prev => ({ ...prev, sourcing: e.target.value }))}
                        placeholder="Directly harvested from dry soils of Nagaur, Rajasthan..."
                        rows="2"
                        className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs resize-none" 
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="submit" 
                      disabled={savingProduct}
                      className="bg-primary text-secondary hover:bg-primary-light font-bold py-3.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {savingProduct ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Save className="w-4 h-4 text-accent" />}
                      <span>{editingProduct === 'new' ? 'Publish Formula' : 'Update Formula'}</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={closeProductForm}
                      className="bg-white border border-primary/10 hover:border-accent text-primary font-bold py-3.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loadingProducts ? (
              <div className="text-center py-20 bg-white border border-primary/5 rounded-sm">
                <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-2" />
                <span className="text-xs uppercase font-bold text-dark/50">Fetching catalog...</span>
              </div>
            ) : (
              <div className="bg-white border border-primary/5 rounded-sm shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-secondary/45 text-[10px] uppercase font-bold tracking-wider text-dark/60 border-b border-primary/5">
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Image</th>
                        <th className="px-6 py-4">Formula Details</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
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
                          <td className="px-6 py-4 font-bold text-primary">₹{prod.price.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-3 text-[10px] uppercase tracking-wider font-bold">
                              <button 
                                onClick={() => openProductForm(prod)}
                                className="text-primary/60 hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" /> Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
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

        {/* TAB CONTENT: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in space-y-6">
            {loadingOrders ? (
              <div className="text-center py-20 bg-white border border-primary/5 rounded-sm">
                <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-2" />
                <span className="text-xs uppercase font-bold text-dark/50">Fetching orders...</span>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white p-12 text-center border border-primary/5 rounded-sm shadow-md">
                <p className="text-dark/50 font-light mb-2">No customer orders recorded in the system.</p>
              </div>
            ) : (
              <div className="bg-white border border-primary/5 rounded-sm shadow-md overflow-hidden">
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
                              className={`border px-2 py-1.5 font-bold uppercase tracking-wider text-[10px] rounded-xs focus:outline-none cursor-pointer ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-50 border-green-200 text-green-700' 
                                  : order.status === 'Shipped' 
                                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                                  : order.status === 'Processing'
                                  ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                  : 'bg-red-50 border-red-200 text-red-700'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
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

      </div>
    </div>
  );
}
