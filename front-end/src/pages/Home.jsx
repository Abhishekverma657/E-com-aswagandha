import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = [
    { id: 1, title: "Premium Ashwagandha Root Extract", price: 999.00, image: '/product-image.png' },
    { id: 2, title: "Stress Relief Blend", price: 1299.00, image: '/product-image.png' },
    { id: 3, title: "Vitality Boost Gummies", price: 899.00, image: '/product-image.png' },
    { id: 4, title: "Pure Himalayan Shilajit", price: 1499.00, image: '/product-image.png' },
  ];

  return (
    <div className="w-full bg-secondary">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-primary text-secondary overflow-hidden pt-20">
        {/* Guaranteed Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1611162458324-aae474164a36?q=80&w=2070&auto=format&fit=crop" 
            alt="Ayurvedic Background" 
            className="w-full h-full object-cover opacity-30 animate-fade-in"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto flex flex-col items-center">
          <p className="font-serif italic text-accent text-xl mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Rooted in ancient wisdom
          </p>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[1.1] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Discover the Magic <br/> of <span className="text-accent">Desi Alchemy</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in-up font-sans font-light tracking-wide text-secondary/80" style={{ animationDelay: '0.6s' }}>
            Revitalize your body and mind with our premium, lab-tested Ashwagandha and authentic Ayurvedic formulations.
          </p>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Link 
              to="/shop" 
              className="group relative inline-flex items-center justify-center bg-accent text-primary font-bold text-sm md:text-base py-4 px-12 uppercase tracking-[0.2em] overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
              <span className="relative z-10 group-hover:text-primary">Shop Collection</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-secondary text-primary border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Why DesiAlchemist?</h2>
            <div className="w-16 h-px bg-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full bg-primary/5 text-accent transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-primary/10">
                <span className="font-serif text-3xl">1</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-primary">100% Pure</h3>
              <p className="opacity-70 leading-relaxed font-light">Sourced directly from organic farms, ensuring the highest quality, potency, and purity without compromise.</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full bg-primary/5 text-accent transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-primary/10">
                <span className="font-serif text-3xl">2</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-primary">Lab Tested</h3>
              <p className="opacity-70 leading-relaxed font-light">Every batch is rigorously tested in independent facilities for heavy metals and active compounds.</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full bg-primary/5 text-accent transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-primary/10">
                <span className="font-serif text-3xl">3</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-primary">Ayurvedic Wisdom</h3>
              <p className="opacity-70 leading-relaxed font-light">Formulated based on centuries-old Ayurvedic principles for true holistic wellness and balance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-secondary/30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Trending Now</h2>
              <div className="w-16 h-px bg-accent"></div>
            </div>
            <Link to="/shop" className="text-primary hover:text-accent font-serif italic text-lg transition-colors flex items-center gap-2">
              View Entire Collection <span className="text-2xl leading-none">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Banner */}
      <section className="py-24 px-6 bg-primary text-secondary text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-accent">Join the Alchemy</h2>
          <p className="opacity-80 mb-10 font-light text-lg">Subscribe to receive wellness tips, new product launches, and exclusive early access to our sales.</p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent border-b border-secondary/50 px-2 py-3 text-secondary placeholder:text-secondary/50 focus:outline-none focus:border-accent font-light"
              required
            />
            <button type="submit" className="text-accent font-bold uppercase tracking-[0.2em] text-sm hover:text-white transition-colors py-3">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
