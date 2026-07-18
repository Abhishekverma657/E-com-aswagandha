import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary pt-20 pb-10 px-6 md:px-12 border-t border-accent/20">
      <div className="max-w-7xl mx-auto">
        {/* Top Trust Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-16 mb-16 border-b border-secondary/10">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
              <CheckCircle className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-base text-accent font-semibold tracking-wider">100% Pure & Organic</h4>
              <p className="text-xs opacity-75 mt-1 font-light">Sourced directly from certified Rajasthan organic farms.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
              <Award className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-base text-accent font-semibold tracking-wider">GMP Certified Quality</h4>
              <p className="text-xs opacity-75 mt-1 font-light">Formulated in WHO-GMP & ISO certified facilities.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
              <Mail className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-base text-accent font-semibold tracking-wider">Third-Party Lab Tested</h4>
              <p className="text-xs opacity-75 mt-1 font-light">Independent lab reports available for every batch.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
              <MapPin className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-serif text-base text-accent font-semibold tracking-wider">Ethically Harvested</h4>
              <p className="text-xs opacity-75 mt-1 font-light">Supporting local farming families in Nagaur, India.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="font-serif text-2xl font-bold tracking-[0.2em] text-accent block leading-none">
              NAGOURI<br/>
              <span className="font-sans font-semibold text-secondary/85 text-[10px] tracking-[0.08em] block mt-1">GI-TAGGED ASHWAGANDHA</span>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed font-light">
              Rooted in the soils of Nagaur, Rajasthan. The only certified producer, manufacturer, and supplier of authentic Nagauri Ashwagandha for stress support, vitality, and restorative wellness.
            </p>
            <div className="space-y-2.5 text-sm opacity-85 font-light">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span>+91 78628 26024</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span>thenagauri@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 uppercase tracking-wider text-accent border-b border-secondary/15 pb-2">Collections</h3>
            <ul className="space-y-3.5 opacity-80 text-sm font-light">
              <li><Link to="/shop" className="hover:text-accent transition-colors block">Shop All Products</Link></li>
              <li><Link to="/shop?category=Ashwagandha" className="hover:text-accent transition-colors block">Raw Nagauri Roots</Link></li>
              <li><Link to="/shop?category=Ashwagandha" className="hover:text-accent transition-colors block">Pure Nagauri Powder</Link></li>
              <li><Link to="/shop?category=Shilajit" className="hover:text-accent transition-colors block">Himalayan Shilajit Resin</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 uppercase tracking-wider text-accent border-b border-secondary/15 pb-2">Customer Care</h3>
            <ul className="space-y-3.5 opacity-80 text-sm font-light">
              <li><Link to="/about" className="hover:text-accent transition-colors block">Our Heritage Story</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors block">Get In Touch</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors block">Frequently Asked Questions</Link></li>
              <li><Link to="/shipping" className="hover:text-accent transition-colors block">Shipping & Delivery Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 uppercase tracking-wider text-accent border-b border-secondary/15 pb-2">Subscribe</h3>
            <p className="text-sm opacity-80 mb-6 font-light leading-relaxed">Join the circle for wellness formulations, exclusive sales access, and research articles.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-primary-dark/40 border border-secondary/25 px-4 py-3 text-sm focus:outline-none focus:border-accent text-secondary placeholder:text-secondary/40 font-light"
                required
              />
              <button 
                type="submit"
                className="bg-accent text-primary font-bold py-3 px-4 hover:bg-white hover:text-primary transition-all duration-300 text-xs tracking-widest uppercase font-sans"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-75 font-light">
          <div>
            &copy; {new Date().getFullYear()} Nagori Ayurveda. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-accent transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

