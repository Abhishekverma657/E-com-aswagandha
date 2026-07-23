import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('whats-new');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // For this design, we'll split the products into two mock categories based on the fetched data
  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const whatsNewProducts = products.slice(0, 4);
  const mostLovedProducts = products.slice(2, 6); // Just mock data overlapping for demonstration

  const currentProducts = activeTab === 'whats-new' ? whatsNewProducts : mostLovedProducts;

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-10 text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-[1px] w-6 bg-gray-400"></div>
          <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">Shop by concern</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-gray-900 tracking-tight">
          What's stopping you
        </h2>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mb-4"></div>
          <p className="text-xs font-sans font-medium text-primary/60 uppercase tracking-widest">Loading Products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {currentProducts.map(product => (
            <ProductCard key={`${activeTab}-${product.id}`} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
