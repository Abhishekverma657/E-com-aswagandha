import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function Bestsellers() {
  // Mock data tailored specifically to match the Bestsellers screenshot
  const bestsellerProducts = [
    {
      id: "testoboost-1",
      title: "Testoboost - Lift Harder, Last Longer",
      subtitle: "Supports strength, stamina & sexual performance",
      price: 1399,
      originalPrice: 1898,
      rating: 4.7,
      reviewCount: 300,
      image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop", // placeholder
      categoryTag: "STAMINA & VITALITY",
      badge: "BEST SELLER"
    },
    {
      id: "ksm66-1",
      title: "Ashwagandha KSM-66 (600 mg)",
      subtitle: "Clinically proven dosage for stress relief, strength & recovery",
      price: 1299,
      originalPrice: 2398,
      rating: 4.7,
      reviewCount: 399,
      image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?q=80&w=800&auto=format&fit=crop", // placeholder
      categoryTag: "STRESS RELIEF",
      badge: "BEST SELLER"
    },
    {
      id: "multi-1",
      title: "Multivitamin Tablets for Men",
      subtitle: "Complete daily nutrition for energy, immunity & performance",
      price: 1099,
      originalPrice: 1398,
      rating: 4.3,
      reviewCount: 105,
      image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=800&auto=format&fit=crop", // placeholder
      categoryTag: "DAILY NUTRITION",
      badge: "NEW & BETTER"
    },
    {
      id: "mag-1",
      title: "Magnesium Glycinate - From USA",
      subtitle: "Highly absorbable magnesium for sleep & recovery",
      price: 1799,
      originalPrice: 2598,
      rating: 4.2,
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop", // placeholder
      categoryTag: "BETTER SLEEP",
      badge: "BEST SELLER"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white relative">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1px] w-6 bg-gray-400"></div>
              <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">Bestsellers</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight">
              <strong className="font-sans font-bold">Where most</strong><br/>
              <strong className="font-sans font-bold">customers</strong> <span className="font-sans font-light text-gray-500">begin</span>
            </h2>
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link 
              to="/shop" 
              className="inline-block bg-primary hover:bg-primary-light text-white font-sans font-bold text-[13px] px-8 py-3.5 rounded-md transition-colors"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {bestsellerProducts.map(product => (
            <motion.div 
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
