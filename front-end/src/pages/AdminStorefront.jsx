import React, { useState, useEffect, useRef } from 'react';
import { Save, Loader2, Plus, Trash2, Image as ImageIcon, Eye, Layout, Monitor, Smartphone, ExternalLink, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

// Simple & Clean Recommended Size Guide
function ImageGuide({ size }) {
  // Keep only the primary recommended size, clean and short
  const cleanSize = size ? size.split('(')[0].trim() : '';
  return (
    <p className="text-[11px] text-primary/60 mt-1.5 font-medium">
      Recommended Size: <span className="font-bold text-primary">{cleanSize || size}</span>
    </p>
  );
}

export default function AdminStorefront({ token }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('branding');

  // Live Visual Preview States
  const [viewMode, setViewMode] = useState('split'); // 'editor', 'split', 'preview'
  const [previewPage, setPreviewPage] = useState('/');
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop', 'mobile'
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/content`);
      if (!res.ok) throw new Error('Failed to load content settings');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Real-time live sync: whenever content changes, sync to sessionStorage and postMessage to preview iframe
  useEffect(() => {
    if (!content) return;
    try {
      sessionStorage.setItem('nagori_preview_content', JSON.stringify(content));
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: 'NAGORI_PREVIEW_UPDATE', content }, '*');
      }
    } catch (_) {}
  }, [content]);

  const handleIframeLoad = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow && content) {
        iframeRef.current.contentWindow.postMessage({ type: 'NAGORI_PREVIEW_UPDATE', content }, '*');
      }
    } catch (_) {}
  };

  const handleTabClick = (tab) => {
    setActiveSubTab(tab);
    // Automatically switch preview page to relevant URL
    if (tab === 'aboutUs') setPreviewPage('/about');
    else if (tab === 'ourStory') setPreviewPage('/our-story');
    else if (tab === 'welfareSociety') setPreviewPage('/welfare-society');
    else setPreviewPage('/');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });
      if (!res.ok) throw new Error('Failed to save settings');
      const data = await res.json();
      setContent(data);
      alert('Content settings published successfully to live website!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-accent" /></div>;
  if (error) return <div className="p-8 text-red-500 font-bold">{error}</div>;
  if (!content) return null;

  return (
    <div className="animate-fade-in space-y-4">
      {/* Top Header & View Mode Switcher */}
      <div className="bg-secondary border border-primary/10 p-4 rounded shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-serif font-bold text-primary">Storefront CMS & Live Visual Editor</h2>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2 py-0.5 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Sync
            </span>
          </div>
          <p className="text-xs text-dark/60 mt-0.5">Edit any text or image and watch the live website update in real-time</p>
        </div>

        {/* View Mode Pills */}
        <div className="flex items-center gap-2 bg-primary/5 p-1 rounded border border-primary/10">
          <button
            type="button"
            onClick={() => setViewMode('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === 'editor' ? 'bg-primary text-secondary shadow-xs' : 'text-primary/70 hover:text-primary'
            }`}
          >
            <Layout className="w-3.5 h-3.5" /> Editor Only
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === 'split' ? 'bg-accent text-primary shadow-xs' : 'text-primary/70 hover:text-primary'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Split Live Preview
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
              viewMode === 'preview' ? 'bg-primary text-secondary shadow-xs' : 'text-primary/70 hover:text-primary'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Full Preview
          </button>
        </div>

        {/* Publish Action Button */}
        <div className="flex items-center gap-2">
          <a
            href={previewPage}
            target="_blank"
            rel="noreferrer"
            className="border border-primary/20 text-primary hover:bg-primary/5 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            title="Open page in a new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live Site
          </a>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-accent text-primary px-5 py-2 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-accent-light disabled:opacity-50 shadow-xs"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Publishing...' : 'Publish Changes'}
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 xl:grid-cols-12' : 'grid-cols-1'}`}>
        
        {/* Left Side: Editor Form (Hidden in full preview mode) */}
        {viewMode !== 'preview' && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-6 2xl:col-span-5' : 'w-full'} flex flex-col md:flex-row gap-4`}>
            {/* Vertical Tabs */}
            <div className="w-full md:w-48 shrink-0 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {[
                { id: 'branding', label: 'Global Branding', icon: '🏷️' },
                { id: 'heroSliders', label: 'Hero Sliders', icon: '🖼️' },
                { id: 'trustBadges', label: 'Trust Badges', icon: '🛡️' },
                { id: 'videoReviews', label: 'Video Reviews', icon: '🎬' },
                { id: 'userStories', label: 'User Stories', icon: '💬' },
                { id: 'theDifference', label: 'Why Nagori', icon: '⚡' },
                { id: 'foundersNote', label: "Director's Note", icon: '👥' },
                { id: 'aboutUs', label: 'About Us Page', icon: 'ℹ️' },
                { id: 'ourStory', label: 'Our Story Page', icon: '📜' },
                { id: 'welfareSociety', label: 'Welfare Society', icon: '🌾' },
                { id: 'faqSection', label: 'FAQ Section', icon: '❓' },
                { id: 'blogSection', label: 'Blog Section', icon: '📰' },
                { id: 'footer', label: 'Footer & Contacts', icon: '📞' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeSubTab === tab.id 
                      ? 'bg-primary text-secondary shadow-xs' 
                      : 'bg-secondary text-primary/70 hover:bg-primary/5 border border-primary/5'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content Form */}
            <div className="flex-1 bg-secondary border border-primary/10 p-5 rounded shadow-sm max-h-[85vh] overflow-y-auto">
          
          {/* BRANDING */}
          {activeSubTab === 'branding' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">Global Branding</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Site Title</label>
                  <input 
                    type="text" 
                    value={content.branding?.siteTitle || ''}
                    onChange={(e) => setContent({...content, branding: {...content.branding, siteTitle: e.target.value}})}
                    className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm focus:border-accent outline-none" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Logo Image</label>
                  <div className="flex items-center gap-4">
                    {content.branding?.logoUrl ? (
                      <div className="h-16 w-32 bg-primary/5 flex items-center justify-center p-2 rounded border border-primary/10">
                        <img src={content.branding.logoUrl} className="max-h-full max-w-full object-contain" alt="Logo" />
                      </div>
                    ) : (
                      <div className="h-16 w-32 bg-primary/5 flex items-center justify-center rounded border border-primary/10">
                        <ImageIcon className="text-primary/30 w-6 h-6" />
                      </div>
                    )}
                    <label className="bg-primary/10 text-primary px-4 py-2 rounded text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20">
                      Upload Logo
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, (url) => setContent({...content, branding: {...content.branding, logoUrl: url}}))}
                      />
                    </label>
                  </div>
                  <ImageGuide 
                    size="300 × 80 px (Max width 450px)" 
                    aspect="~3.5:1 Horizontal" 
                    format="PNG (Transparent Background) or SVG" 
                    maxWeight="under 500 KB" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Logo Tagline</label>
                  <input 
                    type="text" 
                    placeholder="e.g. India's Heritage - Global Wellness"
                    value={content.branding?.tagline || ''}
                    onChange={(e) => setContent({...content, branding: {...content.branding, tagline: e.target.value}})}
                    className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm focus:border-accent outline-none" 
                  />
                  <p className="text-[11px] text-primary/50 mt-1">Displayed right under the brand logo in Navbar & Footer</p>
                </div>

                <div className="pt-2 border-t border-primary/10">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Top Announcement Bar</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Announcement Header / Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. NA-1143™"
                        value={content.branding?.announcementLine1 || ''}
                        onChange={(e) => setContent({...content, branding: {...content.branding, announcementLine1: e.target.value}})}
                        className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm focus:border-accent outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Announcement Subtitle / GI Tag Info</label>
                      <input 
                        type="text" 
                        placeholder="e.g. GI Tag Premium Nagori Ashwagandha Powder & Capsules"
                        value={content.branding?.announcementLine2 || ''}
                        onChange={(e) => setContent({...content, branding: {...content.branding, announcementLine2: e.target.value}})}
                        className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm focus:border-accent outline-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HERO SLIDERS */}
          {activeSubTab === 'heroSliders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary">Hero Sliders</h3>
                  <p className="text-xs text-primary/60">Manage top homepage slider banners and promotional headlines</p>
                </div>
                <button 
                  onClick={() => setContent({...content, heroSliders: [...(content.heroSliders || []), { image: '', altText: 'New Slide', link: '' }]})}
                  className="text-xs bg-primary text-secondary px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Slide
                </button>
              </div>
              <div className="space-y-4">
                {(content.heroSliders || []).map((slide, idx) => (
                  <div key={idx} className="border border-primary/10 p-4 rounded flex flex-col md:flex-row gap-4 bg-primary/5">
                    <div className="w-full md:w-56 shrink-0 flex flex-col gap-2">
                      <div className="aspect-video bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded">
                        {slide.image ? (
                          <img src={slide.image} alt="Slide" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-primary/30" />
                        )}
                      </div>
                      <label className="text-center bg-primary/10 text-primary py-1.5 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                        Upload Image
                        <input 
                          type="file" accept="image/*" className="hidden" 
                          onChange={(e) => handleImageUpload(e, (url) => {
                            const newArr = [...content.heroSliders];
                            newArr[idx].image = url;
                            setContent({...content, heroSliders: newArr});
                          })}
                        />
                      </label>
                      <ImageGuide 
                        size="1920 × 750 px (Desktop) / 1080 × 1080 px (Square)" 
                        aspect="~2.5:1 Banner or 1:1" 
                        format="WebP or JPG" 
                        maxWeight="under 1.5 MB" 
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Alt Text</label>
                        <input type="text" value={slide.altText} 
                          onChange={(e) => {
                            const newArr = [...content.heroSliders];
                            newArr[idx].altText = e.target.value;
                            setContent({...content, heroSliders: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Redirect Link</label>
                        <input type="text" value={slide.link} 
                          onChange={(e) => {
                            const newArr = [...content.heroSliders];
                            newArr[idx].link = e.target.value;
                            setContent({...content, heroSliders: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newArr = [...content.heroSliders];
                        newArr.splice(idx, 1);
                        setContent({...content, heroSliders: newArr});
                      }}
                      className="text-red-500 hover:bg-red-50 p-2 rounded self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRUST BADGES */}
          {activeSubTab === 'trustBadges' && (
            <div className="space-y-6">
              <div className="border-b border-primary/10 pb-2">
                <h3 className="text-xl font-serif font-bold text-primary">Trust Badges Strip</h3>
                <p className="text-xs text-primary/60">Icons and trust claims shown in the banner strip under Hero</p>
              </div>
              <div className="bg-[#fdfbf6] border border-[#d4af37]/30 rounded p-2.5 text-xs text-primary/80">
                <span className="font-bold text-[#8c6d1f]">💡 Popular Lucide Icon Names:</span> ShieldCheck, Award, Leaf, Beaker, HeartHandshake, Sprout, CheckCircle2, FlaskConical, Sparkles
              </div>
              <div className="space-y-4">
                {(content.trustBadges || []).map((badge, idx) => (
                  <div key={idx} className="flex gap-4 items-end border border-primary/5 p-4 bg-primary/5 rounded">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Icon Name (Lucide)</label>
                      <input type="text" value={badge.iconName} 
                        onChange={(e) => {
                          const newArr = [...content.trustBadges];
                          newArr[idx].iconName = e.target.value;
                          setContent({...content, trustBadges: newArr});
                        }}
                        className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Badge Text</label>
                      <input type="text" value={badge.text} 
                        onChange={(e) => {
                          const newArr = [...content.trustBadges];
                          newArr[idx].text = e.target.value;
                          setContent({...content, trustBadges: newArr});
                        }}
                        className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIDEO REVIEWS */}
          {activeSubTab === 'videoReviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary">Video Reviews & Reels</h3>
                  <p className="text-xs text-primary/60">Short video reels and influencer customer reviews</p>
                </div>
                <button 
                  onClick={() => setContent({...content, videoReviews: [...(content.videoReviews || []), { videoUrl: '', creatorName: '', views: '', caption: '' }]})}
                  className="text-xs bg-primary text-secondary px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Video
                </button>
              </div>
              <div className="space-y-4">
                {(content.videoReviews || []).map((review, idx) => (
                  <div key={idx} className="border border-primary/10 p-4 rounded flex flex-col md:flex-row gap-4 bg-primary/5">
                    <div className="w-36 shrink-0 flex flex-col gap-2">
                      <div className="aspect-[9/16] bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded relative">
                        {review.videoUrl ? (
                          <video src={review.videoUrl} className="w-full h-full object-cover" muted />
                        ) : (
                          <span className="text-[10px] text-primary/40 font-bold tracking-widest uppercase">No Video</span>
                        )}
                      </div>
                      <label className="text-center bg-primary/10 text-primary py-1 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                        Upload Video
                        <input type="file" accept="video/*" className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const newArr = [...(content.videoReviews || [])];
                                newArr[idx].videoUrl = reader.result;
                                setContent({...content, videoReviews: newArr});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <ImageGuide 
                        size="720 × 1280 px" 
                        aspect="9:16 Vertical Reel" 
                        format="MP4 / WebM (video) or JPG (cover)" 
                        maxWeight="Video: < 15MB, Image: < 800KB" 
                      />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Creator Name</label>
                        <input type="text" value={review.creatorName || ''} 
                          onChange={(e) => {
                            const newArr = [...content.videoReviews];
                            newArr[idx].creatorName = e.target.value;
                            setContent({...content, videoReviews: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Views</label>
                        <input type="text" value={review.views || ''} placeholder="e.g. 589K Views"
                          onChange={(e) => {
                            const newArr = [...content.videoReviews];
                            newArr[idx].views = e.target.value;
                            setContent({...content, videoReviews: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Caption (Optional)</label>
                        <textarea value={review.caption || ''} 
                          onChange={(e) => {
                            const newArr = [...content.videoReviews];
                            newArr[idx].caption = e.target.value;
                            setContent({...content, videoReviews: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none min-h-[60px]" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newArr = [...content.videoReviews];
                        newArr.splice(idx, 1);
                        setContent({...content, videoReviews: newArr});
                      }}
                      className="text-red-500 hover:bg-red-50 p-2 rounded self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* USER STORIES */}
          {activeSubTab === 'userStories' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary">Customer Stories & Testimonials</h3>
                  <p className="text-xs text-primary/60">Real reviews and user feedback displayed on the homepage</p>
                </div>
                <button 
                  onClick={() => setContent({...content, userStories: [...(content.userStories || []), { image: '', name: '', location: '', quote: '' }]})}
                  className="text-xs bg-primary text-secondary px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Story
                </button>
              </div>
              <div className="space-y-4">
                {(content.userStories || []).map((story, idx) => (
                  <div key={idx} className="border border-primary/10 p-4 rounded flex flex-col md:flex-row gap-4 bg-primary/5">
                    <div className="w-32 shrink-0 flex flex-col gap-2">
                      <div className="aspect-square bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded-full">
                        {story.image ? (
                          <img src={story.image} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-primary/30" />
                        )}
                      </div>
                      <label className="text-center bg-primary/10 text-primary py-1 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                        Upload Image
                        <input type="file" accept="image/*" className="hidden" 
                          onChange={(e) => handleImageUpload(e, (url) => {
                            const newArr = [...content.userStories];
                            newArr[idx].image = url;
                            setContent({...content, userStories: newArr});
                          })}
                        />
                      </label>
                      <ImageGuide 
                        size="250 × 250 px" 
                        aspect="1:1 Square / Circle" 
                        format="JPG or PNG" 
                        maxWeight="under 300 KB" 
                      />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Name</label>
                        <input type="text" value={story.name} 
                          onChange={(e) => {
                            const newArr = [...content.userStories];
                            newArr[idx].name = e.target.value;
                            setContent({...content, userStories: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Location</label>
                        <input type="text" value={story.location} 
                          onChange={(e) => {
                            const newArr = [...content.userStories];
                            newArr[idx].location = e.target.value;
                            setContent({...content, userStories: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Quote</label>
                        <textarea value={story.quote} 
                          onChange={(e) => {
                            const newArr = [...content.userStories];
                            newArr[idx].quote = e.target.value;
                            setContent({...content, userStories: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none min-h-[60px]" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newArr = [...content.userStories];
                        newArr.splice(idx, 1);
                        setContent({...content, userStories: newArr});
                      }}
                      className="text-red-500 hover:bg-red-50 p-2 rounded self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THE DIFFERENCE */}
          {activeSubTab === 'theDifference' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">The Difference Section (Why Nagori)</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Section Title</label>
                  <input type="text" value={content.theDifference?.title || ''}
                    onChange={(e) => setContent({...content, theDifference: {...content.theDifference, title: e.target.value}})}
                    className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm outline-none" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Section Subtitle</label>
                  <textarea value={content.theDifference?.subtitle || ''}
                    onChange={(e) => setContent({...content, theDifference: {...content.theDifference, subtitle: e.target.value}})}
                    className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm outline-none min-h-[80px]" 
                  />
                </div>

                {/* Section Feature Image */}
                <div className="p-4 border border-primary/10 rounded bg-primary/5">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Comparison Feature Image</label>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-36 h-36 bg-secondary border border-primary/10 rounded overflow-hidden flex items-center justify-center shrink-0">
                      {content.theDifference?.image ? (
                        <img src={content.theDifference.image} alt="The Difference" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="text-primary/30 w-8 h-8" />
                      )}
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20">
                        Upload Comparison Image
                        <input type="file" accept="image/*" className="hidden" 
                          onChange={(e) => handleImageUpload(e, (url) => setContent({...content, theDifference: {...content.theDifference, image: url}}))}
                        />
                      </label>
                      <ImageGuide 
                        size="800 × 800 px (Square) or 1000 × 750 px (4:3)" 
                        aspect="1:1 or 4:3" 
                        format="WebP or High-Res JPG" 
                        maxWeight="under 1 MB" 
                      />
                    </div>
                  </div>
                </div>
                
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary pt-4 border-t border-primary/10">Feature Comparison Points</h4>
                {(content.theDifference?.items || []).map((item, idx) => (
                  <div key={idx} className="border border-primary/10 p-4 rounded bg-primary/5 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Icon (Lucide)</label>
                        <input type="text" value={item.iconName} 
                          onChange={(e) => {
                            const newItems = [...content.theDifference.items];
                            newItems[idx].iconName = e.target.value;
                            setContent({...content, theDifference: {...content.theDifference, items: newItems}});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Title</label>
                        <input type="text" value={item.title} 
                          onChange={(e) => {
                            const newItems = [...content.theDifference.items];
                            newItems[idx].title = e.target.value;
                            setContent({...content, theDifference: {...content.theDifference, items: newItems}});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Description</label>
                      <textarea value={item.description} 
                        onChange={(e) => {
                          const newItems = [...content.theDifference.items];
                          newItems[idx].description = e.target.value;
                          setContent({...content, theDifference: {...content.theDifference, items: newItems}});
                        }}
                        className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none min-h-[60px]" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DIRECTOR'S NOTE (Multiple Directors Sync with Home Page & About Us) */}
          {activeSubTab === 'foundersNote' && (() => {
            const currentDirectors = (content.aboutUs?.directors && content.aboutUs.directors.length > 0)
              ? content.aboutUs.directors
              : [
                  {
                    name: content.foundersNote?.name || 'Parul Choudhary',
                    title: content.foundersNote?.title || 'Director, Nagori',
                    quote: content.foundersNote?.quote || 'Purity, Science & Authentic Ayurvedic Heritage',
                    bio: content.foundersNote?.text || 'At Nagori Ayurveda, our vision is to provide uncompromised purity and clinically validated potency. Sourced directly from the arid, nutrient-rich soils of Nagaur, Rajasthan, every batch is crafted to honor traditional Ayurvedic wisdom while meeting the strictest modern quality benchmarks. We believe authentic wellness should be transparent, accessible, and life-changing.',
                    image: content.foundersNote?.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop'
                  },
                  {
                    name: 'Manak Choudhary',
                    title: 'Director, Nagori',
                    quote: 'From Frustration to True Formulation',
                    bio: 'Growing up in Rajasthan, we saw firsthand the remarkable potency of indigenous Nagori Ashwagandha. But looking at the modern market, we realized most commercial supplements were heavily processed, diluted, or sourced from compromised soils. We established Nagori with a singular mission: to deliver single-origin, high-withanolide Ayurvedic formulations you can take with total confidence every single day.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop'
                  }
                ];

            const handleUpdateDir = (idx, field, val) => {
              const updated = currentDirectors.map((d, i) => i === idx ? { ...d, [field]: val } : d);
              const updatedFoundersNote = idx === 0 ? {
                ...content.foundersNote,
                [field === 'bio' ? 'text' : field]: val
              } : content.foundersNote;
              setContent({
                ...content,
                foundersNote: updatedFoundersNote,
                aboutUs: { ...(content.aboutUs || {}), directors: updated }
              });
            };

            const handleAddDir = () => {
              const updated = [
                ...currentDirectors,
                { name: '', title: 'Director, Nagori', quote: '', bio: '', image: '' }
              ];
              setContent({
                ...content,
                aboutUs: { ...(content.aboutUs || {}), directors: updated }
              });
            };

            const handleRemoveDir = (idx) => {
              const updated = currentDirectors.filter((_, i) => i !== idx);
              setContent({
                ...content,
                aboutUs: { ...(content.aboutUs || {}), directors: updated }
              });
            };

            return (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-primary/10 pb-3">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-primary">Director's Note (Home Page)</h3>
                    <p className="text-xs text-primary/60 mt-0.5">
                      Both directors are shown with interactive switch tabs on the Home Page and in the Leadership section.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddDir}
                    className="self-start text-xs bg-primary text-secondary px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1.5 hover:bg-primary-light transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Director
                  </button>
                </div>

                <div className="space-y-6">
                  {currentDirectors.map((dir, idx) => (
                    <div key={idx} className="p-5 border border-primary/15 rounded-xl bg-white/70 shadow-sm space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary text-secondary flex items-center justify-center text-xs font-bold font-serif">
                            {idx + 1}
                          </span>
                          <h4 className="text-sm font-bold uppercase tracking-wider text-primary">
                            Director {idx + 1}: <span className="text-dark font-semibold">{dir.name || 'Unnamed Director'}</span>
                          </h4>
                        </div>
                        {currentDirectors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDir(idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {/* Director Photo */}
                        <div className="col-span-1 space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block">Director Photo</label>
                          <div className="aspect-[3/4] bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded-lg shadow-inner">
                            {dir.image ? (
                              <img src={dir.image} alt={dir.name || 'Director'} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="text-primary/30" />
                            )}
                          </div>
                          <label className="block text-center bg-primary/10 text-primary py-2 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded-lg transition-colors">
                            Upload Photo
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, (url) => handleUpdateDir(idx, 'image', url))}
                            />
                          </label>
                          <ImageGuide 
                            size="800 × 900 px (Portrait)" 
                            aspect="~1:1.1 Portrait" 
                            format="WebP or High-Res JPG" 
                            maxWeight="under 1 MB" 
                          />
                        </div>

                        {/* Director Info Inputs */}
                        <div className="col-span-2 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Director Name</label>
                              <input 
                                type="text" 
                                placeholder="e.g. Parul Choudhary"
                                value={dir.name || ''}
                                onChange={(e) => handleUpdateDir(idx, 'name', e.target.value)}
                                className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none rounded" 
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Title / Designation</label>
                              <input 
                                type="text" 
                                placeholder="e.g. Director, Nagori"
                                value={dir.title || ''}
                                onChange={(e) => handleUpdateDir(idx, 'title', e.target.value)}
                                className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none rounded" 
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Director's Quote / Headline</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Purity, Science & Authentic Ayurvedic Heritage"
                              value={dir.quote || ''}
                              onChange={(e) => handleUpdateDir(idx, 'quote', e.target.value)}
                              className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none font-medium rounded" 
                            />
                          </div>

                          <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Main Note Text (Bio)</label>
                            <textarea 
                              placeholder="Director note text shown on the Home Page and About Us..."
                              value={dir.bio || ''}
                              onChange={(e) => handleUpdateDir(idx, 'bio', e.target.value)}
                              className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none min-h-[120px] rounded leading-relaxed" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ABOUT US PAGE */}
          {activeSubTab === 'aboutUs' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">About Us Page</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Hero Title</label>
                    <input 
                      type="text" 
                      value={content.aboutUs?.heroTitle || ''} 
                      onChange={(e) => setContent({...content, aboutUs: {...(content.aboutUs || {}), heroTitle: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Hero Subtitle</label>
                    <input 
                      type="text" 
                      value={content.aboutUs?.heroSubtitle || ''} 
                      onChange={(e) => setContent({...content, aboutUs: {...(content.aboutUs || {}), heroSubtitle: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Company Overview (Who We Are)</label>
                  <textarea 
                    value={content.aboutUs?.companyOverview || ''} 
                    onChange={(e) => setContent({...content, aboutUs: {...(content.aboutUs || {}), companyOverview: e.target.value}})}
                    className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none min-h-[90px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Our Mission</label>
                    <textarea 
                      value={content.aboutUs?.mission || ''} 
                      onChange={(e) => setContent({...content, aboutUs: {...(content.aboutUs || {}), mission: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Our Vision</label>
                    <textarea 
                      value={content.aboutUs?.vision || ''} 
                      onChange={(e) => setContent({...content, aboutUs: {...(content.aboutUs || {}), vision: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Directors Management */}
                <div className="pt-4 border-t border-primary/10">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Directors & Leadership</h4>
                    <button 
                      onClick={() => {
                        const currentDirs = content.aboutUs?.directors || [];
                        setContent({...content, aboutUs: {...(content.aboutUs || {}), directors: [...currentDirs, { name: '', title: 'Director, Nagori', quote: '', bio: '', image: '' }]}});
                      }}
                      className="text-xs bg-primary text-secondary px-3 py-1 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Director
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(content.aboutUs?.directors || []).map((dir, idx) => (
                      <div key={idx} className="p-4 border border-primary/10 rounded flex flex-col md:flex-row gap-4 bg-primary/5 items-start">
                        <div className="w-28 shrink-0 space-y-1">
                          <div className="aspect-square bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded">
                            {dir.image ? (
                              <img src={dir.image} alt={dir.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="text-primary/30" />
                            )}
                          </div>
                          <label className="block text-center bg-primary/10 text-primary py-1 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                            Upload
                            <input type="file" accept="image/*" className="hidden" 
                              onChange={(e) => handleImageUpload(e, (url) => {
                                const newDirs = [...(content.aboutUs?.directors || [])];
                                newDirs[idx].image = url;
                                setContent({...content, aboutUs: {...(content.aboutUs || {}), directors: newDirs}});
                              })}
                            />
                          </label>
                          <ImageGuide 
                            size="600 × 600 px" 
                            aspect="1:1 Square" 
                            format="WebP or JPG" 
                            maxWeight="under 600 KB" 
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              type="text" 
                              placeholder="Director Name (e.g. Parul Choudhary)" 
                              value={dir.name || ''} 
                              onChange={(e) => {
                                const newDirs = [...(content.aboutUs?.directors || [])];
                                newDirs[idx].name = e.target.value;
                                setContent({...content, aboutUs: {...(content.aboutUs || {}), directors: newDirs}});
                              }}
                              className="bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none"
                            />
                            <input 
                              type="text" 
                              placeholder="Title (e.g. Director, Nagori)" 
                              value={dir.title || ''} 
                              onChange={(e) => {
                                const newDirs = [...(content.aboutUs?.directors || [])];
                                newDirs[idx].title = e.target.value;
                                setContent({...content, aboutUs: {...(content.aboutUs || {}), directors: newDirs}});
                              }}
                              className="bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none"
                            />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Director's Quote / Headline (e.g. Purity, Science & Authentic Ayurvedic Heritage)" 
                            value={dir.quote || ''} 
                            onChange={(e) => {
                              const newDirs = [...(content.aboutUs?.directors || [])];
                              newDirs[idx].quote = e.target.value;
                              setContent({...content, aboutUs: {...(content.aboutUs || {}), directors: newDirs}});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none font-medium"
                          />
                          <textarea 
                            placeholder="Director Bio & Philosophy (Shown in detail on Home Page Note and About Us)..."
                            value={dir.bio || ''} 
                            onChange={(e) => {
                              const newDirs = [...(content.aboutUs?.directors || [])];
                              newDirs[idx].bio = e.target.value;
                              setContent({...content, aboutUs: {...(content.aboutUs || {}), directors: newDirs}});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none min-h-[60px]"
                          />
                        </div>
                        <button 
                          onClick={() => {
                            const newDirs = (content.aboutUs?.directors || []).filter((_, i) => i !== idx);
                            setContent({...content, aboutUs: {...(content.aboutUs || {}), directors: newDirs}});
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OUR STORY PAGE */}
          {activeSubTab === 'ourStory' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">Our Story Page</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Hero Title</label>
                    <input 
                      type="text" 
                      value={content.ourStory?.heroTitle || ''} 
                      onChange={(e) => setContent({...content, ourStory: {...(content.ourStory || {}), heroTitle: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Hero Subtitle</label>
                    <input 
                      type="text" 
                      value={content.ourStory?.heroSubtitle || ''} 
                      onChange={(e) => setContent({...content, ourStory: {...(content.ourStory || {}), heroSubtitle: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Story Chapters */}
                <div className="pt-4 border-t border-primary/10">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Story Chapters</h4>
                    <button 
                      onClick={() => {
                        const chapters = content.ourStory?.chapters || [];
                        setContent({...content, ourStory: {...(content.ourStory || {}), chapters: [...chapters, { title: '', subtitle: '', content: '', image: '' }]}});
                      }}
                      className="text-xs bg-primary text-secondary px-3 py-1 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Chapter
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(content.ourStory?.chapters || []).map((ch, idx) => (
                      <div key={idx} className="p-4 border border-primary/10 rounded flex flex-col md:flex-row gap-4 bg-primary/5 items-start">
                        <div className="w-32 shrink-0 space-y-1">
                          <div className="aspect-[4/3] bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded">
                            {ch.image ? (
                              <img src={ch.image} alt={ch.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="text-primary/30" />
                            )}
                          </div>
                          <label className="block text-center bg-primary/10 text-primary py-1 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                            Upload
                            <input type="file" accept="image/*" className="hidden" 
                              onChange={(e) => handleImageUpload(e, (url) => {
                                const newCh = [...(content.ourStory?.chapters || [])];
                                newCh[idx].image = url;
                                setContent({...content, ourStory: {...(content.ourStory || {}), chapters: newCh}});
                              })}
                            />
                          </label>
                          <ImageGuide 
                            size="800 × 600 px (or 1200 × 800 px)" 
                            aspect="4:3 or 3:2" 
                            format="WebP or JPG" 
                            maxWeight="under 1.2 MB" 
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              type="text" 
                              placeholder="Chapter Title (e.g. The Genesis of Nagori)" 
                              value={ch.title || ''} 
                              onChange={(e) => {
                                const newCh = [...(content.ourStory?.chapters || [])];
                                newCh[idx].title = e.target.value;
                                setContent({...content, ourStory: {...(content.ourStory || {}), chapters: newCh}});
                              }}
                              className="bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none"
                            />
                            <input 
                              type="text" 
                              placeholder="Tagline / Subtitle" 
                              value={ch.subtitle || ''} 
                              onChange={(e) => {
                                const newCh = [...(content.ourStory?.chapters || [])];
                                newCh[idx].subtitle = e.target.value;
                                setContent({...content, ourStory: {...(content.ourStory || {}), chapters: newCh}});
                              }}
                              className="bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none"
                            />
                          </div>
                          <textarea 
                            placeholder="Chapter narrative..."
                            value={ch.content || ''} 
                            onChange={(e) => {
                              const newCh = [...(content.ourStory?.chapters || [])];
                              newCh[idx].content = e.target.value;
                              setContent({...content, ourStory: {...(content.ourStory || {}), chapters: newCh}});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none min-h-[70px]"
                          />
                        </div>
                        <button 
                          onClick={() => {
                            const newCh = (content.ourStory?.chapters || []).filter((_, i) => i !== idx);
                            setContent({...content, ourStory: {...(content.ourStory || {}), chapters: newCh}});
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Visual Showcase Cards (Process & Results) */}
                <div className="pt-6 border-t border-primary/10">
                  <div className="mb-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Bottom Visual Showcase Cards</h4>
                    <p className="text-xs text-primary/60">Manage the 2 large featured photo cards shown at the bottom of the Our Story page</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1: Process / Crafted with Care */}
                    <div className="p-4 border border-primary/10 rounded bg-primary/5 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">Showcase Card 1</span>
                      </div>
                      <div className="aspect-[4/3] bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded">
                        {content.ourStory?.bottomCard1?.image ? (
                          <img src={content.ourStory.bottomCard1.image} alt="Card 1" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-primary/30 w-8 h-8" />
                        )}
                      </div>
                      <label className="block text-center bg-primary/10 text-primary py-1.5 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                        Upload Card 1 Image
                        <input type="file" accept="image/*" className="hidden" 
                          onChange={(e) => handleImageUpload(e, (url) => {
                            setContent({
                              ...content, 
                              ourStory: {
                                ...(content.ourStory || {}), 
                                bottomCard1: { ...(content.ourStory?.bottomCard1 || {}), image: url }
                              }
                            });
                          })}
                        />
                      </label>
                      <ImageGuide 
                        size="800 × 600 px (or 1000 × 750 px)" 
                        aspect="4:3 Landscape" 
                        format="WebP or JPG" 
                        maxWeight="under 1.2 MB" 
                      />
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Card 1 Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Crafted with Care" 
                          value={content.ourStory?.bottomCard1?.title || ''} 
                          onChange={(e) => {
                            setContent({
                              ...content, 
                              ourStory: {
                                ...(content.ourStory || {}), 
                                bottomCard1: { ...(content.ourStory?.bottomCard1 || {}), title: e.target.value }
                              }
                            });
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none font-bold"
                        />
                      </div>
                    </div>

                    {/* Card 2: Results / Real Results */}
                    <div className="p-4 border border-primary/10 rounded bg-primary/5 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">Showcase Card 2</span>
                      </div>
                      <div className="aspect-[4/3] bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded">
                        {content.ourStory?.bottomCard2?.image ? (
                          <img src={content.ourStory.bottomCard2.image} alt="Card 2" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-primary/30 w-8 h-8" />
                        )}
                      </div>
                      <label className="block text-center bg-primary/10 text-primary py-1.5 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                        Upload Card 2 Image
                        <input type="file" accept="image/*" className="hidden" 
                          onChange={(e) => handleImageUpload(e, (url) => {
                            setContent({
                              ...content, 
                              ourStory: {
                                ...(content.ourStory || {}), 
                                bottomCard2: { ...(content.ourStory?.bottomCard2 || {}), image: url }
                              }
                            });
                          })}
                        />
                      </label>
                      <ImageGuide 
                        size="800 × 600 px (or 1000 × 750 px)" 
                        aspect="4:3 Landscape" 
                        format="WebP or JPG" 
                        maxWeight="under 1.2 MB" 
                      />
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Card 2 Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Real Results" 
                          value={content.ourStory?.bottomCard2?.title || ''} 
                          onChange={(e) => {
                            setContent({
                              ...content, 
                              ourStory: {
                                ...(content.ourStory || {}), 
                                bottomCard2: { ...(content.ourStory?.bottomCard2 || {}), title: e.target.value }
                              }
                            });
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WELFARE SOCIETY PAGE */}
          {activeSubTab === 'welfareSociety' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">The Nagauri Welfare Society Page</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Hero Title</label>
                    <input 
                      type="text" 
                      value={content.welfareSociety?.heroTitle || ''} 
                      onChange={(e) => setContent({...content, welfareSociety: {...(content.welfareSociety || {}), heroTitle: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Hero Subtitle</label>
                    <input 
                      type="text" 
                      value={content.welfareSociety?.heroSubtitle || ''} 
                      onChange={(e) => setContent({...content, welfareSociety: {...(content.welfareSociety || {}), heroSubtitle: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Key Stats */}
                <div className="pt-4 border-t border-primary/10">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Impact Statistics</h4>
                    <button 
                      onClick={() => {
                        const stats = content.welfareSociety?.stats || [];
                        setContent({...content, welfareSociety: {...(content.welfareSociety || {}), stats: [...stats, { value: '', label: '' }]}});
                      }}
                      className="text-xs bg-primary text-secondary px-3 py-1 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Stat
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(content.welfareSociety?.stats || []).map((s, idx) => (
                      <div key={idx} className="p-3 border border-primary/10 rounded flex gap-2 bg-primary/5 items-center">
                        <input 
                          type="text" 
                          placeholder="Value (e.g. 500+)" 
                          value={s.value || ''} 
                          onChange={(e) => {
                            const newStats = [...(content.welfareSociety?.stats || [])];
                            newStats[idx].value = e.target.value;
                            setContent({...content, welfareSociety: {...(content.welfareSociety || {}), stats: newStats}});
                          }}
                          className="w-1/3 bg-secondary border border-primary/10 px-2.5 py-1.5 text-xs outline-none font-bold"
                        />
                        <input 
                          type="text" 
                          placeholder="Label (e.g. Farmer Families)" 
                          value={s.label || ''} 
                          onChange={(e) => {
                            const newStats = [...(content.welfareSociety?.stats || [])];
                            newStats[idx].label = e.target.value;
                            setContent({...content, welfareSociety: {...(content.welfareSociety || {}), stats: newStats}});
                          }}
                          className="flex-1 bg-secondary border border-primary/10 px-2.5 py-1.5 text-xs outline-none"
                        />
                        <button 
                          onClick={() => {
                            const newStats = (content.welfareSociety?.stats || []).filter((_, i) => i !== idx);
                            setContent({...content, welfareSociety: {...(content.welfareSociety || {}), stats: newStats}});
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Initiatives */}
                <div className="pt-4 border-t border-primary/10">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Core Initiatives</h4>
                    <button 
                      onClick={() => {
                        const inits = content.welfareSociety?.initiatives || [];
                        setContent({...content, welfareSociety: {...(content.welfareSociety || {}), initiatives: [...inits, { title: '', description: '', iconName: 'Sprout' }]}});
                      }}
                      className="text-xs bg-primary text-secondary px-3 py-1 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Initiative
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(content.welfareSociety?.initiatives || []).map((init, idx) => (
                      <div key={idx} className="p-3 border border-primary/10 rounded flex gap-3 bg-primary/5 items-start">
                        <div className="flex-1 space-y-2">
                          <input 
                            type="text" 
                            placeholder="Initiative Title" 
                            value={init.title || ''} 
                            onChange={(e) => {
                              const newInits = [...(content.welfareSociety?.initiatives || [])];
                              newInits[idx].title = e.target.value;
                              setContent({...content, welfareSociety: {...(content.welfareSociety || {}), initiatives: newInits}});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none font-bold"
                          />
                          <textarea 
                            placeholder="Description..."
                            value={init.description || ''} 
                            onChange={(e) => {
                              const newInits = [...(content.welfareSociety?.initiatives || [])];
                              newInits[idx].description = e.target.value;
                              setContent({...content, welfareSociety: {...(content.welfareSociety || {}), initiatives: newInits}});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none min-h-[50px]"
                          />
                        </div>
                        <button 
                          onClick={() => {
                            const newInits = (content.welfareSociety?.initiatives || []).filter((_, i) => i !== idx);
                            setContent({...content, welfareSociety: {...(content.welfareSociety || {}), initiatives: newInits}});
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Society Commitments */}
                <div className="pt-4 border-t border-primary/10">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Society Commitments</h4>
                      <p className="text-xs text-primary/60 mt-0.5">Key pledges displayed on the Welfare Society origin story card.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const currentComms = content.welfareSociety?.commitments || [];
                        setContent({...content, welfareSociety: {...(content.welfareSociety || {}), commitments: [...currentComms, '']}});
                      }}
                      className="text-xs bg-primary text-secondary px-3 py-1 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Commitment
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(content.welfareSociety?.commitments || []).map((comm, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input 
                          type="text" 
                          placeholder="e.g. Zero synthetic pesticides or chemicals in protected zones" 
                          value={comm || ''} 
                          onChange={(e) => {
                            const newComms = [...(content.welfareSociety?.commitments || [])];
                            newComms[idx] = e.target.value;
                            setContent({...content, welfareSociety: {...(content.welfareSociety || {}), commitments: newComms}});
                          }}
                          className="flex-1 bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none rounded"
                        />
                        <button 
                          onClick={() => {
                            const newComms = (content.welfareSociety?.commitments || []).filter((_, i) => i !== idx);
                            setContent({...content, welfareSociety: {...(content.welfareSociety || {}), commitments: newComms}});
                          }}
                          className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ SECTION */}
          {activeSubTab === 'faqSection' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <h3 className="text-xl font-serif font-bold text-primary">FAQ Section</h3>
                <button 
                  onClick={() => setContent({...content, faqSection: [...(content.faqSection || []), { question: '', answer: '' }]})}
                  className="text-xs bg-primary text-secondary px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add FAQ
                </button>
              </div>
              <div className="space-y-4">
                {(content.faqSection || []).map((faq, idx) => (
                  <div key={idx} className="border border-primary/10 p-4 rounded flex gap-4 bg-primary/5">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Question</label>
                        <input type="text" value={faq.question} 
                          onChange={(e) => {
                            const newArr = [...content.faqSection];
                            newArr[idx].question = e.target.value;
                            setContent({...content, faqSection: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-sm font-semibold outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Answer</label>
                        <textarea value={faq.answer} 
                          onChange={(e) => {
                            const newArr = [...content.faqSection];
                            newArr[idx].answer = e.target.value;
                            setContent({...content, faqSection: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-sm outline-none min-h-[80px]" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newArr = [...content.faqSection];
                        newArr.splice(idx, 1);
                        setContent({...content, faqSection: newArr});
                      }}
                      className="text-red-500 hover:bg-red-50 p-2 rounded self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BLOG SECTION */}
          {activeSubTab === 'blogSection' && (
            <div className="space-y-8">
              {/* Section Header Editor */}
              <div className="bg-primary/5 p-5 border border-primary/15 rounded-xl space-y-4">
                <div className="border-b border-primary/10 pb-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary">Blog Section Header & Title</h4>
                  <p className="text-xs text-primary/60 mt-0.5">Customize the headline shown above the blog cards on the Home Page.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-primary/70 block mb-1">Small Badge</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Learn With Us" 
                      value={content.blogSectionHeader?.badge || ''} 
                      onChange={(e) => setContent({
                        ...content, 
                        blogSectionHeader: { ...(content.blogSectionHeader || {}), badge: e.target.value }
                      })}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-xs outline-none rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-primary/70 block mb-1">Title Line 1 (Light Font)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Simple reads for" 
                      value={content.blogSectionHeader?.titlePrefix || ''} 
                      onChange={(e) => setContent({
                        ...content, 
                        blogSectionHeader: { ...(content.blogSectionHeader || {}), titlePrefix: e.target.value }
                      })}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-xs outline-none rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-primary/70 block mb-1">Title Line 2 (Bold Highlight)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. better health decisions" 
                      value={content.blogSectionHeader?.titleHighlight || ''} 
                      onChange={(e) => setContent({
                        ...content, 
                        blogSectionHeader: { ...(content.blogSectionHeader || {}), titleHighlight: e.target.value }
                      })}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-xs outline-none font-bold rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-primary/70 block mb-1">Button Text</label>
                    <input 
                      type="text" 
                      placeholder="e.g. VIEW ALL ARTICLES" 
                      value={content.blogSectionHeader?.buttonText || ''} 
                      onChange={(e) => setContent({
                        ...content, 
                        blogSectionHeader: { ...(content.blogSectionHeader || {}), buttonText: e.target.value }
                      })}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-xs outline-none rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-primary/70 block mb-1">Button Link</label>
                    <input 
                      type="text" 
                      placeholder="e.g. /blogs" 
                      value={content.blogSectionHeader?.buttonLink || ''} 
                      onChange={(e) => setContent({
                        ...content, 
                        blogSectionHeader: { ...(content.blogSectionHeader || {}), buttonLink: e.target.value }
                      })}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-xs outline-none rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Blog Posts Manager */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-primary">Blog Posts ({ (content.blogSection || []).length })</h3>
                    <p className="text-xs text-primary/60 mt-0.5">Articles appear on the Home Page carousel and on the dedicated /blogs page.</p>
                  </div>
                  <button 
                    onClick={() => setContent({
                      ...content, 
                      blogSection: [
                        ...(content.blogSection || []), 
                        { image: '', title: '', category: 'Wellness & Health', readTime: '5 min read', date: 'July 6, 2026', excerpt: '', link: '/blogs' }
                      ]
                    })}
                    className="text-xs bg-primary text-secondary px-3.5 py-2 rounded uppercase tracking-widest font-bold flex items-center gap-1.5 hover:bg-primary-light transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Post
                  </button>
                </div>

                <div className="space-y-6">
                  {(content.blogSection || []).map((blog, idx) => (
                    <div key={idx} className="border border-primary/15 p-5 rounded-xl flex flex-col md:flex-row gap-5 bg-white/70 shadow-sm relative">
                      <div className="w-full md:w-52 shrink-0 flex flex-col gap-2">
                        <div className="aspect-video bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded-lg shadow-inner">
                          {blog.image ? (
                            <img src={blog.image} alt={blog.title || 'Blog'} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="text-primary/30 w-8 h-8" />
                          )}
                        </div>
                        <label className="text-center bg-primary/10 text-primary py-2 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded-lg transition-colors">
                          Upload Image
                          <input type="file" accept="image/*" className="hidden" 
                            onChange={(e) => handleImageUpload(e, (url) => {
                              const newArr = [...content.blogSection];
                              newArr[idx].image = url;
                              setContent({...content, blogSection: newArr});
                            })}
                          />
                        </label>
                        <ImageGuide 
                          size="800 × 500 px" 
                          aspect="16:10 or 16:9" 
                          format="WebP or JPG" 
                          maxWeight="under 800 KB" 
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-accent">
                            Post #{idx + 1}
                          </span>
                          <button 
                            onClick={() => {
                              const newArr = [...content.blogSection];
                              newArr.splice(idx, 1);
                              setContent({...content, blogSection: newArr});
                            }}
                            className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-widest text-primary/70 block mb-1">Article Title</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Frequent Muscle Cramps During Monsoon? Read This First"
                            value={blog.title || ''} 
                            onChange={(e) => {
                              const newArr = [...content.blogSection];
                              newArr[idx].title = e.target.value;
                              setContent({...content, blogSection: newArr});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm font-semibold outline-none rounded" 
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Category / Topic</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Energy & Strength"
                              value={blog.category || ''} 
                              onChange={(e) => {
                                const newArr = [...content.blogSection];
                                newArr[idx].category = e.target.value;
                                setContent({...content, blogSection: newArr});
                              }}
                              className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none rounded" 
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Date</label>
                            <input 
                              type="text" 
                              placeholder="e.g. July 6, 2026"
                              value={blog.date || ''} 
                              onChange={(e) => {
                                const newArr = [...content.blogSection];
                                newArr[idx].date = e.target.value;
                                setContent({...content, blogSection: newArr});
                              }}
                              className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none rounded" 
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Read Time</label>
                            <input 
                              type="text" 
                              placeholder="e.g. 5 min read"
                              value={blog.readTime || ''} 
                              onChange={(e) => {
                                const newArr = [...content.blogSection];
                                newArr[idx].readTime = e.target.value;
                                setContent({...content, blogSection: newArr});
                              }}
                              className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none rounded" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Excerpt / Summary</label>
                          <textarea 
                            placeholder="Short summary displayed on the card..."
                            value={blog.excerpt || ''} 
                            onChange={(e) => {
                              const newArr = [...content.blogSection];
                              newArr[idx].excerpt = e.target.value;
                              setContent({...content, blogSection: newArr});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none min-h-[60px] rounded leading-relaxed" 
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">
                            Full Article Content (Read Mode Text - shown when user clicks "Read More")
                          </label>
                          <textarea 
                            placeholder="Write full article here. Separate paragraphs with a blank line..."
                            value={blog.content || ''} 
                            onChange={(e) => {
                              const newArr = [...content.blogSection];
                              newArr[idx].content = e.target.value;
                              setContent({...content, blogSection: newArr});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-2 text-xs outline-none min-h-[130px] rounded leading-relaxed font-sans" 
                          />
                          <p className="text-[10px] text-primary/50 mt-1">
                            Paragraphs and numbered points (1., 2.) are automatically formatted in the reader mode.
                          </p>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Custom Link URL (Optional - leave empty for default reader view)</label>
                          <input 
                            type="text" 
                            placeholder="Optional custom URL (leave empty to open in Read Mode)"
                            value={blog.link || ''} 
                            onChange={(e) => {
                              const newArr = [...content.blogSection];
                              newArr[idx].link = e.target.value;
                              setContent({...content, blogSection: newArr});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none rounded" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FOOTER */}
          {activeSubTab === 'footer' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">Footer Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">About Text</label>
                  <textarea 
                    value={content.footer?.aboutText || ''}
                    onChange={(e) => setContent({...content, footer: {...content.footer, aboutText: e.target.value}})}
                    className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm focus:border-accent outline-none min-h-[100px]" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Address</label>
                    <input 
                      type="text" 
                      value={content.footer?.address || ''}
                      onChange={(e) => setContent({...content, footer: {...content.footer, address: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Phone</label>
                    <input 
                      type="text" 
                      value={content.footer?.phone || ''}
                      onChange={(e) => setContent({...content, footer: {...content.footer, phone: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-2">Email</label>
                    <input 
                      type="text" 
                      value={content.footer?.email || ''}
                      onChange={(e) => setContent({...content, footer: {...content.footer, email: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-4 py-2 text-sm outline-none" 
                    />
                  </div>
                </div>
                
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary pt-4 border-t border-primary/10">Social Links</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Instagram URL</label>
                    <input type="text" value={content.footer?.socialLinks?.instagram || ''} 
                      onChange={(e) => setContent({...content, footer: {...content.footer, socialLinks: {...content.footer.socialLinks, instagram: e.target.value}}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Facebook URL</label>
                    <input type="text" value={content.footer?.socialLinks?.facebook || ''} 
                      onChange={(e) => setContent({...content, footer: {...content.footer, socialLinks: {...content.footer.socialLinks, facebook: e.target.value}}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Twitter URL</label>
                    <input type="text" value={content.footer?.socialLinks?.twitter || ''} 
                      onChange={(e) => setContent({...content, footer: {...content.footer, socialLinks: {...content.footer.socialLinks, twitter: e.target.value}}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

            </div>
          </div>
        )}

        {/* Right Side / Full Width: Live Visual Preview Pane */}
        {viewMode !== 'editor' && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-6 2xl:col-span-7' : 'w-full'} flex flex-col bg-secondary border border-primary/10 rounded shadow-md overflow-hidden min-h-[85vh]`}>
            {/* Live Preview Control Bar */}
            <div className="bg-primary text-secondary p-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
              {/* Page Selectors */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary/60 mr-1">Preview Page:</span>
                {[
                  { path: '/', label: 'Home Page', icon: '🏠' },
                  { path: '/about', label: 'About Us', icon: 'ℹ️' },
                  { path: '/our-story', label: 'Our Story', icon: '📜' },
                  { path: '/welfare-society', label: 'Welfare Society', icon: '🌾' },
                  { path: '/blogs', label: 'Blogs Page', icon: '📰' }
                ].map((pg) => (
                  <button
                    key={pg.path}
                    type="button"
                    onClick={() => setPreviewPage(pg.path)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                      previewPage === pg.path 
                        ? 'bg-accent text-primary shadow-xs' 
                        : 'bg-white/10 text-secondary hover:bg-white/20'
                    }`}
                  >
                    <span>{pg.icon}</span>
                    <span>{pg.label}</span>
                  </button>
                ))}
              </div>

              {/* Device and Action Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/10 rounded p-0.5">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded transition-all ${previewDevice === 'desktop' ? 'bg-secondary text-primary' : 'text-secondary/70 hover:text-white'}`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded transition-all ${previewDevice === 'mobile' ? 'bg-secondary text-primary' : 'text-secondary/70 hover:text-white'}`}
                    title="Mobile View (390px)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewKey(k => k + 1)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-secondary transition-all"
                  title="Reload Preview"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Click-to-Edit Section Bar */}
            <div className="bg-[#f7f5ed] px-3 py-2 border-b border-primary/10 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="font-bold text-primary/70 shrink-0 text-[11px] uppercase tracking-wider">
                ⚡ Tap to Edit Section:
              </span>
              {previewPage === '/' && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <button type="button" onClick={() => setActiveSubTab('branding')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'branding' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>🏷️ Logo & Top Bar</button>
                  <button type="button" onClick={() => setActiveSubTab('heroSliders')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'heroSliders' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>🖼️ Hero Sliders</button>
                  <button type="button" onClick={() => setActiveSubTab('trustBadges')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'trustBadges' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>🛡️ Trust Badges</button>
                  <button type="button" onClick={() => setActiveSubTab('foundersNote')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'foundersNote' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>👥 Director's Note</button>
                  <button type="button" onClick={() => setActiveSubTab('theDifference')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'theDifference' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>⚡ Why Nagori</button>
                  <button type="button" onClick={() => setActiveSubTab('videoReviews')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'videoReviews' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>🎬 Reels</button>
                  <button type="button" onClick={() => setActiveSubTab('userStories')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'userStories' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>💬 Reviews</button>
                  <button type="button" onClick={() => setActiveSubTab('faqSection')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'faqSection' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>❓ FAQs</button>
                  <button type="button" onClick={() => setActiveSubTab('footer')} className={`px-2 py-0.5 rounded text-[11px] font-medium border ${activeSubTab === 'footer' ? 'bg-primary text-secondary font-bold' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>📞 Footer</button>
                </div>
              )}
              {previewPage === '/about' && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <button type="button" onClick={() => setActiveSubTab('aboutUs')} className={`px-2.5 py-0.5 rounded text-[11px] font-bold border bg-primary text-secondary`}>ℹ️ Edit About Us, Vision & Directors</button>
                  <button type="button" onClick={() => setActiveSubTab('footer')} className={`px-2 py-0.5 rounded text-[11px] font-medium border bg-white text-gray-700 hover:bg-gray-50`}>📞 Footer & Contacts</button>
                </div>
              )}
              {previewPage === '/our-story' && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <button type="button" onClick={() => setActiveSubTab('ourStory')} className={`px-2.5 py-0.5 rounded text-[11px] font-bold border bg-primary text-secondary`}>📜 Edit Story Origin & Milestone Chapters</button>
                  <button type="button" onClick={() => setActiveSubTab('footer')} className={`px-2 py-0.5 rounded text-[11px] font-medium border bg-white text-gray-700 hover:bg-gray-50`}>📞 Footer & Contacts</button>
                </div>
              )}
              {previewPage === '/welfare-society' && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <button type="button" onClick={() => setActiveSubTab('welfareSociety')} className={`px-2.5 py-0.5 rounded text-[11px] font-bold border bg-primary text-secondary`}>🌾 Edit Welfare Mission, Stats & Initiatives</button>
                  <button type="button" onClick={() => setActiveSubTab('footer')} className={`px-2 py-0.5 rounded text-[11px] font-medium border bg-white text-gray-700 hover:bg-gray-50`}>📞 Footer & Contacts</button>
                </div>
              )}
            </div>

            {/* Live Interactive Iframe Frame Container */}
            <div className="flex-1 bg-[#edeae1] p-3 md:p-6 flex items-center justify-center overflow-auto min-h-[650px]">
              <div 
                className={`transition-all duration-300 bg-white shadow-2xl ${
                  previewDevice === 'mobile'
                    ? 'w-[390px] h-[750px] rounded-[36px] border-[8px] border-gray-800 overflow-hidden relative'
                    : 'w-full h-[750px] rounded-lg border border-gray-300 overflow-hidden'
                }`}
              >
                <iframe
                  ref={iframeRef}
                  key={`${previewPage}-${previewKey}`}
                  src={`${previewPage}?preview=true`}
                  onLoad={handleIframeLoad}
                  className="w-full h-full border-0 bg-white"
                  title="Storefront Live Preview"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
