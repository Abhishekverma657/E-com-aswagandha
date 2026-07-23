import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function Authenticate() {
  return (
    <div className="min-h-screen bg-secondary pt-32 pb-24 px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="bg-primary py-8 px-8 text-center text-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <ShieldCheck className="absolute -right-8 -bottom-8 w-40 h-40 text-white opacity-5" />
          
          <div className="relative z-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Authenticate Product</h1>
            <p className="text-white/70 font-sans text-sm font-light">Verify the authenticity of your Nagouri product using the scratch code on the packaging.</p>
          </div>
        </div>
        
        <div className="p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-600 mb-6 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                Every genuine Nagouri product comes with a scratchable authentication sticker. 
                Scratch the silver foil to reveal your unique 12-digit code.
              </p>
            </div>

            <div>
              <label htmlFor="authCode" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Enter Authentication Code *</label>
              <input 
                type="text" 
                id="authCode" 
                className="w-full border border-gray-300 rounded px-4 py-3 text-center text-xl tracking-[0.2em] font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="XXXX-XXXX-XXXX"
                maxLength={14}
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                Verify Product
              </button>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-sans">
              Code not working or sticker missing? <br/>
              Please <a href="/contact" className="text-accent font-bold hover:underline">Contact Support</a> immediately.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
