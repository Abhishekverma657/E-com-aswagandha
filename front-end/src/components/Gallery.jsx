import { motion } from 'framer-motion';
import photo1 from '../assets/Gallary/photo1.jpg.jpeg';
import photo2 from '../assets/Gallary/photo2.jpg.jpeg';
import photo3 from '../assets/Gallary/photo3.jpg.jpeg';
import photo4 from '../assets/Gallary/photo4.jpg.jpeg';

export default function Gallery() {
  const images = [photo1, photo2, photo3, photo4];

  return (
    <section className="py-12 md:py-16 px-6 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-primary mb-4 font-bold tracking-tight"
          >
            A Glimpse of Wellness
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            <div className="h-[1px] w-12 bg-accent"></div>
            <span className="text-accent uppercase tracking-widest text-xs font-bold font-sans">The Nagori Experience</span>
            <div className="h-[1px] w-12 bg-accent"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              className="relative group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 aspect-[3/4] cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
