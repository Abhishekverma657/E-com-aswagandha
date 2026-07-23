import { Star, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Aman V.",
      location: "Chandigarh, 33 years",
      text: "\"Best testosterone booster in India. Most pure and safest supplement, everyone should buy one for strength\"",
      tag: "TESTOBOOST"
    },
    {
      id: 2,
      name: "Amisha C.",
      location: "Pune, 28 years",
      text: "\"Switched to their Omega-3 because it's one of the few veg options with good EPA and DHA. No fishy burps, and easy to take daily.\"",
      tag: "OMEGA 3"
    },
    {
      id: 3,
      name: "Purav S.",
      location: "Indore, 37 years",
      text: "\"My friend suggested to take their multivitamin for vitamin deficiency. I am seeing better energy in office and feeling healthy.\"",
      tag: "MULTIVITAMIN FOR MEN"
    },
    {
      id: 4,
      name: "Rahul M.",
      location: "Mumbai, 29 years",
      text: "\"Great quality ashwagandha. Helps me calm down after a long day of coding. Very satisfied.\"",
      tag: "ASHWAGANDHA KSM-66"
    },
    {
      id: 5,
      name: "Sneha T.",
      location: "Delhi, 31 years",
      text: "\"The liver detox really helped me feel lighter and more energetic. Trust this brand for all my supplements.\"",
      tag: "LIVER DETOX"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length]
  ];
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#f8fafc] relative">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-gray-400"></div>
              <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">Customer Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight">
              <span className="font-sans font-light text-gray-500">How we</span> <strong className="font-sans font-bold">made a</strong><br/>
              <strong className="font-sans font-bold">difference</strong> <span className="font-sans font-light text-gray-500">in their lives</span>
            </h2>
          </div>
          
          <div className="mt-8 md:mt-0 text-right flex flex-col items-end">
            <div className="text-5xl md:text-7xl font-sans font-bold text-[#0f172a] leading-none mb-2">4.7</div>
            <div className="flex text-[#65a30d] mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 md:w-5 md:h-5 ${i < 5 ? 'fill-current' : ''} stroke-current`} />)}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              {/* Google SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] md:text-[11px] font-bold text-gray-900 leading-none">Verified Google Ratings</span>
                <span className="text-[9px] text-gray-500 leading-none mt-0.5">Based on 492 reviews</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Large Hero Review Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#1e293b] rounded-md overflow-hidden relative text-white flex flex-col lg:flex-row shadow-lg"
        >
          
          <div className="p-8 md:p-12 lg:w-2/3 flex flex-col justify-between relative z-10">
            <div className="text-white flex mb-6">
               {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 fill-current stroke-current mr-1`} />)}
            </div>
            <p className="font-sans font-light text-xl md:text-3xl leading-snug mb-10 opacity-90 relative">
              <span className="absolute -left-6 md:-left-8 text-4xl text-white/30 top-[-10px]">“</span>
              "I am using their ashwagandha for 3 weeks, it is so effective. I am having less stress in the office and able to sleep quickly now. I feel the brand is very genuine and easy to trust. Huge thumbs up"
              <span className="text-white/30 ml-1">”</span>
            </p>
            <div>
              <h4 className="font-bold text-base">Ankit P.</h4>
              <p className="text-white/60 text-xs mt-1">Delhi . 34 years . Ashwagandha KSM-66</p>
            </div>
          </div>

          {/* Intersecting Circles Graphic (Right Side) */}
          <div className="lg:w-1/3 min-h-[300px] relative overflow-hidden bg-[#1e293b] hidden md:flex items-center justify-center">
             <div className="absolute opacity-20 -right-12 -top-12">
                {/* Subtle quote watermark */}
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
             </div>
             
             <div className="relative w-[280px] h-[280px]">
                {/* Top Circle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[140px] rounded-full border border-white/20 flex flex-col items-center justify-center text-center z-20 bg-[#1e293b]/50 backdrop-blur-sm">
                  <span className="font-bold text-sm tracking-wide">WEEK 3</span>
                  <span className="text-[10px] text-white/70 leading-tight mt-1 px-4">When he first <strong className="text-white">felt results</strong></span>
                </div>
                {/* Bottom Left Circle */}
                <div className="absolute bottom-4 left-0 w-[140px] h-[140px] rounded-full border border-white/20 flex flex-col items-center justify-center text-center z-10 bg-[#1e293b]/50 backdrop-blur-sm">
                  <span className="font-bold text-sm tracking-wide">6 MONTHS</span>
                  <span className="text-[10px] text-white/70 leading-tight mt-1 px-4">Still a <strong className="text-white">customer</strong></span>
                </div>
                {/* Bottom Right Circle */}
                <div className="absolute bottom-4 right-0 w-[140px] h-[140px] rounded-full border border-white/20 flex flex-col items-center justify-center text-center z-10 bg-[#1e293b]/50 backdrop-blur-sm">
                  <span className="font-bold text-sm tracking-wide">3 FRIENDS</span>
                  <span className="text-[10px] text-white/70 leading-tight mt-1 px-4">He's <strong className="text-white">referred since</strong></span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Smaller Cards Carousel */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {visibleReviews.map((review, idx) => (
              <motion.div 
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`bg-white p-6 rounded-md shadow-sm border border-gray-100 flex-col justify-between ${idx === 1 ? 'hidden md:flex' : idx === 2 ? 'hidden lg:flex' : 'flex'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                        <Check className="w-3 h-3 text-gray-400" /> {review.location}
                      </p>
                    </div>
                    <div className="flex text-[#65a30d]">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current stroke-current" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans mb-5">
                    {review.text}
                  </p>
                </div>
                <div>
                  <span className="inline-block bg-[#0f172a] text-white text-[9px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase">
                    {review.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button onClick={handlePrev} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-all">
            <ChevronDown className="w-4 h-4 rotate-90" />
          </button>
          <div className="flex items-center gap-2 mx-2">
            {reviews.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-2.5 h-2.5 bg-gray-800 scale-110' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button onClick={handleNext} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-all">
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </button>
        </div>

      </div>
    </section>
  );
}
