import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Triggers when 30% of the banner is visible
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes comeFromBehind {
            0% {
              opacity: 0;
              transform: scale(0.5) translateZ(-500px);
              filter: blur(10px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateZ(0);
              filter: blur(0);
            }
          }
          .animate-come-from-behind {
            animation: comeFromBehind 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>
      <footer className="bg-[#f4f1ea] pt-16 border-t border-[#e6e2d6] overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-[#e6e2d6] gap-8">
          
          {/* Brand & Socials */}
          <div>
            <Link to="/" className="block mb-6">
              <h2 className="font-serif text-3xl font-bold tracking-widest text-gray-900 leading-none">NAGOURI<sup className="text-sm font-sans">®</sup></h2>
              <span className="font-sans font-light tracking-[0.2em] text-[10px] text-gray-500 uppercase mt-1 block">NATURE'S BEST</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="font-sans font-bold text-gray-700 text-sm">Join Us On</span>
              <a href="#" className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-sm bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Payments & Trust */}
          <div className="text-right">
            <h4 className="font-sans font-bold text-gray-700 text-sm mb-4">Smooth & Secure Checkout</h4>
            <div className="flex items-center justify-end gap-3 md:gap-6 mb-4 grayscale opacity-80">
              {/* Payment Icons (Simulated text/badges) */}
              <span className="font-sans font-bold text-gray-600 text-[13px] border border-[#d6d2c4] px-2 py-1 rounded">BHIM</span>
              <span className="font-sans font-bold text-gray-600 text-[13px] border border-[#d6d2c4] px-2 py-1 rounded">GPay</span>
              <span className="font-sans font-bold text-gray-600 text-[13px] border border-[#d6d2c4] px-2 py-1 rounded">PhonePe</span>
              <span className="font-sans font-bold text-gray-600 text-[13px] border border-[#d6d2c4] px-2 py-1 rounded">Paytm</span>
              <span className="font-sans font-bold text-blue-800 text-[13px] border border-[#d6d2c4] px-2 py-1 rounded">VISA</span>
            </div>
            <h4 className="font-sans font-bold text-gray-700 text-sm">Cash on Delivery Works Too!</h4>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-12">
          
          {/* Shop */}
          <div>
            <h3 className="font-sans font-bold text-[15px] text-gray-900 mb-6 tracking-wide">SHOP</h3>
            <ul className="space-y-4 font-sans font-light text-gray-600 text-sm">
              <li><Link to="/best-sellers" className="hover:text-black transition-colors">Best Sellers</Link></li>
              <li><Link to="/new-launches" className="hover:text-black transition-colors">New Launches</Link></li>
              <li><Link to="/combos" className="hover:text-black transition-colors">Combos</Link></li>
              <li><Link to="/build-box" className="hover:text-black transition-colors">Build Your Own Box</Link></li>
              <li><Link to="/merchandise" className="hover:text-black transition-colors">Merchandise</Link></li>
              <li><Link to="/shop-all" className="hover:text-black transition-colors">Shop All</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-bold text-[15px] text-gray-900 mb-6 tracking-wide">QUICK LINKS</h3>
            <ul className="space-y-4 font-sans font-light text-gray-600 text-sm">
              <li><Link to="/blogs" className="hover:text-black transition-colors">Blogs</Link></li>
              <li><Link to="/our-story" className="hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/track-order" className="hover:text-black transition-colors">Track Your Order</Link></li>
              <li><Link to="/authenticate" className="hover:text-black transition-colors">Authenticate Your Order</Link></li>
              <li><Link to="/affiliate" className="hover:text-black transition-colors">Affiliate Program</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-sans font-bold text-[15px] text-gray-900 mb-6 tracking-wide">HELP</h3>
            <ul className="space-y-4 font-sans font-light text-gray-600 text-sm">
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-black transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-black transition-colors">Return & Refunds</Link></li>
              <li><Link to="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/ask-expert" className="hover:text-black transition-colors">Ask An Expert</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-sans font-bold text-[15px] text-gray-900 mb-6 tracking-wide">CONTACT US</h3>
            
            <div className="space-y-6">
              <div>
                <p className="font-sans font-bold text-[11px] text-gray-900 uppercase tracking-wider mb-2">CALL OR WHATSAPP US</p>
                <div className="flex items-center gap-2 text-gray-600 font-sans font-light text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+91-78628-26024</span>
                </div>
              </div>

              <div>
                <p className="font-sans font-bold text-[11px] text-gray-900 uppercase tracking-wider mb-2">WRITE TO US:</p>
                <div className="flex items-center gap-2 text-gray-600 font-sans font-light text-sm">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:thenagauri@gmail.com" className="hover:text-black transition-colors">thenagauri@gmail.com</a>
                </div>
              </div>

              <div>
                <p className="font-sans font-bold text-[11px] text-gray-900 uppercase tracking-wider mb-2">CORPORATE OFFICE</p>
                <div className="flex items-start gap-2 text-gray-600 font-sans font-light text-sm">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Nagaur, Rajasthan<br/>India - 341001</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Bottom */}
        <div className="py-8 border-t border-[#e6e2d6] text-center font-sans font-light text-[12px] text-gray-500">
          <p>© {new Date().getFullYear()} Nagouri Pure Ayurveda. All rights reserved.</p>
        </div>

      </div>

      {/* Massive Brand Banner at very bottom */}
      <div ref={bannerRef} className="bg-[#1e293b] w-full py-12 md:py-16 flex items-center justify-center overflow-hidden perspective-1000">
        <h1 className={`text-white text-3xl sm:text-5xl md:text-6xl lg:text-[5.5vw] font-sans font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase text-center leading-tight px-4 w-full ${isVisible ? 'animate-come-from-behind' : 'opacity-0'}`}>
          Towards A Better You
        </h1>
      </div>
    </footer>
    </>
  );
}
