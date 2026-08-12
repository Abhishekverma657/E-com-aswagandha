import { Star, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function FoundersNote() {
  const { content } = useContent();

  const foundersNote = content?.foundersNote;

  if (!foundersNote) return null;
  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Content - Image with Nameplate */}
        <div className="relative h-[500px] lg:h-[700px] rounded-lg overflow-hidden">
          <img 
            src={foundersNote.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop"} 
            alt={foundersNote.name} 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Floating Nameplate */}
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 bg-secondary px-8 py-5 shadow-2xl flex flex-col items-center">
            <h4 className="font-sans font-bold text-gray-900 tracking-widest text-[13px] uppercase">
              {foundersNote.name}
            </h4>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <p className="font-sans font-light text-gray-500 text-[11px] uppercase tracking-wide">
              {foundersNote.title}
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
              <strong className="font-sans font-bold">{foundersNote.quote}</strong>
            </h2>
            <div className="relative">
              {/* Optional: large quote mark watermark */}
              <span className="absolute -left-6 md:-left-8 text-5xl text-gray-200 top-[-10px] font-serif">“</span>
              <p className="text-gray-700 font-sans font-light leading-relaxed text-base md:text-lg relative z-10">
                {foundersNote.text}
              </p>
              <span className="text-5xl text-gray-200 font-serif absolute -bottom-6 right-0 leading-none">”</span>
            </div>
          </div>

          {/* Highlight Box */}
          <div className="flex items-start gap-4 mt-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <Leaf className="w-5 h-5 text-accent" />
            </div>
            <p className="text-gray-700 text-[15px] leading-relaxed font-sans font-light mt-1">
              Supporting you in becoming a better version of yourself, in ways that feel <strong className="font-bold text-gray-900">simple, consistent, and real.</strong>
            </p>
          </div>

          <div className="pt-4">
            <Link 
              to="/about" 
              className="inline-block bg-primary hover:bg-primary-light text-white font-sans font-bold text-[13px] px-8 py-3.5 rounded-md transition-colors"
            >
              READ OUR STORY
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
