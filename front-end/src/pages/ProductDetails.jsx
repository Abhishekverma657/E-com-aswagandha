import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Star, ShieldCheck, Truck, RefreshCw, Sparkles, Award, Heart } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { user, toggleSavedProduct } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Hook must be declared at the top of the component (before early returns)
  const isSaved = useMemo(() => {
    if (!user || !user.savedProducts || !product) return false;
    return user.savedProducts.some(id => String(id) === String(product.id));
  }, [user, product]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // If loading or error, handle early returns so product is guaranteed below
  if (loading) {
    return (
      <div className="bg-secondary min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mb-4"></div>
        <p className="text-xs font-sans font-medium text-primary/60 uppercase tracking-widest">Loading Formulation Details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-secondary min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">Formulation Not Found</h1>
        <div className="w-16 h-[2px] bg-accent mx-auto mb-6"></div>
        <p className="text-dark/65 font-light mb-10 max-w-md font-sans text-base">
          The requested product formulation could not be loaded. Please return to our shop catalog to explore our premium adaptogens.
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

  // Safe to compute these since product is loaded and verified
  const displayOriginalPrice = product.originalPrice || Math.round(product.price * 1.4);
  const savings = displayOriginalPrice - product.price;
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'inc') setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    await toggleSavedProduct(product.id);
  };

  return (
    <div className="bg-secondary min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Breadcrumb navigation */}
        <div className="mb-10 text-xs uppercase tracking-widest text-dark/50 font-sans">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2.5">/</span>
          <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <span className="mx-2.5">/</span>
          <span className="text-primary font-medium">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Product Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] bg-white flex items-center justify-center border border-primary/5 rounded-sm overflow-hidden shadow-md group">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-[90%] h-[90%] object-contain p-4 transition-transform duration-700 group-hover:scale-105" 
              />
              <span className="absolute top-6 left-6 bg-primary text-accent text-[10px] font-bold py-1 px-3 tracking-widest uppercase rounded-xs">
                {product.category}
              </span>
            </div>
          </div>

          {/* Right Column: Product Info panel */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-primary leading-tight">{product.title}</h1>
            
            {/* Rating Star ribbon */}
            <div className="flex items-center gap-2 mb-6 font-sans">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-dark/70">
                {product.rating} ★ ({product.reviewCount} Customer Reviews)
              </span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-4 mb-8 border-b border-primary/5 pb-6">
              <span className="text-3xl md:text-4xl text-primary font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-dark/45 line-through text-lg font-light">₹{displayOriginalPrice.toLocaleString('en-IN')}</span>
              <span className="bg-accent/15 text-accent text-xs font-bold px-3 py-1 rounded-sm border border-accent/25">
                Save ₹{savings.toLocaleString('en-IN')}
              </span>
            </div>
            
            {/* Description */}
            <div className="mb-8 text-sm md:text-base text-dark/75 leading-relaxed font-sans font-light">
              <p>{product.description}</p>
            </div>

            {/* Key Benefits */}
            <div className="mb-10 bg-white p-6 border border-primary/5 rounded-sm shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-4 text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" /> Key Benefits
              </h3>
              <ul className="space-y-3.5 text-sm text-dark/75 font-sans font-light">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-primary/10 bg-white rounded-sm">
                <button 
                  onClick={() => handleQuantity('dec')} 
                  className="px-5 py-4 hover:bg-primary/5 transition-colors text-lg font-light text-primary"
                  aria-label="Decrease Quantity"
                >-</button>
                <span className="px-6 py-4 font-bold min-w-[3.5rem] text-center text-sm font-sans">{quantity}</span>
                <button 
                  onClick={() => handleQuantity('inc')} 
                  className="px-5 py-4 hover:bg-primary/5 transition-colors text-lg font-light text-primary"
                  aria-label="Increase Quantity"
                >+</button>
              </div>
              
              {/* Add to Cart button */}
              <button 
                onClick={handleAddToCart}
                className={`flex-1 font-bold py-4.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md ${
                  quantityInCart > 0 
                    ? 'bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-primary' 
                    : 'bg-primary text-secondary hover:bg-primary-light'
                }`}
              >
                {quantityInCart > 0 ? `In Cart (${quantityInCart})` : 'Add to Cart'}
              </button>
            </div>
            
            {/* Buy it Now button */}
            <button 
              onClick={handleBuyNow}
              className="w-full bg-accent text-primary hover:bg-accent-dark font-bold py-4.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 mb-4 rounded-sm shadow-md border border-accent/20 cursor-pointer"
            >
              Buy It Now
            </button>

            {/* Wishlist toggle */}
            <button 
              onClick={handleToggleWishlist}
              className={`w-full font-bold py-4.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 mb-10 rounded-sm shadow-sm border flex items-center justify-center gap-2 cursor-pointer ${
                isSaved 
                  ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                  : 'bg-white border-primary/10 text-primary hover:border-accent'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-red-600' : ''}`} />
              <span>{isSaved ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
            </button>

            {/* Fast checkout trust signals */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-primary/5 py-5 mb-10 text-center text-[10px] text-dark/70 uppercase tracking-wider font-semibold font-sans">
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>WHO-GMP Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-accent" />
                <span>Free & Safe Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RefreshCw className="w-5 h-5 text-accent" />
                <span>30-Day Money-Back</span>
              </div>
            </div>

            {/* Tabs panel */}
            <div className="border border-primary/5 bg-white p-6 rounded-sm shadow-sm">
              <div className="flex space-x-6 mb-6 font-serif text-sm md:text-base border-b border-primary/5 pb-2">
                <button 
                  className={`pb-2 font-bold tracking-wide transition-all ${activeTab === 'ingredients' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('ingredients')}
                >Ingredients</button>
                <button 
                  className={`pb-2 font-bold tracking-wide transition-all ${activeTab === 'usage' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('usage')}
                >How to Use</button>
                <button 
                  className={`pb-2 font-bold tracking-wide transition-all ${activeTab === 'sourcing' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('sourcing')}
                >Sourcing</button>
                <button 
                  className={`pb-2 font-bold tracking-wide transition-all ${activeTab === 'shipping' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('shipping')}
                >Shipping</button>
              </div>
              
              <div className="text-dark/75 font-sans font-light text-sm leading-relaxed min-h-[110px] animate-fadeIn">
                {activeTab === 'ingredients' && (
                  <p className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{product.ingredients}</span>
                  </p>
                )}
                {activeTab === 'usage' && <p>{product.usage}</p>}
                {activeTab === 'sourcing' && <p>{product.sourcing}</p>}
                {activeTab === 'shipping' && <p>{product.shipping}</p>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
