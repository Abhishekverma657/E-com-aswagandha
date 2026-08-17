import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function TheDifference() {
  const { content } = useContent();

  const theDifference = content?.theDifference;

  if (!theDifference) return null;

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-secondary relative">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
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
              <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">The Difference</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight mb-4">
              <strong className="font-sans font-bold">{theDifference.title}</strong>
            </h2>
            <p className="text-gray-600 font-sans font-light leading-relaxed max-w-md text-[15px]">
              {theDifference.subtitle}
            </p>
          </motion.div>

          <div className="space-y-4 pt-2">
            {(theDifference.items || []).map((item, idx) => {
              const IconComp = LucideIcons[item.iconName] || LucideIcons.CheckCircle2;
              return (
                <motion.div key={idx} variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="bg-primary rounded-md p-6 flex items-start gap-5 shadow-lg">
                  <div className="bg-secondary/10 p-3 rounded-full flex-shrink-0">
                    <IconComp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg font-sans">{item.title}</h4>
                    <p className="text-white/70 text-sm mt-1.5 font-sans font-light">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
            alt="Difference" 
            className="absolute inset-0 w-full h-full object-cover object-left-top"
          />
        </motion.div>

      </div>
    </section>
  );
}
