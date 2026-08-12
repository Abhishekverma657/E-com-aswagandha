import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, Save, Plus, Trash2, ArrowLeft, Loader2, Package, Clipboard, ListTree, Settings } from 'lucide-react';

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const isAuthorized = user && user.role === 'admin';
  
  const isEditing = id && id !== 'new';

  const [savingProduct, setSavingProduct] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    originalPrice: '',
    image: '/vitality-gummies.png',
    imageFile: null,
    imageName: '',
    category: 'Ashwagandha',
    description: '',
    benefitsInput: '',
    ingredients: '',
    usage: '',
    sourcing: '',
    codAvailable: true,
    stockQuantity: 0,
    offerText: 'Flat 5% OFF on Prepaid Orders',
    estimatedDelivery: '2-3 Days',
    images: [],
    additionalImageFiles: [],
    packs: []
  });

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/admin');
      return;
    }

    if (isEditing) {
      fetch(`/api/products/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then(product => {
          setProductForm({
            title: product.title,
            price: product.price,
            originalPrice: product.originalPrice || '',
            image: product.image,
            imageFile: null,
            imageName: '',
            category: product.category,
            description: product.description,
            benefitsInput: product.benefits ? product.benefits.join(', ') : '',
            ingredients: product.ingredients || '',
            usage: product.usage || '',
            sourcing: product.sourcing || '',
            codAvailable: product.codAvailable !== false,
            stockQuantity: product.stockQuantity || 0,
            offerText: product.offerText || 'Flat 5% OFF on Prepaid Orders',
            estimatedDelivery: product.estimatedDelivery || '2-3 Days',
            images: product.images || [],
            additionalImageFiles: [],
            packs: product.packs || []
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          alert(err.message);
          navigate('/admin');
        });
    }
  }, [id, isEditing, isAuthorized, navigate]);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm(prev => ({
        ...prev,
        imageFile: reader.result,
        imageName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm(prev => ({
          ...prev,
          additionalImageFiles: [
            ...prev.additionalImageFiles, 
            { file: reader.result, name: file.name }
          ]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImageFile = (index) => {
    setProductForm(prev => ({
      ...prev,
      additionalImageFiles: prev.additionalImageFiles.filter((_, i) => i !== index)
    }));
  };

  const removeExistingImage = (index) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addPack = () => {
    setProductForm(prev => ({
      ...prev,
      packs: [...prev.packs, { name: '', subtitle: '', price: '', originalPrice: '', stockQuantity: '', isRecommended: false }]
    }));
  };

  const handleRemovePack = (index) => {
    setProductForm(prev => ({
      ...prev,
      packs: prev.packs.filter((_, i) => i !== index)
    }));
  };

  const updatePack = (index, field, value) => {
    setProductForm(prev => {
      const newPacks = [...prev.packs];
      newPacks[index][field] = value;
      return { ...prev, packs: newPacks };
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSavingProduct(true);

    const payload = {
      ...productForm,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : null,
      benefits: productForm.benefitsInput.split(',').map(b => b.trim()).filter(Boolean),
      codAvailable: productForm.codAvailable,
      stockQuantity: parseInt(productForm.stockQuantity) || 0,
      offerText: productForm.offerText,
      estimatedDelivery: productForm.estimatedDelivery,
      images: productForm.images,
      additionalImageFiles: productForm.additionalImageFiles,
      packs: productForm.packs.map(p => ({
        name: p.name,
        subtitle: p.subtitle,
        price: parseInt(p.price),
        originalPrice: p.originalPrice ? parseInt(p.originalPrice) : null,
        stockQuantity: parseInt(p.stockQuantity) || 0,
        isRecommended: p.isRecommended || false
      }))
    };

    const url = isEditing
      ? `/api/admin/products/${id}`
      : '/api/admin/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      navigate('/admin');
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSavingProduct(false);
    }
  };

  if (!isAuthorized) return null;

  if (loading) {
    return (
      <div className="bg-secondary min-h-screen pt-[140px] pb-24 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen flex text-left font-sans text-sm text-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-secondary flex flex-col fixed h-full z-10 shadow-lg">
        <div className="p-6 border-b border-secondary/10 flex items-center justify-between">
          <Link to="/" className="text-xl font-serif font-bold text-accent tracking-widest uppercase">Nagouri</Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2">
          <button 
            onClick={() => navigate('/admin', { state: { activeTab: 'inventory' } })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer bg-accent text-primary"
          >
            <Package className="w-4 h-4" /> Inventory
          </button>
          <button 
            onClick={() => navigate('/admin', { state: { activeTab: 'orders' } })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer text-secondary/70 hover:text-secondary hover:bg-secondary/5"
          >
            <Clipboard className="w-4 h-4" /> Orders
          </button>
          <button 
            onClick={() => navigate('/admin', { state: { activeTab: 'categories' } })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer text-secondary/70 hover:text-secondary hover:bg-secondary/5"
          >
            <ListTree className="w-4 h-4" /> Categories
          </button>
          <button 
            onClick={() => navigate('/admin', { state: { activeTab: 'settings' } })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold cursor-pointer text-secondary/70 hover:text-secondary hover:bg-secondary/5"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>

        <div className="p-4 border-t border-secondary/10">
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xs transition-all text-xs uppercase tracking-widest font-bold text-secondary/70 hover:text-red-400 hover:bg-secondary/5 cursor-pointer"
          >
             Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 md:p-12 min-h-screen">
        <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-primary hover:text-accent font-bold uppercase tracking-widest text-xs mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="bg-secondary border border-primary/10 shadow-xl rounded-sm w-full animate-fade-in relative mb-10">
          <div className="sticky top-0 bg-secondary px-8 py-6 border-b border-primary/10 flex justify-between items-center z-10 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-primary">
              {!isEditing ? 'Create New Formulation' : 'Modify Formulation'}
            </h3>
          </div>

          <div className="p-8">
            <form onSubmit={handleProductSubmit} className="space-y-8 text-xs font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Product Title</label>
                  <input 
                    type="text" 
                    value={productForm.title}
                    onChange={(e) => setProductForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Pure Himalayan Shilajit Gold Resin"
                    className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Category Segment</label>
                  <select 
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs appearance-none"
                    required
                  >
                    <option value="Ashwagandha">Ashwagandha</option>
                    <option value="Shilajit">Shilajit</option>
                    <option value="Combos">Combos</option>
                    <option value="Wellness">Wellness</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-primary/5 py-8">
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Default Sale Price (₹)</label>
                  <input 
                    type="number" 
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="1499"
                    className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Original Price (₹)</label>
                  <input 
                    type="number" 
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="2199"
                    className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Base Stock Quantity</label>
                  <input 
                    type="number" 
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm(prev => ({ ...prev, stockQuantity: e.target.value }))}
                    placeholder="100"
                    className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs" 
                    required 
                  />
                </div>
              </div>

              {/* Pack Section */}
              <div className="bg-[#fcfdfa] border border-primary/10 p-6 rounded-sm shadow-xs relative">
                <div className="flex justify-between items-center mb-6 border-b border-primary/10 pb-4">
                  <h4 className="font-serif text-lg font-bold text-primary tracking-wide">PACK VARIANTS (OPTIONAL)</h4>
                  <button 
                    type="button" 
                    onClick={addPack}
                    className="bg-[#24524c] hover:bg-[#1a3c37] text-white p-2 rounded-xs transition-colors flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Pack
                  </button>
                </div>
                
                {productForm.packs.length === 0 ? (
                  <p className="text-xs text-dark/50 italic">No packs added. The default price and stock above will be used.</p>
                ) : (
                  <div className="space-y-4">
                    {productForm.packs.map((pack, index) => (
                      <div key={index} className="flex flex-wrap items-end gap-4 p-4 border border-primary/10 bg-white rounded-xs shadow-xs relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform origin-left transition-transform scale-x-0 group-hover:scale-x-100"></div>
                        <div className="space-y-1.5 flex-[1.5] min-w-[150px]">
                          <label className="font-bold text-[9px] uppercase tracking-wider text-dark/70">Pack Name</label>
                          <input 
                            type="text" 
                            value={pack.name}
                            onChange={(e) => updatePack(index, 'name', e.target.value)}
                            placeholder="Pack Name (e.g. Pack of 1)"
                            className="w-full border border-primary/10 bg-secondary/15 p-2 focus:outline-none focus:border-accent text-primary font-medium rounded-xs text-[11px]" 
                            required
                          />
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-[150px]">
                          <label className="font-bold text-[9px] uppercase tracking-wider text-dark/70">Subtitle</label>
                          <input 
                            type="text" 
                            value={pack.subtitle || ''}
                            onChange={(e) => updatePack(index, 'subtitle', e.target.value)}
                            placeholder="Details (e.g. 60 Tablets)"
                            className="w-full border border-primary/10 bg-secondary/15 p-2 focus:outline-none focus:border-accent text-primary font-medium rounded-xs text-[11px]" 
                          />
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-[100px]">
                          <label className="font-bold text-[9px] uppercase tracking-wider text-dark/70">Sale Price</label>
                          <input 
                            type="number" 
                            value={pack.price}
                            onChange={(e) => updatePack(index, 'price', e.target.value)}
                            placeholder="1499"
                            className="w-full border border-primary/10 bg-secondary/15 p-2 focus:outline-none focus:border-accent text-primary font-medium rounded-xs text-[11px]" 
                            required
                          />
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-[100px]">
                          <label className="font-bold text-[9px] uppercase tracking-wider text-dark/70">Orig. Price</label>
                          <input 
                            type="number" 
                            value={pack.originalPrice}
                            onChange={(e) => updatePack(index, 'originalPrice', e.target.value)}
                            placeholder="2199"
                            className="w-full border border-primary/10 bg-secondary/15 p-2 focus:outline-none focus:border-accent text-primary font-medium rounded-xs text-[11px]" 
                          />
                        </div>
                        <div className="space-y-1.5 flex-[0.5] min-w-[80px]">
                          <label className="font-bold text-[9px] uppercase tracking-wider text-dark/70">Stock</label>
                          <input 
                            type="number" 
                            value={pack.stockQuantity}
                            onChange={(e) => updatePack(index, 'stockQuantity', e.target.value)}
                            placeholder="50"
                            className="w-full border border-primary/10 bg-secondary/15 p-2 focus:outline-none focus:border-accent text-primary font-medium rounded-xs text-[11px]" 
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-5 min-w-[100px]">
                          <input 
                            type="checkbox"
                            checked={pack.isRecommended || false}
                            onChange={(e) => updatePack(index, 'isRecommended', e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <label className="text-[9px] font-bold text-dark/80 uppercase tracking-wider cursor-pointer">Default/Popular</label>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handleRemovePack(index)}
                          className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-xs transition-colors mb-[1px]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-primary/5 py-8">
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Primary Image</label>
                  <div className="flex items-center gap-4">
                    {productForm.imageFile ? (
                      <img src={productForm.imageFile} alt="Preview" className="w-24 h-24 object-cover border border-primary/20 rounded shadow-md" />
                    ) : productForm.image ? (
                      <img src={productForm.image} alt="Current" className="w-24 h-24 object-cover border border-primary/20 rounded shadow-md" />
                    ) : null}
                    <div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="text-xs text-primary/80 file:mr-4 file:py-2.5 file:px-6 file:rounded-xs file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-primary/5 file:text-primary hover:file:bg-primary hover:file:text-white transition-all cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Gallery Images (Multiple)</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                        className="text-xs text-primary/80 file:mr-3 file:py-2.5 file:px-4 file:rounded-xs file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-accent/15 file:text-accent hover:file:bg-accent hover:file:text-primary transition-all cursor-pointer w-full"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {productForm.images.map((img, i) => (
                        <div key={`existing-${i}`} className="relative group">
                          <img src={img} alt={`Gallery ${i}`} className="w-16 h-16 object-cover rounded border border-primary/10" />
                          <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-110">×</button>
                        </div>
                      ))}
                      {productForm.additionalImageFiles.map((fileObj, i) => (
                        <div key={`new-${i}`} className="relative group">
                          <img src={fileObj.file} alt={fileObj.name} className="w-16 h-16 object-cover rounded border border-primary/10" />
                          <button type="button" onClick={() => removeAdditionalImageFile(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-110">×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold uppercase tracking-wider block">Benefits Summary (Comma-separated)</label>
                <input 
                  type="text" 
                  value={productForm.benefitsInput}
                  onChange={(e) => setProductForm(prev => ({ ...prev, benefitsInput: e.target.value }))}
                  placeholder="Lowers Cortisol, Supports sleep, Boosts stamina"
                  className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs" 
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold uppercase tracking-wider block">Description</label>
                <textarea 
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed sourcing explanation and benefits of this formulation..."
                  rows="4"
                  className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs resize-none" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Ingredients Specification</label>
                  <textarea 
                    value={productForm.ingredients}
                    onChange={(e) => setProductForm(prev => ({ ...prev, ingredients: e.target.value }))}
                    placeholder="100% pure standardized Withanolides..."
                    rows="2"
                    className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs resize-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Usage Recommendation</label>
                  <textarea 
                    value={productForm.usage}
                    onChange={(e) => setProductForm(prev => ({ ...prev, usage: e.target.value }))}
                    placeholder="Take 1 capsule twice daily..."
                    rows="2"
                    className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs resize-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold uppercase tracking-wider block">Sourcing Location details</label>
                  <textarea 
                    value={productForm.sourcing}
                    onChange={(e) => setProductForm(prev => ({ ...prev, sourcing: e.target.value }))}
                    placeholder="Directly harvested from dry soils of Nagaur, Rajasthan..."
                    rows="2"
                    className="w-full border border-primary/10 bg-secondary/15 p-3.5 focus:outline-none focus:border-accent focus:bg-secondary transition-all text-primary font-medium rounded-xs resize-none" 
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-4 border border-primary/10 rounded-xs bg-secondary/15 hover:bg-secondary/25 transition-colors w-fit">
                <input 
                  type="checkbox" 
                  checked={productForm.codAvailable}
                  onChange={(e) => setProductForm(prev => ({ ...prev, codAvailable: e.target.checked }))}
                  className="w-4 h-4 cursor-pointer accent-accent"
                />
                <span className="font-bold uppercase tracking-wider text-primary">Allow Cash on Delivery (COD) for this formula</span>
              </label>

              <div className="flex gap-4">
                <button 
                  type="submit" 
                  disabled={savingProduct}
                  className="bg-primary text-secondary hover:bg-primary-light font-bold py-3.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {savingProduct ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Save className="w-4 h-4 text-accent" />}
                  <span>{!isEditing ? 'Publish Formula' : 'Update Formula'}</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/admin')}
                  className="bg-secondary border border-primary/10 hover:border-accent text-primary font-bold py-3.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
