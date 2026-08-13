import React, { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminStorefront({ token }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('branding');

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
      alert('Content settings saved successfully!');
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
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-end mb-8 border-b border-primary/5 pb-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary">Storefront CMS</h2>
          <p className="text-xs text-dark/50 mt-1 uppercase tracking-widest font-bold">Manage dynamic content</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-accent text-primary px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-accent-light disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Publish Changes'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Vertical Tabs */}
        <div className="w-56 shrink-0 flex flex-col gap-2">
          {[
            'branding', 'heroSliders', 'trustBadges', 'userStories',
            'theDifference', 'foundersNote', 'faqSection', 'blogSection', 'footer'
          ].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`text-left px-4 py-3 text-xs uppercase tracking-widest font-bold rounded transition-colors ${activeSubTab === tab ? 'bg-primary text-secondary' : 'bg-secondary text-primary/60 hover:bg-primary/5'}`}
            >
              {tab.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-secondary border border-primary/10 p-6 rounded shadow-sm">
          
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
                </div>
              </div>
            </div>
          )}

          {/* HERO SLIDERS */}
          {activeSubTab === 'heroSliders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <h3 className="text-xl font-serif font-bold text-primary">Hero Sliders</h3>
                <button 
                  onClick={() => setContent({...content, heroSliders: [...(content.heroSliders || []), { image: '', altText: 'New Slide', link: '' }]})}
                  className="text-xs bg-primary text-secondary px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Slide
                </button>
              </div>
              <div className="space-y-4">
                {(content.heroSliders || []).map((slide, idx) => (
                  <div key={idx} className="border border-primary/10 p-4 rounded flex gap-4 bg-primary/5">
                    <div className="w-48 shrink-0 flex flex-col gap-2">
                      <div className="aspect-video bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden">
                        {slide.image ? (
                          <img src={slide.image} alt="Slide" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-primary/30" />
                        )}
                      </div>
                      <label className="text-center bg-primary/10 text-primary py-1.5 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20">
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
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">Trust Badges Strip</h3>
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

          {/* USER STORIES */}
          {activeSubTab === 'userStories' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <h3 className="text-xl font-serif font-bold text-primary">User Stories</h3>
                <button 
                  onClick={() => setContent({...content, userStories: [...(content.userStories || []), { image: '', name: '', location: '', quote: '' }]})}
                  className="text-xs bg-primary text-secondary px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Story
                </button>
              </div>
              <div className="space-y-4">
                {(content.userStories || []).map((story, idx) => (
                  <div key={idx} className="border border-primary/10 p-4 rounded flex gap-4 bg-primary/5">
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
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">The Difference Section</h3>
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
                
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary pt-4 border-t border-primary/10">Feature Items</h4>
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

          {/* FOUNDER'S NOTE */}
          {activeSubTab === 'foundersNote' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b border-primary/10 pb-2">Founder's Note</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block">Founder Image</label>
                  <div className="aspect-[3/4] bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded">
                    {content.foundersNote?.image ? (
                      <img src={content.foundersNote.image} alt="Founder" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-primary/30" />
                    )}
                  </div>
                  <label className="block text-center bg-primary/10 text-primary py-2 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                    Upload Image
                    <input type="file" accept="image/*" className="hidden" 
                      onChange={(e) => handleImageUpload(e, (url) => setContent({...content, foundersNote: {...content.foundersNote, image: url}}))}
                    />
                  </label>
                </div>
                <div className="col-span-2 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Name</label>
                    <input type="text" value={content.foundersNote?.name || ''}
                      onChange={(e) => setContent({...content, foundersNote: {...content.foundersNote, name: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Title</label>
                    <input type="text" value={content.foundersNote?.title || ''}
                      onChange={(e) => setContent({...content, foundersNote: {...content.foundersNote, title: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Quote</label>
                    <input type="text" value={content.foundersNote?.quote || ''}
                      onChange={(e) => setContent({...content, foundersNote: {...content.foundersNote, quote: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/60 block mb-1">Main Text</label>
                    <textarea value={content.foundersNote?.text || ''}
                      onChange={(e) => setContent({...content, foundersNote: {...content.foundersNote, text: e.target.value}})}
                      className="w-full bg-secondary border border-primary/10 px-3 py-2 text-sm outline-none min-h-[150px]" 
                    />
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
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <h3 className="text-xl font-serif font-bold text-primary">Blog Section</h3>
                <button 
                  onClick={() => setContent({...content, blogSection: [...(content.blogSection || []), { image: '', title: '', date: '', excerpt: '', link: '#' }]})}
                  className="text-xs bg-primary text-secondary px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Post
                </button>
              </div>
              <div className="space-y-4">
                {(content.blogSection || []).map((blog, idx) => (
                  <div key={idx} className="border border-primary/10 p-4 rounded flex gap-4 bg-primary/5">
                    <div className="w-48 shrink-0 flex flex-col gap-2">
                      <div className="aspect-video bg-secondary border border-primary/10 flex items-center justify-center overflow-hidden rounded">
                        {blog.image ? (
                          <img src={blog.image} alt="Blog" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-primary/30" />
                        )}
                      </div>
                      <label className="text-center bg-primary/10 text-primary py-1.5 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 rounded">
                        Upload Image
                        <input type="file" accept="image/*" className="hidden" 
                          onChange={(e) => handleImageUpload(e, (url) => {
                            const newArr = [...content.blogSection];
                            newArr[idx].image = url;
                            setContent({...content, blogSection: newArr});
                          })}
                        />
                      </label>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Title</label>
                          <input type="text" value={blog.title} 
                            onChange={(e) => {
                              const newArr = [...content.blogSection];
                              newArr[idx].title = e.target.value;
                              setContent({...content, blogSection: newArr});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Date</label>
                          <input type="text" value={blog.date} 
                            onChange={(e) => {
                              const newArr = [...content.blogSection];
                              newArr[idx].date = e.target.value;
                              setContent({...content, blogSection: newArr});
                            }}
                            className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Excerpt</label>
                        <textarea value={blog.excerpt} 
                          onChange={(e) => {
                            const newArr = [...content.blogSection];
                            newArr[idx].excerpt = e.target.value;
                            setContent({...content, blogSection: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none min-h-[60px]" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 block mb-1">Link URL</label>
                        <input type="text" value={blog.link} 
                          onChange={(e) => {
                            const newArr = [...content.blogSection];
                            newArr[idx].link = e.target.value;
                            setContent({...content, blogSection: newArr});
                          }}
                          className="w-full bg-secondary border border-primary/10 px-3 py-1.5 text-xs outline-none" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newArr = [...content.blogSection];
                        newArr.splice(idx, 1);
                        setContent({...content, blogSection: newArr});
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
    </div>
  );
}
