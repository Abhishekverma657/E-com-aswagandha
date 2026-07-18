import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Premium Announcement Bar */}
      <div className="bg-primary text-accent text-center py-2 px-4 text-xs font-serif tracking-[0.15em] border-b border-accent/20 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>100% CERTIFIED PURE • FREE SHIPPING ON ORDERS OVER ₹1500 • CASH ON DELIVERY AVAILABLE</span>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`w-full transition-all duration-500 ${
          scrolled 
            ? 'bg-secondary/90 backdrop-blur-lg border-b border-primary/5 py-3 shadow-md' 
            : 'bg-secondary/80 backdrop-blur-md border-b border-primary/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -ml-2 text-primary hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo (Left on Desktop) */}
          <Link 
            to="/" 
            className="font-serif text-xl md:text-2xl font-bold text-primary tracking-[0.15em] flex items-center gap-2 group text-left"
          >
            <span className="text-accent group-hover:text-accent-dark transition-colors">NAGOURI</span> 
            <span className="hidden sm:block font-sans font-semibold tracking-[0.05em] text-primary/80 group-hover:text-primary transition-colors text-[9px] border-l border-primary/20 pl-2 leading-tight">
              GI-TAGGED<br/>ASHWAGANDHA
            </span>
          </Link>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:flex justify-center space-x-10 items-center font-sans text-xs uppercase tracking-[0.25em] font-medium">
            <Link 
              to="/shop" 
              className={`transition-all duration-300 relative group ${location.pathname === '/shop' ? 'text-accent' : 'text-primary hover:text-accent'}`}
            >
              Shop
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-accent transition-all duration-300 ${location.pathname === '/shop' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link 
              to="/about" 
              className={`transition-all duration-300 relative group ${location.pathname === '/about' ? 'text-accent' : 'text-primary hover:text-accent'}`}
            >
              Our Story
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-accent transition-all duration-300 ${location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link 
              to="/contact" 
              className={`transition-all duration-300 relative group ${location.pathname === '/contact' ? 'text-accent' : 'text-primary hover:text-accent'}`}
            >
              Contact
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-accent transition-all duration-300 ${location.pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          </div>

          {/* Icons (Right) */}
          <div className="flex space-x-6 items-center justify-end">
            <button className="text-primary hover:text-accent transition-transform hover:scale-110 hidden sm:block" aria-label="Search">
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button className="text-primary hover:text-accent transition-transform hover:scale-110 hidden sm:block" aria-label="Account">
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>
            <Link 
              to="/cart" 
              className="text-primary hover:text-accent transition-transform hover:scale-110 relative group p-1"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5 stroke-[1.5]" />
              {cartCount > 0 ? (
                <span className="absolute -top-0.5 -right-1 bg-accent text-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse-subtle">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute -top-0.5 -right-1 bg-primary/10 text-primary/60 text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-primary/10">
                  0
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-secondary/95 backdrop-blur-md border-t border-primary/10 flex flex-col items-center justify-center space-y-6 font-serif text-lg tracking-widest overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-96 py-8 opacity-100 shadow-2xl border-b border-primary/5' : 'max-h-0 py-0 opacity-0 pointer-events-none'
          }`}
        >
          <Link to="/shop" className="hover:text-accent transition-colors w-full text-center py-2 text-primary font-medium">SHOP</Link>
          <Link to="/about" className="hover:text-accent transition-colors w-full text-center py-2 text-primary font-medium">OUR STORY</Link>
          <Link to="/contact" className="hover:text-accent transition-colors w-full text-center py-2 text-primary font-medium">CONTACT</Link>
          <div className="flex justify-center space-x-10 pt-4 border-t border-primary/10 w-1/2">
            <button className="hover:text-accent text-primary"><Search className="w-5 h-5" /></button>
            <button className="hover:text-accent text-primary"><User className="w-5 h-5" /></button>
          </div>
        </div>
      </nav>
    </header>
  );
}
