import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary py-12 px-6 md:px-12 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="font-serif text-2xl font-bold mb-4 tracking-widest text-accent">DESIALCHEMIST</h2>
          <p className="text-sm opacity-80 leading-relaxed">
            Authentic Ayurvedic formulations crafted with care. 
            Revitalize your body and mind with our premium Ashwagandha and herbal products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-lg font-bold mb-4 uppercase tracking-wider text-accent">Quick Links</h3>
          <ul className="space-y-2 opacity-80 text-sm">
            <li><Link to="/shop" className="hover:text-accent transition-colors">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-serif text-lg font-bold mb-4 uppercase tracking-wider text-accent">Policies</h3>
          <ul className="space-y-2 opacity-80 text-sm">
            <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            <li><Link to="/refund" className="hover:text-accent transition-colors">Refund Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-serif text-lg font-bold mb-4 uppercase tracking-wider text-accent">Newsletter</h3>
          <p className="text-sm opacity-80 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-transparent border border-secondary/30 px-4 py-2 text-sm focus:outline-none focus:border-accent"
            />
            <button 
              type="submit"
              className="bg-accent text-primary font-bold py-2 px-4 hover:bg-white transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-secondary/20 text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} DesiAlchemist. All rights reserved.
      </div>
    </footer>
  );
}
