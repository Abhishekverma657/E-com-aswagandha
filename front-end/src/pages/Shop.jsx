import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';

const allProducts = [
  { id: 1, title: "Premium Ashwagandha Root Extract", price: 999.00, category: "Ashwagandha", image: '/product-image.png' },
  { id: 2, title: "Stress Relief Blend", price: 1299.00, category: "Stress & Sleep", image: '/product-image.png' },
  { id: 3, title: "Vitality Boost Gummies", price: 899.00, category: "Energy & Vitality", image: '/product-image.png' },
  { id: 4, title: "Pure Himalayan Shilajit", price: 1499.00, category: "Energy & Vitality", image: '/product-image.png' },
  { id: 5, title: "Ashwagandha Churna Powder", price: 599.00, category: "Ashwagandha", image: '/product-image.png' },
  { id: 6, title: "Sleep Well Capsules", price: 1099.00, category: "Stress & Sleep", image: '/product-image.png' },
  { id: 7, title: "Ayurvedic Immunity Drops", price: 799.00, category: "Immunity", image: '/product-image.png' },
  { id: 8, title: "Muscle Recovery Mix", price: 1599.00, category: "Energy & Vitality", image: '/product-image.png' },
];

const categories = ["All Products", "Ashwagandha", "Stress & Sleep", "Immunity", "Energy & Vitality"];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Filter by Category
    if (selectedCategory !== "All Products") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Price
    if (minPrice) {
      result = result.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Sort
    if (sortOption === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "alpha-asc") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return result;
  }, [selectedCategory, minPrice, maxPrice, sortOption]);

  return (
    <div className="min-h-screen bg-secondary pt-10">
      {/* Header */}
      <div className="bg-secondary text-primary py-16 text-center border-b border-primary/10">
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary">Shop Our Collection</h1>
        <div className="w-16 h-px bg-accent mx-auto mb-6"></div>
        <p className="opacity-80 max-w-2xl mx-auto px-4 font-light text-lg">
          Discover our full range of premium, lab-tested Ayurvedic formulations designed to help you live a balanced life.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-8 border border-primary/10 sticky top-32">
            <h3 className="font-serif text-2xl mb-6 text-primary">Categories</h3>
            <ul className="space-y-4 mb-10">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`transition-colors ${selectedCategory === cat ? 'text-accent font-bold' : 'text-primary/70 hover:text-primary'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="font-serif text-2xl mb-6 text-primary">Price Range</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between border border-primary/20 px-4 py-2">
                <span className="text-primary/50 text-sm">₹</span>
                <input 
                  type="number" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min" 
                  className="w-full text-right bg-transparent outline-none ml-2 text-sm text-primary" 
                />
              </div>
              <div className="flex items-center justify-between border border-primary/20 px-4 py-2">
                <span className="text-primary/50 text-sm">₹</span>
                <input 
                  type="number" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max" 
                  className="w-full text-right bg-transparent outline-none ml-2 text-sm text-primary" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-primary/10 gap-4">
            <span className="text-sm opacity-70 font-light">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm uppercase tracking-widest text-primary/70">Sort by</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border-b border-primary/30 py-2 text-primary text-sm outline-none focus:border-accent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alpha-asc">Alphabetically, A-Z</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-primary/60 font-serif">No products found matching your criteria.</p>
              <button 
                onClick={() => { setSelectedCategory("All Products"); setMinPrice(""); setMaxPrice(""); }}
                className="mt-6 text-accent underline hover:text-primary transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
