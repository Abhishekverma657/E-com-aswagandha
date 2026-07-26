import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/ourstory/image1.jpg.jpeg';
import img2 from '../assets/ourstory/image2.jpg.jpeg';
import img3 from '../assets/ourstory/image3.jpg.jpeg';
import img4 from '../assets/ourstory/image4.jpg.jpeg';
import img5 from '../assets/ourstory/image5.jpg.jpeg';
import img6 from '../assets/ourstory/image6.jpg.jpeg';

export default function About() {
  return (
    <div className="bg-secondary min-h-screen pt-[184px] pb-16 overflow-hidden font-sans">
      
      {/* Introduction Title */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-12 md:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif text-primary font-bold mb-6"
        >
          Our Story
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-dark/80 text-xl font-light tracking-wide uppercase"
        >
          Rooted in tradition. Crafted for today.
        </motion.p>
      </div>

      {/* Story Blocks */}
      <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-24">
        
        {/* Block 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <div className="w-12 h-[1px] bg-accent"></div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              The Genesis of <br className="hidden md:block" /><span className="italic font-light">Nagouri</span>
            </h2>
            <p className="text-lg text-dark/80 leading-relaxed font-light">
              What started as a humble pursuit to harness the true power of Ayurveda has blossomed into a movement for transparent, uncompromising wellness. We realized that modern supplements lacked the soul and purity of ancient practices.
            </p>
          </motion.div>
          <div className="w-full md:w-1/2">
            <img src={img1} alt="Nagori Origin" className="w-full h-auto object-contain rounded-xl shadow-lg border border-primary/5" />
          </div>
        </div>

        {/* Block 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <div className="w-12 h-[1px] bg-accent"></div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              A Problem of <span className="italic font-light">Trust</span>
            </h2>
            <p className="text-lg text-dark/80 leading-relaxed font-light">
              It's hard to trust supplement brands today. You're often left wondering—Is this safe? Is it actually working? We built Nagori to answer these questions with absolute transparency. No hidden proprietary blends, just honest ingredients.
            </p>
          </motion.div>
          <div className="w-full md:w-1/2">
            <img src={img2} alt="Trust in Supplements" className="w-full h-auto object-contain rounded-xl shadow-lg border border-primary/5" />
          </div>
        </div>

        {/* Block 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <div className="w-12 h-[1px] bg-accent"></div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              Sourced from <span className="italic font-light">Nature</span>
            </h2>
            <p className="text-lg text-dark/80 leading-relaxed font-light">
              For generations, our ancestors relied on the earth's purity. We've made it our mission to bridge that ancient wisdom with modern lifestyles, ensuring every formulation is as potent as it is pure.
            </p>
          </motion.div>
          <div className="w-full md:w-1/2">
            <img src={img3} alt="Nature Sourced" className="w-full h-auto object-contain rounded-xl shadow-lg border border-primary/5" />
          </div>
        </div>

        {/* Block 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <div className="w-12 h-[1px] bg-accent"></div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              Uncompromising <span className="italic font-light">Purity</span>
            </h2>
            <p className="text-lg text-dark/80 leading-relaxed font-light">
              No shortcuts. No synthetic fillers. Just the raw, transformative power of nature, respectfully sourced and expertly blended. We oversee every step to guarantee the highest quality.
            </p>
          </motion.div>
          <div className="w-full md:w-1/2">
            <img src={img4} alt="Purity" className="w-full h-auto object-contain rounded-xl shadow-lg border border-primary/5" />
          </div>
        </div>

        {/* Block 5 - Full Width Grid for the last two */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-10 border-t border-primary/10">
          <div className="space-y-6">
            <img src={img5} alt="Process" className="w-full h-auto object-contain rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-primary/5" />
            <h3 className="text-2xl font-serif text-primary text-center italic font-light">Crafted with Care</h3>
          </div>
          <div className="space-y-6">
            <img src={img6} alt="Result" className="w-full h-auto object-contain rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-primary/5" />
            <h3 className="text-2xl font-serif text-primary text-center italic font-light">Real Results</h3>
          </div>
        </div>

      </div>

    </div>
  );
}
