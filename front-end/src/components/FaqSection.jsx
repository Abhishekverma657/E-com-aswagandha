import { useState } from 'react';
import { Phone, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState('General');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const tabs = ['General', 'Delivery & Returns', 'Usage & Safety'];

  const questions = [
    { id: 1, q: "Do I Need Supplements If I Eat A Normal Diet?", a: "While a balanced diet is ideal, our modern food sources often lack essential trace minerals. Supplements help bridge that gap, especially for targeted needs like stress management or high-performance recovery." },
    { id: 2, q: "What Makes Nagouri Different From Others?", a: "Nagouri focuses on standardized extracts, ensuring you get clinically effective doses of active compounds like withanolides in Ashwagandha, unlike mass-market raw powders." },
    { id: 3, q: "How Do I Know Which Supplement Is Right For Me?", a: "It depends on your goals. For stress and sleep, Ashwagandha KSM-66 is ideal. For energy and stamina, Testoboost or Shilajit is recommended." },
    { id: 4, q: "Do Your Supplements Contain Artificial Colors, Flavors Or Preservatives?", a: "No, our supplements are 100% vegetarian and free from unnecessary additives, fillers, or artificial preservatives." },
    { id: 5, q: "Do I Need A Doctor's Prescription To Use Nagouri Supplements?", a: "No prescription is required as these are dietary supplements, but we always recommend consulting a physician if you have existing health conditions." },
    { id: 6, q: "Are Nagouri Supplements Approved By Any Authority?", a: "Yes, our products are Ayush Department licensed and rigorously tested in NABL-accredited laboratories." }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Content - FAQ List */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-gray-400"></div>
            <span className="text-[11px] font-sans font-bold text-gray-600 tracking-[0.2em] uppercase">Frequently Asked Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] tracking-tight mb-4">
            <span className="font-sans font-light text-gray-500">Questions</span> <strong className="font-sans font-bold">we hear</strong><br/>
            <strong className="font-sans font-bold">often</strong>
          </h2>
          <p className="text-gray-600 font-sans font-light text-[15px] mb-8">
            Whatever you're wondering, we make sure <strong className="font-bold text-gray-900">you feel heard and understood</strong>
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-[13px] font-sans transition-colors ${
                  activeTab === tab 
                    ? 'bg-primary text-white font-bold' 
                    : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400 font-medium'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Questions List */}
          <div className="space-y-0">
            {questions.map((item) => (
              <div 
                key={item.id} 
                className="border-b border-gray-200"
              >
                <button 
                  onClick={() => setSelectedQuestion(item)}
                  className={`w-full flex items-center py-5 text-left transition-colors font-sans text-[15px] pr-8 ${
                    selectedQuestion?.id === item.id ? 'text-primary font-bold' : 'text-gray-600 font-light hover:text-gray-900'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full mr-4 flex-shrink-0 transition-colors ${
                    selectedQuestion?.id === item.id ? 'bg-primary' : 'bg-gray-300 group-hover:bg-gray-400'
                  }`}></div>
                  {item.q}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Chat UI */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[500px] bg-[#e9e3d5] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[550px]">
            
            {/* Chat Header */}
            <div className="bg-[#1a3626] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-[#1a3626] font-bold text-xs font-serif italic">N</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold font-sans text-sm">Nagouri Support</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-[#22c55e] rounded-full"></span>
                    <span className="text-white/70 text-[11px] font-sans font-light">Online - Typically replies instantly</span>
                  </div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
              <div className="flex justify-center">
                <span className="bg-white/60 text-gray-500 text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Today
                </span>
              </div>
              
              {/* Default Message */}
              <div className="flex gap-3 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                  <span className="text-[#1a3626] font-bold text-[10px] font-serif italic">N</span>
                </div>
                <div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm relative">
                    <span className="text-[10px] font-bold text-[#1a3626] absolute -top-5 left-1">Nagouri</span>
                    <p className="text-gray-800 text-sm font-sans font-light leading-relaxed">
                      Hey 👋 Tap a question, and the answer will appear below 👇
                    </p>
                  </div>
                  <div className="text-[9px] text-gray-500 text-right mt-1">
                    10:31 AM <span className="text-gray-400">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Answer Message */}
              {selectedQuestion && (
                <div className="flex gap-3 max-w-[90%] animate-fade-in-up">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                    <span className="text-[#1a3626] font-bold text-[10px] font-serif italic">N</span>
                  </div>
                  <div>
                    <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm relative">
                      <span className="text-[10px] font-bold text-[#1a3626] absolute -top-5 left-1">Nagouri</span>
                      <p className="text-gray-800 text-sm font-sans font-medium mb-2 border-b border-gray-100 pb-2">
                        {selectedQuestion.q}
                      </p>
                      <p className="text-gray-700 text-sm font-sans font-light leading-relaxed">
                        {selectedQuestion.a}
                      </p>
                    </div>
                    <div className="text-[9px] text-gray-500 text-right mt-1">
                      Just now <span className="text-blue-500">✓✓</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white/50 border-t border-gray-200/50">
              <div className="bg-white h-12 rounded-full shadow-sm border border-gray-200 flex items-center px-2">
                <input 
                  type="text" 
                  placeholder="Type your question..." 
                  className="flex-1 bg-transparent px-4 outline-none text-sm font-sans font-light text-gray-700"
                  readOnly
                />
                <button className="w-10 h-10 rounded-full bg-[#1a3626] flex items-center justify-center flex-shrink-0 hover:bg-[#12261a] transition-colors">
                  <Send className="w-4 h-4 text-white -ml-0.5 mt-0.5" />
                </button>
              </div>
            </div>
            
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-[13px] font-sans">
              Still have questions? <Link to="/contact" className="text-gray-900 font-bold hover:underline ml-1 inline-flex items-center">Talk to our team <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
