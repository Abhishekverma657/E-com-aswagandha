import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Bookmark, CheckCircle2, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content } = useContent();

  const blogs = content?.blogSection || [];

  // Find blog by id (either mongo _id or numeric index)
  const currentBlog = useMemo(() => {
    if (!blogs || blogs.length === 0) return null;
    
    // Check if id matches _id or index
    const found = blogs.find((b, idx) => (b._id && String(b._id) === String(id)) || String(idx) === String(id) || String(idx + 1) === String(id));
    if (found) return found;

    // Fallback to first blog if not found
    return blogs[0];
  }, [blogs, id]);

  const relatedBlogs = useMemo(() => {
    if (!blogs || blogs.length <= 1) return [];
    return blogs.filter((b) => b !== currentBlog).slice(0, 3);
  }, [blogs, currentBlog]);

  if (!currentBlog) {
    return (
      <div className="bg-secondary min-h-screen pt-[200px] pb-24 px-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">Article Not Found</h2>
        <p className="text-dark/70 text-sm mb-6">The blog post you're looking for does not exist or has been relocated.</p>
        <Link 
          to="/blogs" 
          className="inline-block bg-primary text-secondary px-6 py-3 rounded uppercase tracking-widest text-xs font-bold hover:bg-primary-light transition-colors"
        >
          Back to All Articles
        </Link>
      </div>
    );
  }

  // Split content into clean paragraphs
  const rawContent = currentBlog.content || currentBlog.excerpt || "Article content is being updated by the editorial team.";
  const paragraphs = rawContent.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentBlog.title,
        text: currentBlog.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="bg-secondary min-h-screen pt-[180px] pb-24 text-left font-sans text-primary">
      
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-primary/10">
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </button>
          
          <div className="flex items-center text-xs text-dark/50 gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-dark/30" />
            <Link to="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
            <ChevronRight className="w-3 h-3 text-dark/30" />
            <span className="text-primary font-medium truncate max-w-[180px] sm:max-w-[240px]">
              {currentBlog.title}
            </span>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-primary text-secondary text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xs">
            {currentBlog.category || 'Ayurvedic Wellness'}
          </span>
          <div className="flex items-center gap-4 text-xs font-semibold text-dark/60 tracking-wider uppercase">
            {currentBlog.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent" /> {currentBlog.date}
              </span>
            )}
            {currentBlog.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" /> {currentBlog.readTime}
              </span>
            )}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.15] mb-6 tracking-tight">
          {currentBlog.title}
        </h1>

        {currentBlog.excerpt && (
          <p className="text-lg md:text-xl font-sans font-light text-dark/80 leading-relaxed italic border-l-2 border-accent pl-4 my-6">
            "{currentBlog.excerpt}"
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-serif font-bold">
              NA
            </div>
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Nagori Editorial Team</p>
              <p className="text-[11px] text-dark/50">Verified Ayurvedic & Botanical Insights</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </header>

      {/* 3. FEATURED IMAGE */}
      {currentBlog.image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden shadow-xl border border-primary/10 bg-[#e8e4d8] relative">
            <img 
              src={currentBlog.image} 
              alt={currentBlog.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      )}

      {/* 4. MAIN ARTICLE BODY CONTENT */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 mb-16">
        <div className="space-y-6 text-base sm:text-lg text-dark/85 font-light leading-relaxed">
          {paragraphs.map((paragraph, index) => {
            // Check if paragraph starts with a list item e.g. "1." or "-"
            if (/^\d+\.|\-|\*/.test(paragraph)) {
              const lines = paragraph.split('\n');
              return (
                <ul key={index} className="space-y-2.5 my-4 pl-2">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                      <span>{line.replace(/^(\d+\.|\-|\*)\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            // Lead paragraph formatting for first paragraph
            if (index === 0) {
              return (
                <p key={index} className="text-lg sm:text-xl font-normal text-primary/95 leading-relaxed">
                  {paragraph}
                </p>
              );
            }

            return (
              <p key={index}>
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Article Author Footer Card */}
        <div className="mt-14 p-6 sm:p-8 bg-white/70 rounded-2xl border border-primary/15 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary text-secondary flex items-center justify-center font-serif text-2xl font-bold shadow-md shrink-0">
            N
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-base font-serif font-bold text-primary mb-1">
              About Nagori Ayurveda
            </h4>
            <p className="text-xs sm:text-sm text-dark/70 font-light leading-relaxed">
              Committed to 100% soil-to-shelf transparency and pure, single-origin Nagori Ashwagandha backed by scientific standardization and ethical farmer partnerships in Nagaur, Rajasthan.
            </p>
          </div>
        </div>
      </main>

      {/* 5. RELATED ARTICLES CAROUSEL/GRID */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 border-t border-primary/10">
          <div className="text-center mb-10">
            <span className="text-[11px] font-sans font-bold text-accent uppercase tracking-widest block mb-1">
              Keep Reading
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              Related Articles & Insights
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedBlogs.map((b, idx) => (
              <Link 
                key={idx}
                to={`/blog/${b._id || idx}`}
                className="group bg-white/60 rounded-xl overflow-hidden border border-primary/10 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img 
                    src={b.image || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop'} 
                    alt={b.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-accent tracking-wider block mb-1">
                      {b.category || 'Wellness'}
                    </span>
                    <h4 className="font-serif font-bold text-primary text-base leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {b.title}
                    </h4>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Story &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
