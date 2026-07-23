import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[100] flex flex-col"
    >
      {/* TIER 1: Top Black Announcement Bar */}
      <div className="bg-[#0a0a0a] text-white text-center py-1.5 px-4 text-[11px] md:text-[13px] font-sans flex flex-col items-center justify-center relative z-20">
        <span className="font-bold tracking-wide">Premium Nagouri Ashwagandha, now GI-Tagged</span>
        <span className="font-light tracking-wide text-gray-300 mt-0.5">Order today, Get it Tomorrow.</span>
      </div>

      {/* TIER 2: Main Navbar */}
      <nav 
        className={`w-full transition-all duration-300 bg-white relative z-20 ${
          scrolled ? 'shadow-md border-b border-gray-200' : 'border-b border-gray-100'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 -ml-2 text-gray-800 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo (Left) */}
          <Link 
            to="/" 
            className="flex flex-col items-center justify-center text-center lg:min-w-[150px] mr-4"
          >
            {/* SVG Mountain/Sun placeholder for logo matching the screenshot vibe */}
            <svg width="40" height="24" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
              <path d="M50 5 L35 30 L65 30 Z" fill="#20331f"/>
              <path d="M30 15 L15 30 L45 30 Z" fill="#2f5f38"/>
              <path d="M70 15 L55 30 L85 30 Z" fill="#2f5f38"/>
              <circle cx="50" cy="15" r="8" fill="#d8b06c" opacity="0.6" className="animate-pulse-subtle"/>
            </svg>
            <span className="font-serif text-lg md:text-xl font-bold text-gray-900 tracking-wider leading-none uppercase">Nagouri</span>
            <span className="font-sans text-[8px] md:text-[9px] text-gray-500 tracking-[0.2em] uppercase mt-1">Nature's Best</span>
          </Link>

          {/* Desktop Navigation (Center) */}
          <div className="hidden lg:flex flex-1 justify-center space-x-6 xl:space-x-8 items-center font-sans text-[13px] font-semibold text-gray-800 h-full">
            
            {/* SHOP Dropdown (Mega Menu) */}
            <div className="group h-full flex items-center py-2 cursor-pointer" key={`shop-${location.pathname}`}>
              <Link to="/shop" className="flex items-center gap-1 hover:text-accent transition-colors">
                SHOP
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
              
              {/* Mega Menu Container */}
              <div className="absolute top-[100%] left-0 w-full bg-white border-t border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 translate-y-2 group-hover:translate-y-0">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex gap-8">
                  
                  {/* Column 1: Daily Essentials */}
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-[13px] text-gray-900 uppercase tracking-wide mb-6 flex items-center justify-between border-b border-gray-100 pb-2">
                      DAILY ESSENTIALS <span className="text-gray-400 font-normal">→</span>
                    </h3>
                    <div className="space-y-6">
                      <Link to="/shop" className="flex gap-4 group/item">
                        <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=150&auto=format&fit=crop" className="w-[72px] h-[72px] object-cover rounded bg-gray-100" alt="Magnesium" />
                        <div>
                          <p className="font-sans font-bold text-[13px] text-gray-900 group-hover/item:text-accent transition-colors line-clamp-1">Magnesium Glycinate - From USA</p>
                          <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">Highly absorbable magnesium for sleep & recovery</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-[#4a3621] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">BEST SELLER ★</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">★ 4.22</span>
                          </div>
                        </div>
                      </Link>
                      <Link to="/shop" className="flex gap-4 group/item">
                        <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=150&auto=format&fit=crop" className="w-[72px] h-[72px] object-cover rounded bg-gray-100" alt="Omega 3" />
                        <div>
                          <p className="font-sans font-bold text-[13px] text-gray-900 group-hover/item:text-accent transition-colors line-clamp-1">Plant-Based Omega-3 - The...</p>
                          <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">Vegan Omega-3 Without Fishy Burps</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-[#4a3621] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">BEST SELLER ★</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">★ 4.23</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Men's Health */}
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-[13px] text-gray-900 uppercase tracking-wide mb-6 flex items-center justify-between border-b border-gray-100 pb-2">
                      MEN'S HEALTH <span className="text-gray-400 font-normal">→</span>
                    </h3>
                    <div className="space-y-6">
                      <Link to="/shop" className="flex gap-4 group/item">
                        <img src="https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=150&auto=format&fit=crop" className="w-[72px] h-[72px] object-cover rounded bg-gray-100" alt="Testoboost" />
                        <div>
                          <p className="font-sans font-bold text-[13px] text-gray-900 group-hover/item:text-accent transition-colors line-clamp-1">Testoboost - Lift Harder, Last...</p>
                          <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">Supports strength, stamina & sexual performance</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-[#4a3621] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">BEST SELLER ★</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">★ 4.69</span>
                          </div>
                        </div>
                      </Link>
                      <Link to="/shop" className="flex gap-4 group/item">
                        <img src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=150&auto=format&fit=crop" className="w-[72px] h-[72px] object-cover rounded bg-gray-100" alt="Multivitamin" />
                        <div>
                          <p className="font-sans font-bold text-[13px] text-gray-900 group-hover/item:text-accent transition-colors line-clamp-1">Multivitamin Tablets for Men</p>
                          <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">Complete daily nutrition for energy, immunity & performance</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-white border border-gray-300 text-gray-800 text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">NEW & BETTER 🔥</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">★ 4.25</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Column 3: Women's Health */}
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-[13px] text-gray-900 uppercase tracking-wide mb-6 flex items-center justify-between border-b border-gray-100 pb-2">
                      WOMEN'S HEALTH <span className="text-gray-400 font-normal">→</span>
                    </h3>
                    <div className="space-y-6">
                      <Link to="/shop" className="flex gap-4 group/item">
                        <img src="https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=150&auto=format&fit=crop" className="w-[72px] h-[72px] object-cover rounded bg-gray-100" alt="Women Multi" />
                        <div>
                          <p className="font-sans font-bold text-[13px] text-gray-900 group-hover/item:text-accent transition-colors line-clamp-1">Multivitamin for Women</p>
                          <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">Daily 360° nutrition for energy, hormones & overall wellness</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-white border border-gray-300 text-gray-800 text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">NEW LAUNCH 🔥</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">★ 4.55</span>
                          </div>
                        </div>
                      </Link>
                      <Link to="/shop" className="flex gap-4 group/item">
                        <img src="https://images.unsplash.com/photo-1608248593842-83b38c234a92?q=80&w=150&auto=format&fit=crop" className="w-[72px] h-[72px] object-cover rounded bg-gray-100" alt="Saffron" />
                        <div>
                          <p className="font-sans font-bold text-[13px] text-gray-900 group-hover/item:text-accent transition-colors line-clamp-1">Kashmiri Mongra Saffron/Kesar...</p>
                          <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">Only the best A+ certified mongra kesar with the finest flavor</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-[#4a3621] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">BEST SELLER ★</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">★ 4.80</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Column 4: Targeted Support */}
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-[13px] text-gray-900 uppercase tracking-wide mb-6 flex items-center justify-between border-b border-gray-100 pb-2">
                      TARGETED SUPPORT <span className="text-gray-400 font-normal">→</span>
                    </h3>
                    <div className="space-y-6">
                      <Link to="/shop" className="flex gap-4 group/item">
                        <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=150&auto=format&fit=crop" className="w-[72px] h-[72px] object-cover rounded bg-gray-100" alt="Liver Detox" />
                        <div>
                          <p className="font-sans font-bold text-[13px] text-gray-900 group-hover/item:text-accent transition-colors line-clamp-1">Liver Detox - 360° Liver Support</p>
                          <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">Supports liver health & function</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-white border border-gray-300 text-gray-800 text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">NEW LAUNCH 🔥</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">★ 4.60</span>
                          </div>
                        </div>
                      </Link>
                      <Link to="/shop" className="flex gap-4 group/item">
                        <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=150&auto=format&fit=crop" className="w-[72px] h-[72px] object-cover rounded bg-gray-100" alt="Curcumin" />
                        <div>
                          <p className="font-sans font-bold text-[13px] text-gray-900 group-hover/item:text-accent transition-colors line-clamp-1">Curcumin - Triple Power</p>
                          <p className="font-sans text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-2">High-strength curcumin for joint comfort & inflammation</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-[#4a3621] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">BEST SELLER ★</span>
                            <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">★ 4.91</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ALL PRODUCTS Dropdown */}
            <div className="group h-full flex items-center py-2 cursor-pointer relative" key={`products-${location.pathname}`}>
              <span className="flex items-center gap-1 hover:text-accent transition-colors">
                ALL PRODUCTS
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </span>
              <div className="absolute top-[100%] left-0 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2 translate-y-2 group-hover:translate-y-0">
                <ul className="flex flex-col space-y-0">
                  <li><Link to="/shop" className="block px-5 py-2 hover:bg-gray-50 hover:text-accent transition-colors text-sm font-medium text-gray-700">Browse All</Link></li>
                  <li><Link to="/shop?category=immunity" className="block px-5 py-2 hover:bg-gray-50 hover:text-accent transition-colors text-sm font-medium text-gray-700">Immunity</Link></li>
                  <li><Link to="/shop?category=energy" className="block px-5 py-2 hover:bg-gray-50 hover:text-accent transition-colors text-sm font-medium text-gray-700">Energy</Link></li>
                </ul>
              </div>
            </div>

            <Link to="/build-box" className="hover:text-accent transition-colors py-2 uppercase">
              BUILD YOUR OWN BOX
            </Link>

            <Link to="/blogs" className="hover:text-accent transition-colors py-2 uppercase">
              BLOGS
            </Link>

            {/* VERIFY ORDER Dropdown */}
            <div className="group h-full flex items-center py-2 cursor-pointer relative" key={`verify-${location.pathname}`}>
              <span className="flex items-center gap-1 hover:text-accent transition-colors">
                VERIFY ORDER
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </span>
              <div className="absolute top-[100%] left-0 w-[220px] bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-1 rounded-b-md translate-y-2 group-hover:translate-y-0">
                <ul className="flex flex-col space-y-0">
                  <li><Link to="/track-order" className="block px-5 py-3 hover:bg-gray-50 hover:text-accent transition-colors text-[13px] font-medium text-gray-700 border-b border-gray-50">Track Your Order</Link></li>
                  <li><Link to="/authenticate" className="block px-5 py-3 hover:bg-gray-50 hover:text-accent transition-colors text-[13px] font-medium text-gray-700">Authenticate Your Product</Link></li>
                </ul>
              </div>
            </div>

            <Link to="/about" className="hover:text-accent transition-colors py-2 uppercase">
              OUR STORY
            </Link>
          </div>

          {/* Icons (Right) */}
          <div className="flex space-x-3 md:space-x-5 items-center justify-end min-w-[120px] lg:min-w-[150px]">
            
            {/* Search Icon */}
            <button className="text-gray-800 hover:text-black hover:bg-gray-100 p-2 rounded-full transition-all hidden sm:flex" aria-label="Search">
              <Search className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[2]" />
            </button>

            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="text-gray-800 hover:text-black hover:bg-gray-100 p-2 rounded-full transition-all relative flex"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[2]" />
              <span className="absolute top-0.5 right-0 bg-black text-white text-[9px] md:text-[10px] font-bold w-4 h-4 md:w-[18px] md:h-[18px] rounded-full flex items-center justify-center border-2 border-white">
                {cartCount || 0}
              </span>
            </Link>

            {/* User Icon & Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => {
                  if (!user) navigate('/login');
                }}
                className={`flex text-gray-800 hover:text-black hover:bg-gray-100 p-2 rounded-full transition-all`}
                aria-label="Account"
              >
                <User className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[2]" />
              </button>

              {user && (
                <div className="absolute right-0 top-[100%] mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-md py-2 z-50 font-sans text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 text-left">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 mb-1 rounded-t-md">
                    <span className="text-[10px] text-gray-500 block font-bold uppercase tracking-wider">Signed in as</span>
                    <span className="font-serif font-bold text-gray-900 block truncate mt-0.5">{user.name}</span>
                  </div>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-accent hover:bg-gray-50 font-semibold transition-colors">
                      Admin Console
                    </Link>
                  )}
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors font-medium">
                    My Account
                  </Link>
                  {user.role === 'admin' ? (
                    <Link to="/admin" state={{ activeTab: 'orders' }} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors font-medium">
                      All Orders
                    </Link>
                  ) : (
                    <>
                      <Link to="/saved-products" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors font-medium">
                        Saved Products
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors font-medium">
                        My Orders
                      </Link>
                    </>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 flex flex-col overflow-hidden transition-all duration-300 ease-in-out z-40 ${
            isMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-full px-6 flex flex-col space-y-1 font-sans text-sm font-semibold tracking-wide text-gray-800">
             <Link to="/shop" className="w-full py-4 border-b border-gray-100 flex justify-between items-center">
               SHOP <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
             </Link>
             <Link to="/shop" className="w-full py-4 border-b border-gray-100 flex justify-between items-center">
               ALL PRODUCTS <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
             </Link>
             <Link to="/build-box" className="w-full py-4 border-b border-gray-100">BUILD YOUR OWN BOX</Link>
             <Link to="/blogs" className="w-full py-4 border-b border-gray-100">BLOGS</Link>
             <Link to="/track-order" className="w-full py-4 border-b border-gray-100 flex justify-between items-center">
               VERIFY ORDER <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
             </Link>
             <Link to="/about" className="w-full py-4 border-b border-gray-100">OUR STORY</Link>
             
             {user ? (
               <div className="pt-6 pb-2 bg-gray-50/50 -mx-6 px-6 mt-4">
                 <div className="text-[11px] text-gray-500 mb-3 font-bold uppercase tracking-wider">Account ({user.name})</div>
                 {user.role === 'admin' ? (
                   <>
                     <Link to="/admin" className="block w-full py-3 text-accent font-bold border-b border-gray-200/50">Admin Console</Link>
                     <Link to="/admin" state={{ activeTab: 'orders' }} className="block w-full py-3 text-gray-700 font-medium">All Orders</Link>
                   </>
                 ) : (
                   <>
                     <Link to="/profile" className="block w-full py-3 text-gray-700 font-medium border-b border-gray-200/50">My Account</Link>
                     <Link to="/orders" className="block w-full py-3 text-gray-700 font-medium border-b border-gray-200/50">My Orders</Link>
                     <Link to="/saved-products" className="block w-full py-3 text-gray-700 font-medium">Saved Products</Link>
                   </>
                 )}
                 <button 
                   onClick={() => {
                     logout();
                     navigate('/');
                   }}
                   className="w-full text-left py-4 text-red-600 font-bold tracking-widest mt-2 border-t border-gray-200/50"
                 >
                   LOGOUT
                 </button>
               </div>
             ) : (
               <Link to="/login" className="w-full py-6 text-accent font-bold text-center mt-4 bg-gray-50 rounded-md">LOGIN / SIGNUP</Link>
             )}
          </div>
        </div>
      </nav>

      {/* TIER 3: Bottom Marquee / Info Bar (Auto-scrolling horizontally seamless) */}
      <div className="bg-[#f7f8f9] border-b border-gray-200 py-2.5 overflow-hidden w-full relative z-10 flex">
        
        <div className="animate-marquee flex shrink-0 whitespace-nowrap text-[10px] md:text-[11px] font-sans font-bold text-gray-600 uppercase tracking-widest min-w-full justify-around">
          <span className="px-4">Same-Day Delivery Is Now Available On Selected Pin Codes</span>
          <span className="px-2 text-accent">•</span>
          <span className="px-4">Free Shipping On Orders Above 399</span>
          <span className="px-2 text-accent">•</span>
          <span className="px-4">Next-Day Delivery Is Now Available</span>
          <span className="px-2 text-accent">•</span>
          <span className="px-4">Extra 5% Off On All Prepaid Orders</span>
          <span className="px-2 text-accent">•</span>
        </div>

        {/* Duplicate for seamless looping effect */}
        <div className="animate-marquee flex shrink-0 whitespace-nowrap text-[10px] md:text-[11px] font-sans font-bold text-gray-600 uppercase tracking-widest min-w-full justify-around" aria-hidden="true">
          <span className="px-4">Same-Day Delivery Is Now Available On Selected Pin Codes</span>
          <span className="px-2 text-accent">•</span>
          <span className="px-4">Free Shipping On Orders Above 399</span>
          <span className="px-2 text-accent">•</span>
          <span className="px-4">Next-Day Delivery Is Now Available</span>
          <span className="px-2 text-accent">•</span>
          <span className="px-4">Extra 5% Off On All Prepaid Orders</span>
          <span className="px-2 text-accent">•</span>
        </div>

      </div>
    </motion.header>
  );
}
