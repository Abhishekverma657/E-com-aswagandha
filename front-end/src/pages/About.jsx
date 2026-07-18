export default function About() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Banner */}
      <div className="bg-primary text-secondary py-20 text-center px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Our Story</h1>
          <p className="text-lg opacity-90">
            Rooted in ancient wisdom, crafted for modern lives.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg mx-auto text-primary">
          <h2 className="text-3xl font-serif mb-6 text-center text-accent">The Alchemy of Nature</h2>
          
          <p className="mb-6 opacity-80 leading-relaxed text-justify">
            DesiAlchemist was born out of a profound respect for Ayurveda and a desire to bring its potent, natural healing capabilities to the modern world. We believe that true wellness is an alchemy—a delicate balance of mind, body, and spirit, nurtured by the earth's purest ingredients.
          </p>
          
          <p className="mb-10 opacity-80 leading-relaxed text-justify">
            Our journey began when we realized how difficult it was to find authentic, unadulterated Ayurvedic supplements that hadn't been compromised by mass production. We set out to change that by partnering directly with organic farmers across India who cultivate herbs using traditional, sustainable methods.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
            <div className="bg-white p-8 border border-primary/10 text-center">
              <h3 className="font-serif text-xl text-accent mb-4">Purity Promised</h3>
              <p className="opacity-80 text-sm leading-relaxed">
                Every ingredient is rigorously tested in independent labs to ensure it is free from heavy metals, pesticides, and artificial fillers. We only deliver the essence of the herb, exactly as nature intended.
              </p>
            </div>
            <div className="bg-white p-8 border border-primary/10 text-center">
              <h3 className="font-serif text-xl text-accent mb-4">Sustainable Sourcing</h3>
              <p className="opacity-80 text-sm leading-relaxed">
                We are committed to ethical harvesting practices that protect our environment and support the livelihoods of the local farming communities who have preserved these botanical traditions for generations.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-serif mb-6 text-center text-accent mt-16">Our Mission</h2>
          <p className="mb-6 opacity-80 leading-relaxed text-center">
            To empower you to take control of your health through the transformative power of genuine Ayurveda, helping you build resilience, vitality, and inner peace in a demanding world.
          </p>
          
        </div>
      </div>
    </div>
  );
}
