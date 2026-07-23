import React from 'react';
import { Volume2 } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white min-h-screen pt-28 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" 
            alt="Towards a better you" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl lg:text-[5vw] font-sans font-bold tracking-tight">
            Towards a better <span className="font-bold">you</span>, <span className="font-light">everyday</span>
          </h1>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-gray-900">The Problem</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-gray-900 leading-[1.1] mb-10">
              It's <span className="font-bold">hard to trust</span> supplement <span className="font-bold">brands</span> today.
            </h2>
            
            <div className="space-y-6 text-gray-800 font-sans font-light text-[17px] leading-relaxed">
              <p>
                Most of the time, you're not sure what's inside, how much of it is there, or if it's effective at all. And you're left wondering - <span className="font-bold">Is this safe? Will there be side effects? Is it actually working?</span>
              </p>
              <p>
                So you take it for a few days or weeks. Then you stop. And the next time, you have trust issues, so you don't start again.
              </p>
              <p>
                Because the truth is <span className="font-bold bg-blue-50 px-1">a lot of supplements don't work the way you expect them to.</span>
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] md:aspect-square w-full rounded overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2000&auto=format&fit=crop" 
                alt="Colorful Pills" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* The Promise Section */}
      <div className="bg-[#fbfbf9] w-full py-24 md:py-32 relative">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-gray-400"></div>
                <span className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-gray-900">The Nagouri Promise</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans text-[#3a4b5c] leading-[1.1] tracking-tight">
                <span className="font-bold text-gray-900 block mb-2">Clean</span> formulations<br/>
                <span className="font-bold text-gray-900 block mt-4 mb-2">Transparent</span> labels<br/>
                <span className="font-bold text-gray-900 block mt-4">Real</span> results
              </h2>
            </div>

            <div className="md:pt-16 space-y-8">
              <h3 className="text-2xl font-sans font-medium text-gray-900">
                We make things <span className="font-bold">simpler, clearer, and easier to trust.</span>
              </h3>
              
              <div className="space-y-6 text-gray-800 font-sans font-light text-[17px] leading-relaxed">
                <p>
                  Clean, safe formulations with no unnecessary additives. Labels that tell you <span className="font-bold">exactly what's inside and how much</span> - so it actually works the way you expect.
                </p>
                <p>
                  So instead of stopping midway, you have something you can stick to and <span className="font-bold">actually see results</span> over time. Because when you understand your supplement, and it does what it's supposed to, it just <span className="font-bold">feels right.</span>
                </p>
              </div>
            </div>

          </div>

          {/* 10 Lakh Banner */}
          <div className="mt-20 md:mt-32 max-w-4xl mx-auto bg-white shadow-xl rounded py-6 px-8 flex items-center border-l-4 border-gray-900">
            <p className="font-sans text-gray-900 text-lg md:text-xl">
              <span className="font-bold text-2xl md:text-3xl mr-3">10 Lakh+</span> 
              <span className="font-light">people have already experienced what clearer, more effective supplements feel like</span>
            </p>
          </div>
        </div>
      </div>

      {/* The Name Section */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-24 md:py-32 text-center">
        
        <span className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-gray-900 block mb-8">The Name</span>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light text-gray-600 mb-6 tracking-tight">
          So... what does <span className="font-bold text-gray-900">Nagouri</span> really <span className="font-bold text-gray-900">mean?</span>
        </h2>
        
        <p className="font-sans text-gray-800 text-lg mb-12 font-light">
          You might've called us "Nagori", "Nagouri"... we've heard them all. 😅
        </p>

        <button className="inline-flex items-center gap-4 bg-[#f0f3f5] rounded-full py-3 px-8 mx-auto hover:bg-[#e2e8ec] transition-colors cursor-pointer mb-12 group">
          <span className="font-sans font-medium text-gray-900 text-xl tracking-wider">It's Na · gou · ri</span>
          <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <Volume2 className="w-5 h-5" />
          </div>
        </button>

        <p className="font-sans text-gray-800 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
          In simple terms it means, <span className="font-bold">helping your body restore, rebuild, and function better</span> from within. <br/>
          <span className="text-gray-500">( something we truly believe in )</span>
        </p>

      </div>

    </div>
  );
}
