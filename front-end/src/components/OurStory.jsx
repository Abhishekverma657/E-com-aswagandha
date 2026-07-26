import { motion } from 'framer-motion';
import img1 from '../assets/ourstory/image1.jpg.jpeg';
import img2 from '../assets/ourstory/image2.jpg.jpeg';
import img3 from '../assets/ourstory/image3.jpg.jpeg';
import img4 from '../assets/ourstory/image4.jpg.jpeg';
import img5 from '../assets/ourstory/image5.jpg.jpeg';
import img6 from '../assets/ourstory/image6.jpg.jpeg';

export default function OurStory() {
  return (
    <section className="py-24 px-6 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Images Grid (Left Side) */}
        <div className="w-full lg:w-1/2 relative">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="flex flex-col gap-4 md:gap-6 pt-12"
            >
              <img src={img1} alt="Story 1" className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-lg" />
              <img src={img2} alt="Story 2" className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg" />
              <img src={img5} alt="Story 5" className="w-full h-40 md:h-48 object-cover rounded-2xl shadow-lg" />
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="flex flex-col gap-4 md:gap-6"
            >
              <img src={img3} alt="Story 3" className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg" />
              <img src={img4} alt="Story 4" className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-lg" />
              <img src={img6} alt="Story 6" className="w-full h-40 md:h-48 object-cover rounded-2xl shadow-lg" />
            </motion.div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        </div>

        {/* Text Content (Right Side) */}
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold font-sans">Our Story</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mt-4 mb-6 leading-tight">
              Rooted in tradition.<br />
              <span className="italic text-primary-light">Crafted for today.</span>
            </h2>
            <div className="w-20 h-[1px] bg-accent mb-8"></div>
            
            <div className="space-y-6 text-dark/80 font-sans text-lg leading-relaxed font-light">
              <p>
                What started as a humble pursuit to harness the true power of Ayurveda has blossomed into a movement for transparent, uncompromising wellness. At Nagori, we believe that nature holds the answers, but science validates them.
              </p>
              <p>
                For generations, our ancestors relied on the earth's purity. We've made it our mission to bridge that ancient wisdom with modern lifestyles, ensuring every formulation is as potent as it is pure.
              </p>
              <p className="font-medium text-primary">
                No shortcuts. No synthetic fillers. Just the raw, transformative power of nature, respectfully sourced and expertly blended.
              </p>
            </div>
            
            <button className="mt-10 px-8 py-4 bg-primary text-secondary font-sans uppercase tracking-widest text-sm font-bold hover:bg-primary-dark transition-colors duration-300 shadow-md">
              Discover Our Process
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
