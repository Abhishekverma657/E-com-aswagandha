import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { user, token, toggleSavedProduct } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchSavedProducts = async () => {
      try {
        const res = await fetch('/api/users/saved-products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to load saved products");
        const data = await res.json();
        setSavedItems(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProducts();
  }, [token, navigate, user?.savedProducts]); // refresh list when user.savedProducts array changes

  const handleRemove = async (productId) => {
    const success = await toggleSavedProduct(productId);
    if (success) {
      setSavedItems(prev => prev.filter(item => item.id !== productId));
    }
  };

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-xs font-sans font-medium text-primary/60 uppercase tracking-widest">Loading Saved Products...</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen pt-28 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/60 hover:text-accent font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span>Continue Sourcing</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-primary tracking-wide">Saved Products</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-sm font-sans mb-8">
            {error}
          </div>
        )}

        {savedItems.length === 0 ? (
          <div className="bg-white p-12 md:p-20 text-center border border-primary/5 rounded-sm shadow-md max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-accent stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary">Your Wishlist is Empty</h2>
            <p className="text-dark/65 font-sans font-light text-sm max-w-md mx-auto leading-relaxed">
              Bookmark your favorite adaptogens, pure resins, and vitality combos. Sourced organically from local farms for premium quality.
            </p>
            <Link 
              to="/shop" 
              className="inline-block bg-primary text-secondary hover:bg-primary-light font-bold py-4 px-10 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {savedItems.map((product) => (
              <div key={product.id} className="relative group bg-white border border-primary/5 rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all duration-500 flex flex-col justify-between">
                <ProductCard {...product} />
                
                {/* Overlay actions */}
                <div className="p-4 border-t border-primary/5 flex items-center justify-between gap-3 bg-secondary/10">
                  <button 
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                    className="flex-grow bg-primary text-secondary hover:bg-primary-light text-[10px] font-bold uppercase tracking-wider py-2.5 px-3 rounded-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-accent" />
                    <span>Add to Cart</span>
                  </button>
                  <button 
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-2.5 rounded-xs transition-colors border border-red-200/40"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
