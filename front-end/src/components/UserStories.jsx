import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function UserStories() {
  const { content } = useContent();

  const stories = content?.userStories?.length > 0 ? content.userStories : [];

  if (stories.length === 0) return null;

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 px-4 md:px-0">
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
        </div>

        {/* Grid / Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full relative">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/5" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/10">
                  {story.image ? (
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/30">?</div>
                  )}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-gray-900">{story.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{story.location}</p>
                </div>
              </div>
              <p className="text-gray-700 font-serif text-lg leading-relaxed italic flex-grow">
                "{story.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
