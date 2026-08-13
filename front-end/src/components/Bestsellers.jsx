import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function Bestsellers() {
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        // Fetch up to 4 products to display in the bestsellers section
        setBestsellerProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center">
          {/* Header Area */}
          <div className="flex justify-between items-end w-full mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-[1px] w-8 bg-gray-400"></div>
                <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">Premium Formulas</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-gray-900 tracking-tight">
                Our Best Sellers
              </h2>
            </div>
            
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-sans font-bold text-gray-800 border-b-2 border-gray-900 pb-1 hover:text-accent hover:border-accent transition-colors">
              VIEW ALL EXPERT FORMULAS
            </Link>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20 w-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
              {bestsellerProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Mobile View All Button */}
          <div className="mt-12 md:hidden w-full">
            <Link to="/shop" className="flex items-center justify-center w-full py-4 border border-gray-300 rounded font-sans font-bold text-sm tracking-widest uppercase hover:bg-gray-50">
              VIEW ALL EXPERT FORMULAS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
