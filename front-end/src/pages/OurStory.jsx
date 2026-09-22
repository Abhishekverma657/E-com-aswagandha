import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import img1 from '../assets/ourstory/image1.jpg.jpeg';
import img2 from '../assets/ourstory/image2.jpg.jpeg';
import img3 from '../assets/ourstory/image3.jpg.jpeg';
import img4 from '../assets/ourstory/image4.jpg.jpeg';
import img5 from '../assets/ourstory/image5.jpg.jpeg';
import img6 from '../assets/ourstory/image6.jpg.jpeg';

export default function OurStory() {
  const { content } = useContent();

  const ourStory = content?.ourStory;
  const heroTitle = ourStory?.heroTitle || 'Our Story';
  const heroSubtitle = ourStory?.heroSubtitle || 'Rooted in tradition. Crafted for today.';
  
  const defaultBlocks = [
    {
      title: 'The Genesis of Nagori',
      content: 'What started as a humble pursuit to harness the true power of Ayurveda has blossomed into a movement for transparent, uncompromising wellness. We realized that modern supplements lacked the soul and purity of ancient practices.',
      image: img1
    },
    {
      title: 'A Problem of Trust',
      content: "It's hard to trust supplement brands today. You're often left wondering—Is this safe? Is it actually working? We built Nagori to answer these questions with absolute transparency. No hidden proprietary blends, just honest ingredients.",
      image: img2
    },
    {
      title: 'Sourced from Nature',
      content: "For generations, our ancestors relied on the earth's purity. We've made it our mission to bridge that ancient wisdom with modern lifestyles, ensuring every formulation is as potent as it is pure.",
      image: img3
    },
    {
      title: 'Uncompromising Purity',
      content: 'No shortcuts. No synthetic fillers. Just the raw, transformative power of nature, respectfully sourced and expertly blended. We oversee every step to guarantee the highest quality.',
      image: img4
    }
  ];

  const chapters = ourStory?.chapters?.length > 0 ? ourStory.chapters : defaultBlocks;

  return (
    <div className="bg-secondary min-h-screen pt-[215px] md:pt-[230px] pb-20 overflow-hidden font-sans">
      
      {/* Introduction Title */}
      <div className="max-w-4xl mx-auto text-center px-6 pt-2 md:pt-4 mb-12 md:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif text-primary font-bold mb-6"
        >
          {heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-dark/80 text-xl font-light tracking-wide uppercase"
        >
          {heroSubtitle}
        </motion.p>
      </div>

      {/* Story Blocks */}
      <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-24">
        {chapters.map((block, idx) => {
          const isReversed = idx % 2 !== 0;
          return (
            <div 
              key={idx}
              className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}
            >
              <motion.div 
                initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="w-full md:w-1/2 space-y-6"
              >
                <div className="w-12 h-[1px] bg-accent"></div>
                <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
                  {block.title?.replace(/nagouri/gi, 'Nagori')}
                </h2>
                {block.subtitle && (
                  <p className="text-sm font-sans font-bold text-accent uppercase tracking-widest">
                    {block.subtitle}
                  </p>
                )}
                <p className="text-lg text-dark/80 leading-relaxed font-light">
                  {block.content?.replace(/nagouri/gi, 'Nagori')}
                </p>
              </motion.div>
              <div className="w-full md:w-1/2">
                <img 
                  src={block.image || defaultBlocks[idx % defaultBlocks.length].image} 
                  alt={block.title} 
                  className="w-full h-auto object-contain rounded-xl shadow-lg border border-primary/5" 
                />
              </div>
            </div>
          );
        })}

        {/* Closing Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-10 border-t border-primary/10">
          <div className="space-y-6">
            <img 
              src={ourStory?.bottomCard1?.image || img5} 
              alt={ourStory?.bottomCard1?.title || "Crafted with Care"} 
              className="w-full h-auto object-contain rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-primary/5" 
            />
            <h3 className="text-2xl font-serif text-primary text-center italic font-light">
              {ourStory?.bottomCard1?.title || 'Crafted with Care'}
            </h3>
          </div>
          <div className="space-y-6">
            <img 
              src={ourStory?.bottomCard2?.image || img6} 
              alt={ourStory?.bottomCard2?.title || "Real Results"} 
              className="w-full h-auto object-contain rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-primary/5" 
            />
            <h3 className="text-2xl font-serif text-primary text-center italic font-light">
              {ourStory?.bottomCard2?.title || 'Real Results'}
            </h3>
          </div>
        </div>

      </div>

    </div>
  );
}
