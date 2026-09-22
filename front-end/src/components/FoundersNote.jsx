import { useState } from 'react';
import { Leaf, UserCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const directorsData = [
  {
    id: 'parul',
    name: 'Parul Choudhary',
    title: 'Director, Nagori',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    quote: 'Purity, Science & Authentic Ayurvedic Heritage',
    text: 'At Nagori Ayurveda, our vision is to provide uncompromised purity and clinically validated potency. Sourced directly from the arid, nutrient-rich soils of Nagaur, Rajasthan, every batch is crafted to honor traditional Ayurvedic wisdom while meeting the strictest modern quality benchmarks. We believe authentic wellness should be transparent, accessible, and life-changing.'
  },
  {
    id: 'manak',
    name: 'Manak Choudhary',
    title: 'Director, Nagori',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop',
    quote: 'From Frustration to True Formulation',
    text: 'Growing up in Rajasthan, we saw firsthand the remarkable potency of indigenous Nagori Ashwagandha. But looking at the modern market, we realized most commercial supplements were heavily processed, diluted, or sourced from compromised soils. We established Nagori with a singular mission: to deliver single-origin, high-withanolide Ayurvedic formulations you can take with total confidence every single day.'
  }
];

export default function FoundersNote() {
  const { content } = useContent();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Dynamically sync directors from content.aboutUs.directors so Home Page & About Us always share the exact same directors
  const dynamicDirectors = (content?.aboutUs?.directors && content.aboutUs.directors.length > 0)
    ? content.aboutUs.directors.map((d, i) => ({
        id: `dir-${i}`,
        name: d.name || directorsData[i]?.name || 'Director',
        title: d.title || directorsData[i]?.title || 'Director, Nagori',
        image: d.image || directorsData[i]?.image,
        quote: d.quote || directorsData[i]?.quote || 'Purity, Science & Authentic Ayurvedic Heritage',
        text: d.bio || directorsData[i]?.text
      }))
    : directorsData;

  const activeDirector = dynamicDirectors[selectedIndex] || dynamicDirectors[0];

  return (
    <section id="directors-note" className="py-24 px-4 sm:px-6 bg-secondary relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Content - Image with Nameplate */}
        <div className="relative h-[520px] lg:h-[680px] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-[#e8e4d8]">
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeDirector.id}
              src={activeDirector.image} 
              alt={activeDirector.name} 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

          {/* Floating Nameplate */}
          <motion.div 
            key={`plate-${activeDirector.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto md:min-w-[280px] bg-secondary/95 backdrop-blur-md px-6 py-4 shadow-2xl rounded-lg border border-white/40"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-[10px] font-sans font-bold text-accent uppercase tracking-widest">
                Director Profile
              </span>
            </div>
            <h4 className="font-sans font-bold text-gray-900 tracking-wider text-[15px] uppercase">
              {activeDirector.name}
            </h4>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <p className="font-sans font-semibold text-primary text-[11px] uppercase tracking-wider">
              {activeDirector.title}
            </p>
          </motion.div>
        </div>

        {/* Right Content - Text & Director Selector */}
        <div className="space-y-8 pl-0 lg:pl-4">
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-accent"></div>
              <span className="text-[11px] font-sans font-bold text-gray-700 tracking-[0.2em] uppercase">
                Director's Note
              </span>
            </div>

            {/* Dynamic Director Selector Pills */}
            <div className="flex flex-wrap gap-2.5 mb-6 p-1.5 bg-[#ebe6d8] rounded-xl border border-[#ded8c6] w-fit">
              {dynamicDirectors.map((director, idx) => (
                <button
                  key={director.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-sans font-bold tracking-wider transition-all duration-300 ${
                    selectedIndex === idx 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-gray-700 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <UserCheck className={`w-3.5 h-3.5 ${selectedIndex === idx ? 'text-accent' : 'text-gray-500'}`} />
                  <span>{director.name}</span>
                  <span className="text-[10px] opacity-75 font-normal">(Director)</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDirector.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-[1.2] tracking-tight mb-6 font-serif">
                  <strong className="font-bold">"{activeDirector.quote}"</strong>
                </h2>

                <div className="relative">
                  <p className="text-gray-700 font-sans font-light leading-relaxed text-base md:text-lg relative z-10">
                    {activeDirector.text}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Highlight Box */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 border border-[#e6e1d1]">
            <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <Leaf className="w-5 h-5 text-accent" />
            </div>
            <p className="text-gray-700 text-[14px] leading-relaxed font-sans font-light">
              Led by Director <strong className="text-gray-900 font-semibold">{activeDirector.name}</strong>, our leadership is dedicated to uncompromising quality, authentic Rajasthani heritage, and holistic wellness.
            </p>
          </div>

          <div className="pt-2">
            <Link 
              to="/about" 
              className="inline-block bg-primary hover:bg-primary-light text-white font-sans font-bold text-[13px] px-8 py-3.5 rounded-md transition-colors shadow-md hover:shadow-lg"
            >
              READ OUR STORY
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
