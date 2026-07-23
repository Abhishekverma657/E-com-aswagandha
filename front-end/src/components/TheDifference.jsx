import { CheckCircle2, HeartHandshake, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TheDifference() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#f8fafc] relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Content */}
        <motion.div 
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-gray-400"></div>
              <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">The Rasayanam Difference</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight mb-4">
              <span className="font-sans font-light text-gray-500">What Makes</span> <strong className="font-sans font-bold">People</strong><br/>
              <strong className="font-sans font-bold">Choose Us</strong>
            </h2>
            <p className="text-gray-600 font-sans font-light leading-relaxed max-w-md text-[15px]">
              <strong className="font-bold text-gray-900">10 lakh+ customers</strong> have made Nagouri Ayurveda part of their lifestyle - not because of big claims, but because it simply works for them, day after day.
            </p>
          </motion.div>

          <div className="space-y-4 pt-2">
            
            {/* Box 1 */}
            <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="bg-[#1e293b] rounded-md p-6 flex items-start gap-5 shadow-lg">
              <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg font-sans">Built To Help You Feel A Real Difference</h4>
                <p className="text-white/70 text-sm mt-1.5 font-sans font-light">
                  We focus on what actually works - not trendy ingredients or hype.
                </p>
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="bg-[#1e293b] rounded-md p-6 flex items-start gap-5 shadow-lg">
              <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg font-sans">Something You Can Actually Stick With</h4>
                <p className="text-white/70 text-sm mt-1.5 font-sans font-light">
                  Designed for daily use - safe, well-tolerated, and easy to continue.
                </p>
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="bg-[#1e293b] rounded-md p-6 flex items-start gap-5 shadow-lg">
              <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg font-sans">Nothing To Hide. Everything To Show</h4>
                <p className="text-white/70 text-sm mt-1.5 font-sans font-light">
                  Proof over claims - we back everything with detailed lab reports.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Right Content - Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-full min-h-[500px] lg:min-h-[700px] rounded-lg overflow-hidden shadow-xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=2000&auto=format&fit=crop" 
            alt="Man writing at desk" 
            className="absolute inset-0 w-full h-full object-cover object-left-top"
          />
          {/* Product overlay simulation like in screenshot */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-40 h-48 md:w-48 md:h-56 bg-white p-2 rounded shadow-2xl overflow-hidden flex flex-col justify-end pb-4 border border-gray-100">
             <img src="https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?q=80&w=400&auto=format&fit=crop" alt="Nagouri Ashwagandha" className="w-full h-full object-cover rounded" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
