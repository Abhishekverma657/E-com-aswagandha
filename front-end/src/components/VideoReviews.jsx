import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function VideoReviews() {
  const { content } = useContent();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const videoReviews = content?.videoReviews || [];

  if (videoReviews.length === 0) return null;

  const handleVideoClick = (review) => {
    setSelectedVideo(review);
    setIsMuted(true); // Default muted
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <section className="py-12 md:py-16 px-6 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Minimal Header */}
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
              Real Experiences
            </h2>
            <p className="text-gray-500 mt-1 font-light">See the difference in their own words.</p>
          </div>
        </div>

        {/* Video Grid/Carousel */}
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
          {videoReviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative shrink-0 w-64 md:w-72 aspect-[9/16] rounded-xl overflow-hidden cursor-pointer group snap-center shadow-lg"
              onClick={() => handleVideoClick(review)}
            >
              {/* Thumbnail / Background Video (Paused) */}
              <video 
                src={review.videoUrl} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                muted 
                loop 
                playsInline
                preload="metadata"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Meta Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-12">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-black/40 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider">
                    {review.views || '0 VIEWS'}
                  </span>
                </div>
                <h4 className="font-bold text-lg leading-tight">{review.creatorName}</h4>
                {review.caption && (
                  <p className="text-xs mt-1.5 text-white/80 line-clamp-2 font-medium">
                    {review.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative h-[85vh] md:h-[90vh] w-auto aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={selectedVideo.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
                muted={isMuted}
              />

              {/* Close Button Inside Modal */}
              <button 
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-colors z-20 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideo(null);
                }}
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Controls Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between z-10 pt-20">
                <div className="text-white max-w-[70%]">
                  <h3 className="font-bold text-xl mb-1">{selectedVideo.creatorName}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">{selectedVideo.caption}</p>
                </div>
                
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-colors shrink-0 shadow-lg"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
