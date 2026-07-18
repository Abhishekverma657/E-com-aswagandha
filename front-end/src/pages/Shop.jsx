import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';

const allProducts = [
  { 
    id: 1, 
    title: "Nagouri Ashwagandha Root Extract (600mg)", 
    price: 799.00, 
    originalPrice: 1199.00,
    category: "Ashwagandha", 
    image: '/nagori-ashwagandha.png',
    rating: 4.9,
    reviewCount: 186
  },
  { 
    id: 2, 
    title: "Pure Himalayan Shilajit Resin (Gold Grade)", 
    price: 1699.00, 
    originalPrice: 2398.00,
    category: "Shilajit", 
    image: '/himalayan-shilajit.png',
    rating: 4.95,
    reviewCount: 312
  },
  { 
    id: 3, 
    title: "Ashwagandha & Wild Berry Vitality Gummies", 
    price: 899.00, 
    originalPrice: 1299.00,
    category: "Gummies", 
    image: '/vitality-gummies.png',
    rating: 4.8,
    reviewCount: 94
  },
  { 
    id: 4, 
    title: "Testoboost Combo (Shilajit & Ashwagandha)", 
    price: 1599.00, 
    originalPrice: 2398.00,
    category: "Combos", 
    image: '/himalayan-shilajit.png',
    rating: 4.9,
    reviewCount: 147
  },
  { 
    id: 5, 
    title: "Nagouri Ashwagandha Churna Powder (200g)", 
    price: 599.00, 
    originalPrice: 899.00,
    category: "Ashwagandha", 
    image: '/nagori-ashwagandha.png',
    rating: 4.75,
    reviewCount: 88
  },
  { 
    id: 6, 
    title: "Deep Sleep Melatonin-Free Capsules", 
    price: 1099.00, 
    originalPrice: 1499.00,
    category: "Stress & Sleep", 
    image: '/nagori-ashwagandha.png',
    rating: 4.85,
    reviewCount: 112
  },
  { 
    id: 7, 
    title: "Shilajit Gold Resin with 24k Gold Bhasma", 
    price: 2099.00, 
    originalPrice: 2998.00,
    category: "Shilajit", 
    image: '/himalayan-shilajit.png',
    rating: 4.97,
    reviewCount: 76
  },
  { 
    id: 8, 
    title: "Ashwagandha KSM-66 & Gokhru-60 Combo", 
    price: 1199.00, 
    originalPrice: 1848.00,
    category: "Combos", 
    image: '/vitality-gummies.png',
    rating: 4.9,
    reviewCount: 135
  },
];

const categories = ["All Products", "Ashwagandha", "Shilajit", "Gummies", "Stress & Sleep", "Combos"];

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
    <div className="min-h-screen bg-secondary pt-24 pb-20">
      {/* Header Banner */}
      <div className="bg-primary text-secondary py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold font-sans">Premium Formulations</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mt-3 mb-6 text-secondary tracking-wide">Shop Our Collection</h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-6"></div>
          <p className="opacity-80 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
            Explore our curated catalog of certified pure adaptogens, mineral-rich resins, and holistic wellness support, sourced directly from local Indian farms.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-8 border border-primary/5 rounded-sm shadow-sm sticky top-36">
            <h3 className="font-serif text-xl font-bold mb-6 text-primary border-b border-primary/5 pb-3 tracking-wide">Categories</h3>
            <ul className="space-y-4 mb-10 font-sans text-sm font-medium">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`transition-all duration-300 flex items-center justify-between w-full group ${
                      selectedCategory === cat ? 'text-accent font-bold' : 'text-primary/75 hover:text-accent font-light'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`w-1.5 h-1.5 rounded-full bg-accent transition-all duration-300 ${
                      selectedCategory === cat ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50'
                    }`}></span>
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="font-serif text-xl font-bold mb-6 text-primary border-b border-primary/5 pb-3 tracking-wide">Price Range</h3>
            <div className="flex flex-col space-y-4 font-sans">
              <div className="flex items-center justify-between border border-primary/10 bg-secondary/20 px-4 py-3 rounded-sm">
                <span className="text-primary/50 text-xs font-semibold">₹ Min</span>
                <input 
                  type="number" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0" 
                  className="w-full text-right bg-transparent outline-none ml-2 text-sm text-primary font-medium" 
                />
              </div>
              <div className="flex items-center justify-between border border-primary/10 bg-secondary/20 px-4 py-3 rounded-sm">
                <span className="text-primary/50 text-xs font-semibold">₹ Max</span>
                <input 
                  type="number" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="3000" 
                  className="w-full text-right bg-transparent outline-none ml-2 text-sm text-primary font-medium" 
                />
              </div>
              {(minPrice || maxPrice || selectedCategory !== "All Products") && (
                <button 
                  onClick={() => { setSelectedCategory("All Products"); setMinPrice(""); setMaxPrice(""); }}
                  className="w-full bg-primary/5 text-primary hover:bg-accent hover:text-primary transition-all duration-300 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm mt-2 border border-primary/5"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-primary/5 gap-4">
            <span className="text-sm text-dark/60 font-light font-sans">
              Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'formulation' : 'formulations'}
            </span>
            <div className="flex items-center gap-3 font-sans">
              <span className="text-xs uppercase tracking-widest text-primary/60 font-semibold">Sort by</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border border-primary/10 rounded-sm py-2 px-3 text-primary text-xs font-medium outline-none focus:border-accent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alpha-asc">Alphabetically, A-Z</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-primary/5 rounded-sm shadow-sm">
              <p className="text-xl text-primary/60 font-serif">No products found matching your criteria.</p>
              <button 
                onClick={() => { setSelectedCategory("All Products"); setMinPrice(""); setMaxPrice(""); }}
                className="mt-6 text-accent hover:text-primary font-bold underline transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
