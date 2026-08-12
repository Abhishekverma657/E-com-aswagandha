import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';

export default function BlogSection() {
  const { content } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  const blogs = content?.blogSection?.length > 0 ? content.blogSection.map((b, i) => ({...b, id: i})) : [];
  if (blogs.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const visibleBlogs = blogs.length > 2 ? [
    blogs[currentIndex],
    blogs[(currentIndex + 1) % blogs.length],
    blogs[(currentIndex + 2) % blogs.length]
  ] : blogs;

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-gray-400"></div>
              <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">Learn With Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight">
              <span className="font-sans font-light text-gray-500">Simple reads for</span><br/>
              <strong className="font-sans font-bold">better health decisions</strong>
            </h2>
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/blog" 
              className="inline-block bg-primary hover:bg-primary-light text-white font-sans font-bold text-[13px] px-8 py-3.5 rounded-md transition-colors"
            >
              VIEW ALL ARTICLES
            </Link>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleBlogs.map((blog, idx) => (
              <motion.div 
                key={blog.id} 
                layout
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`bg-secondary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex-col group cursor-pointer ${idx === 1 ? 'hidden md:flex' : idx === 2 ? 'hidden lg:flex' : 'flex'}`}
              >
                
                {/* Image Box */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                    <h3 className="text-white font-serif text-2xl font-bold leading-tight">
                      {blog.imageTitle}
                    </h3>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-[17px] leading-tight group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow font-light">
                    {blog.excerpt}
                  </p>
                  <Link 
                    to={blog.link || "#"}
                    className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase hover:text-accent transition-colors mt-auto"
                  >
                    READ ARTICLE <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-secondary border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 shadow-sm transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            {blogs.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-2.5 h-2.5 bg-primary scale-110' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button onClick={handleNext} className="w-10 h-10 rounded-full bg-secondary border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-50 shadow-sm transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
