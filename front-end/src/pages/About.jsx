import { Award, Leaf, Shield, Landmark } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-secondary pt-24 pb-20">
      {/* Heritage Banner */}
      <div className="bg-primary text-secondary py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#FAF8F5_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-5"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold font-sans">Our Heritage</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-wide">The Soil of Nagaur</h1>
          <div className="w-16 h-[2px] bg-accent mx-auto"></div>
          <p className="text-lg opacity-85 leading-relaxed font-sans font-light">
            Ancient roots cultivated under Rajasthan's desert sun, harvested for modern stress relief.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 font-sans text-dark/80">
        <div className="space-y-12 leading-relaxed text-base font-light text-justify">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif font-bold text-primary">The Synergy of Nature & Soil</h2>
            <div className="w-10 h-px bg-accent mx-auto"></div>
          </div>
          
          <p>
            <strong>Nagouri Ashwagandha</strong> represents the geographic indication (GI-tagged) botanical heritage of Nagaur, Rajasthan. Here, the extreme desert climate (reaching over 40°C in summers) and nutrient-rich sandy loam soils force the ashwagandha plants to develop deep, thick roots packed with active adaptogenic alkaloids.
          </p>

          {/* G7 Highlight Banner */}
          <div className="bg-primary text-secondary p-8 rounded-sm shadow-md border border-accent/20 my-12 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-accent" />
              <h3 className="font-serif text-lg font-bold text-accent tracking-wider uppercase">Gifted to G7 World Leaders</h3>
            </div>
            <p className="text-sm opacity-90 leading-relaxed font-light font-sans">
              As a signal of national trust and Ayurvedic excellence, GI-tagged Nagouri Ashwagandha was selected by the Prime Minister of India as an official gift for G7 world leaders. Our network processed this exquisite harvest and handed it over to the Prime Minister's Office (PMO) for this prestigious presentation.
            </p>
          </div>
          
          <p>
            We are the premier certified producer, manufacturer, and supplier of authentic Nagouri Ashwagandha roots, powder, and clean extracts. By coordinating directly with our network of local farmers, we ensure complete crop traceability and fair-wage trade practices.
          </p>

          {/* Blockquote */}
          <div className="border-l-2 border-accent pl-6 py-2 my-10 italic text-primary text-lg font-serif font-medium bg-white shadow-xs p-6 pr-4 rounded-r-xs">
            "Authentic Nagouri Ashwagandha — Rooted in the sacred desert soils of Nagaur, preserved by traditional farmers, and presented to the global stage."
          </div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            <div className="bg-white p-8 border border-primary/5 rounded-sm shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-accent" />
                <h3 className="font-serif text-xl font-bold text-primary">GI-Tagged Origin</h3>
              </div>
              <p className="text-sm opacity-85 leading-relaxed font-light">
                We supply authentic geographical-origin roots directly from Nagaur. Each batch possesses the signature strong herbal aroma and dense root texture characteristic of Nagouri crops.
              </p>
            </div>
            
            <div className="bg-white p-8 border border-primary/5 rounded-sm shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-accent" />
                <h3 className="font-serif text-xl font-bold text-primary">Lab-Certified Purity</h3>
              </div>
              <p className="text-sm opacity-85 leading-relaxed font-light">
                Every mill run and capsule batch undergoes third-party NABL laboratory clearance to guarantee withanolide levels, clean heavy-metal reports, and zero filler materials.
              </p>
            </div>

            <div className="bg-white p-8 border border-primary/5 rounded-sm shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="font-serif text-xl font-bold text-primary">Ethical Farming</h3>
              </div>
              <p className="text-sm opacity-85 leading-relaxed font-light">
                Our collaborative partnership supports sustainable cultivation, helping local growers optimize crop yields while ensuring direct market access without exploitative middlemen.
              </p>
            </div>

            <div className="bg-white p-8 border border-primary/5 rounded-sm shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-3">
                <Landmark className="w-6 h-6 text-accent" />
                <h3 className="font-serif text-xl font-bold text-primary">Export-Ready Quality</h3>
              </div>
              <p className="text-sm opacity-85 leading-relaxed font-light">
                Meeting international phytosanitary guidelines, our bulk raw material is suitable for global export, wellness brands, and pharmaceutical manufacturers seeking authentic Indian adaptogens.
              </p>
            </div>
          </div>

          <div className="pt-12 text-center max-w-xl mx-auto space-y-5">
            <h3 className="font-serif text-2xl font-bold text-primary">Our Commitment</h3>
            <p className="text-sm leading-relaxed text-dark/75">
              Whether you are a consumer seeking stress relief, a manufacturer buying bulk, or an export partner, we promise traceability, purity, and transparency at every step.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
