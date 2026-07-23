import { Beaker, Leaf, FlaskConical, ShieldBan, Sparkles } from 'lucide-react';

export default function TrustBanner() {
  const features = [
    { icon: <FlaskConical className="w-6 h-6 text-white" />, title: "3rd Party Lab Tested" },
    { icon: <Leaf className="w-6 h-6 text-white" />, title: "100% Vegetarian" },
    { icon: <Beaker className="w-6 h-6 text-white" />, title: "Clinically Studied Ingredients" },
    { icon: <ShieldBan className="w-6 h-6 text-white" />, title: "No Unnecessary Additives" },
    { icon: <Sparkles className="w-6 h-6 text-white" />, title: "Built for Real Results" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 bg-white relative">
      <div className="max-w-[1200px] mx-auto bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-xl overflow-hidden shadow-2xl py-16 px-6 md:px-12 text-center">
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-sans tracking-tight mb-4">
          <span className="font-light">This is How</span> <strong className="font-bold">Supplements Should Be</strong>
        </h2>
        
        <p className="text-white/80 font-sans font-light text-sm md:text-base max-w-2xl mx-auto mb-16">
          No confusion, no overthinking - just something that fits into your routine and works with your body
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-inner backdrop-blur-sm">
                {feature.icon}
              </div>
              <h4 className="text-white font-sans text-sm font-medium max-w-[120px]">
                {feature.title}
              </h4>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-white font-sans font-bold text-sm tracking-wider uppercase">
            Still Not Sure What's Right For You?
          </p>
          <p className="text-white/80 font-sans font-light mb-6">
            We'll help you figure it out
          </p>
          <button className="bg-white hover:bg-gray-100 text-[#1e293b] font-sans font-bold text-[13px] px-8 py-3.5 rounded-md transition-colors shadow-lg">
            Consult a Nutritionist
          </button>
        </div>

      </div>
    </section>
  );
}
