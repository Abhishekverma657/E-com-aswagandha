import { Play, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserStories() {
  const stories = [
    {
      id: 1,
      name: "Gautam Hasija",
      handle: "@gautamhasijafitnesss · 122K views",
      quote: "",
      videoImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
      product: {
        title: "Testoboost - Lift Harder, Last Longer",
        price: 1399,
        originalPrice: 1898,
        image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=200&auto=format&fit=crop"
      }
    },
    {
      id: 2,
      name: "Akash Gupta",
      handle: "@akashgupta1517 · 321K views",
      quote: "Supports faster muscle recovery & strength",
      videoImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      product: {
        title: "Magnesium Glycinate - From USA",
        price: 1799,
        originalPrice: 2598,
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=200&auto=format&fit=crop"
      }
    },
    {
      id: 3,
      name: "Aadi Nagar",
      handle: "@aadi.nagar · 249K views",
      quote: "",
      videoImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
      product: {
        title: "Multivitamin Tablets for Men",
        price: 1099,
        originalPrice: 1398,
        image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=200&auto=format&fit=crop"
      }
    },
    {
      id: 4,
      name: "Ravi Pawar",
      handle: "@ravipawar_official · 170K views",
      quote: "",
      videoImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
      product: {
        title: "Testoboost - Lift Harder, Last Longer",
        price: 1399,
        originalPrice: 1898,
        image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=200&auto=format&fit=crop"
      }
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 px-4 md:px-0">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1px] w-6 bg-gray-400"></div>
              <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">User Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight">
              <strong className="font-sans font-bold">Don't just take our word,</strong><br/>
              <span className="font-sans font-light text-gray-400">hear it from others</span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Link 
              to="/stories" 
              className="inline-block bg-[#0f172a] hover:bg-[#1e293b] text-white font-sans font-bold text-[13px] px-8 py-3.5 rounded-md transition-colors"
            >
              See More Stories
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Left Navigation Arrow */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-600 hover:text-black hidden md:flex">
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Grid / Stories */}
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {stories.map(story => (
              <div key={story.id} className="min-w-[300px] sm:min-w-[320px] md:min-w-[340px] flex-shrink-0 snap-start relative rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-[550px] group cursor-pointer">
                
                {/* Background Image / Video Thumbnail */}
                <div className="absolute inset-0 z-0">
                  <img src={story.videoImage} alt={story.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                </div>

                {/* Top Info */}
                <div className="relative z-10 p-5">
                  <h4 className="text-white font-bold text-lg leading-tight shadow-sm">{story.name}</h4>
                  <p className="text-white/80 text-[11px] mt-0.5">{story.handle}</p>
                </div>

                {/* Center Quote & Play Button */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
                  {story.quote && (
                    <div className="bg-white text-black font-bold text-sm px-4 py-2 rounded-sm shadow-md mb-6 transform -rotate-2">
                      {story.quote}
                    </div>
                  )}
                  <div className="w-16 h-16 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Bottom Product Info Block */}
                <div className="relative z-20 bg-white m-2 rounded-lg p-3 shadow-md flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                      <img src={story.product.image} alt="product" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-[11px] leading-snug text-gray-900 truncate">{story.product.title}</h5>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="border border-gray-300 rounded text-[10px] px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:bg-gray-50">
                          Pack of 2 <ChevronDown className="w-3 h-3" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-900 text-[13px]">₹{story.product.price}</span>
                          <span className="text-gray-400 text-[10px] line-through">₹{story.product.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-[#1e293b] text-white text-[10px] font-bold uppercase py-2.5 rounded hover:bg-black transition-colors">
                      Add to Cart
                    </button>
                    <button className="bg-[#1e293b] text-white text-[10px] font-bold uppercase py-2.5 rounded hover:bg-black transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-600 hover:text-black hidden md:flex">
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
