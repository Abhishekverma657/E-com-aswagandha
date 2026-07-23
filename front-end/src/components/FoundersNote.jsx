import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FoundersNote() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Content - Image with Nameplate */}
        <div className="relative h-[500px] lg:h-[700px] rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop" 
            alt="Founder" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Floating Nameplate */}
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 bg-white px-8 py-5 shadow-2xl flex flex-col items-center">
            <h4 className="font-sans font-bold text-gray-900 tracking-widest text-[13px] uppercase">
              ABHISHEK NAGORI
            </h4>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <p className="font-sans font-light text-gray-500 text-[11px] uppercase tracking-wide">
              Founder & CEO, Nagouri
            </p>
          </div>
        </div>

        {/* Right Content - Text */}
        <div className="space-y-8 pl-0 lg:pl-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-gray-400"></div>
              <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">Founder's Note</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight mb-8">
              <span className="font-sans font-light text-gray-500">From</span> <strong className="font-sans font-bold">Frustration</strong> <span className="font-sans font-light text-gray-500">to</span><br/>
              <strong className="font-sans font-bold">Formulation</strong>
            </h2>
            <div className="relative">
              {/* Optional: large quote mark watermark */}
              <span className="absolute -left-6 md:-left-8 text-5xl text-gray-200 top-[-10px] font-serif">“</span>
              <p className="text-gray-700 font-sans font-light leading-relaxed text-base md:text-lg relative z-10">
                I started Nagouri Ayurveda after realising how hard it is to trust supplements. Labels looked convincing, but I was never sure what was actually inside or if it would actually help. So we built things differently - using clinically studied ingredients in the right forms & doses. Something you can take daily without doubt, and see real progress over time.
              </p>
              <span className="text-5xl text-gray-200 font-serif absolute -bottom-6 right-0 leading-none">”</span>
            </div>
          </div>

          {/* Highlight Box */}
          <div className="bg-gray-100 rounded-md p-6 flex items-start gap-5">
            <div className="w-12 h-12 bg-[#1e293b] rounded flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <p className="text-gray-700 text-[15px] leading-relaxed font-sans font-light mt-1">
              Supporting you in becoming a better version of yourself, in ways that feel <strong className="font-bold text-gray-900">simple, consistent, and real.</strong>
            </p>
          </div>

          <div className="pt-4">
            <Link 
              to="/about" 
              className="inline-block bg-[#0f172a] hover:bg-[#1e293b] text-white font-sans font-bold text-[13px] px-8 py-3.5 rounded-md transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
