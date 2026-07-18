import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');

  // Mock product data (in reality, fetch this by ID)
  const product = {
    id: id || "1",
    title: "Premium Ashwagandha Root Extract",
    price: 999.00,
    image: "/product-image.png",
    description: "Our premium Ashwagandha root extract is sustainably sourced and lab-tested for maximum potency. Known as an adaptogen, it helps your body manage stress, improves sleep quality, and boosts overall vitality.",
    benefits: [
      "Reduces cortisol levels and stress",
      "Improves sleep quality and duration",
      "Enhances focus and cognitive function",
      "Supports physical performance and endurance"
    ],
    ingredients: "100% Organic Ashwagandha (Withania somnifera) Root Extract (5% Withanolides). No artificial fillers or preservatives.",
    usage: "Take 1-2 capsules daily with water or warm milk, preferably after meals. Do not exceed the recommended dose.",
    shipping: "Free standard shipping on all orders over ₹1500. Expect delivery within 3-5 business days. 30-day money-back guarantee."
  };

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'inc') setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: Add a toast notification here
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="bg-secondary min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Product Image Gallery */}
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/5] bg-white flex items-center justify-center border border-primary/10 overflow-hidden shadow-sm">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover animate-fade-in" />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6 text-primary leading-tight">{product.title}</h1>
            <p className="text-3xl text-accent mb-8 font-light">₹ {product.price.toFixed(2)}</p>
            
            <div className="mb-8 opacity-80 leading-relaxed font-light">
              <p>{product.description}</p>
            </div>

            <div className="mb-10">
              <h3 className="font-serif text-xl mb-4 text-primary border-b border-primary/10 pb-2">Key Benefits</h3>
              <ul className="space-y-2 opacity-80 font-light">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-primary/20 bg-white">
                <button onClick={() => handleQuantity('dec')} className="px-5 py-4 hover:bg-primary/5 transition-colors text-xl">-</button>
                <span className="px-6 py-4 font-medium min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="px-5 py-4 hover:bg-primary/5 transition-colors text-xl">+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-secondary font-bold py-4 px-8 uppercase tracking-[0.2em] text-sm hover:bg-accent transition-colors"
              >
                Add to Cart
              </button>
            </div>
            
            <button 
              onClick={handleBuyNow}
              className="w-full bg-accent text-primary font-bold py-4 px-8 uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-secondary transition-colors mb-12 shadow-md"
            >
              Buy It Now
            </button>

            {/* Tabs */}
            <div className="border-t border-primary/20 pt-6">
              <div className="flex space-x-8 mb-6 font-serif text-lg border-b border-primary/10">
                <button 
                  className={`pb-2 ${activeTab === 'ingredients' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('ingredients')}
                >Ingredients</button>
                <button 
                  className={`pb-2 ${activeTab === 'usage' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('usage')}
                >How to Use</button>
                <button 
                  className={`pb-2 ${activeTab === 'shipping' ? 'text-accent border-b-2 border-accent' : 'text-primary/60 hover:text-primary'}`}
                  onClick={() => setActiveTab('shipping')}
                >Shipping</button>
              </div>
              
              <div className="opacity-80 font-light text-sm leading-relaxed min-h-[100px] animate-fade-in">
                {activeTab === 'ingredients' && <p>{product.ingredients}</p>}
                {activeTab === 'usage' && <p>{product.usage}</p>}
                {activeTab === 'shipping' && <p>{product.shipping}</p>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
