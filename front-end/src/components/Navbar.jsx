import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
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
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-secondary/90 backdrop-blur-md shadow-sm py-3' : 'bg-secondary py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 -ml-2 text-primary hover:text-accent transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo (Left on Desktop) */}
        <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-widest flex-1 md:flex-none md:w-1/4 text-center md:text-left">
          DESIALCHEMIST
        </Link>

        {/* Desktop Navigation (Center) */}
        <div className="hidden md:flex justify-center space-x-8 items-center font-serif text-sm uppercase tracking-[0.2em] w-1/2 flex-1">
          <Link 
            to="/shop" 
            className={`transition-colors relative group ${location.pathname === '/shop' ? 'text-accent' : 'hover:text-accent'}`}
          >
            Shop
            <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${location.pathname === '/shop' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors relative group ${location.pathname === '/about' ? 'text-accent' : 'hover:text-accent'}`}
          >
            About Us
            <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors relative group ${location.pathname === '/contact' ? 'text-accent' : 'hover:text-accent'}`}
          >
            Contact
            <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${location.pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
        </div>

        {/* Icons (Right) */}
        <div className="flex space-x-5 items-center justify-end md:w-1/4">
          <button className="text-primary hover:text-accent transition-transform hover:scale-110 hidden sm:block">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button className="text-primary hover:text-accent transition-transform hover:scale-110 hidden sm:block">
            <User className="w-5 h-5 stroke-[1.5]" />
          </button>
          <Link to="/cart" className="text-primary hover:text-accent transition-transform hover:scale-110 relative group">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-danger text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm group-hover:animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-secondary/95 backdrop-blur-md border-t border-primary/10 flex flex-col items-center justify-center space-y-6 font-serif text-lg tracking-widest overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 py-8 opacity-100 shadow-xl' : 'max-h-0 py-0 opacity-0'
        }`}
      >
        <Link to="/shop" className="hover:text-accent transition-colors w-full text-center py-2">SHOP</Link>
        <Link to="/about" className="hover:text-accent transition-colors w-full text-center py-2">ABOUT US</Link>
        <Link to="/contact" className="hover:text-accent transition-colors w-full text-center py-2">CONTACT</Link>
        <div className="flex justify-center space-x-8 pt-4 border-t border-primary/10 w-1/2">
          <button className="hover:text-accent"><Search className="w-5 h-5 stroke-[1.5]" /></button>
          <button className="hover:text-accent"><User className="w-5 h-5 stroke-[1.5]" /></button>
        </div>
      </div>
    </nav>
  );
}
