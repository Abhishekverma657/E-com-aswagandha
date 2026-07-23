import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function TrackOrder() {
  return (
    <div className="min-h-screen bg-secondary pt-32 pb-24 px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="bg-primary py-8 px-8 text-center text-white">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Track Your Order</h1>
          <p className="text-white/70 font-sans text-sm font-light">Enter your order details below to see the current status of your shipment.</p>
        </div>
        
        <div className="p-8">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="orderId" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Order ID or AWB Number *</label>
              <input 
                type="text" 
                id="orderId" 
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="e.g. NAG123456789"
                required
              />
            </div>
            
            <div>
              <label htmlFor="contact" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email or Phone Number *</label>
              <input 
                type="text" 
                id="contact" 
                className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Enter email or phone used during checkout"
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Track Now
              </button>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-sans">
              Having trouble finding your order details? <br/>
              Check your confirmation email or <a href="/contact" className="text-accent font-bold hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
