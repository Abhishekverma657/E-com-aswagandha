import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Users, Sprout, Award, ShieldCheck, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function WelfareSociety() {
  const { content } = useContent();
  const ws = content?.welfareSociety;

  const heroTitle = ws?.heroTitle || 'The Nagauri Welfare Society';
  const heroSubtitle = ws?.heroSubtitle || 'Empowering traditional Ashwagandha cultivators of Nagaur, Rajasthan through fair livelihood, ethical farming, and holistic community development.';

  const defaultStats = [
    { value: '500+', label: 'Farmer Families' },
    { value: '100%', label: 'Fair Trade Direct' },
    { value: 'Zero', label: 'Middlemen Cut' },
    { value: 'GI Tag', label: 'Authentic Heritage' }
  ];

  const stats = ws?.stats?.length > 0 ? ws.stats : defaultStats;

  const defaultInitiatives = [
    {
      title: 'Sustainable Agro-Practices',
      description: 'We provide technical guidance on regenerative arid-zone cultivation, rainwater conservation, and organic certification, ensuring the high alkaloid potency of Nagori roots remains uncompromised.',
      iconName: 'Sprout'
    },
    {
      title: 'Direct Financial Security',
      description: 'By purchasing crops directly at guaranteed premium rates above wholesale market volatility, we ensure stable incomes, debt-free farming, and dignified livelihoods for generations.',
      iconName: 'Users'
    },
    {
      title: 'Community Healthcare & Education',
      description: 'A fixed share of profits supports mobile medical camps, primary health screenings, and scholarships for children of farming families in rural Nagaur belt.',
      iconName: 'HeartHandshake'
    }
  ];

  const initiatives = ws?.initiatives?.length > 0 ? ws.initiatives : defaultInitiatives;

  const defaultCommitments = [
    'Zero synthetic pesticides or chemicals in protected zones',
    'Fair on-spot digital payment directly into farmers\' bank accounts',
    'Preserving native GI Tag Rajasthan heritage root seeds',
    'Annual farmer recognition and excellence awards'
  ];

  const commitments = ws?.commitments?.length > 0 ? ws.commitments : defaultCommitments;

  return (
    <div className="bg-secondary min-h-screen pt-[215px] md:pt-[230px] pb-20 overflow-hidden font-sans">
      
      {/* Hero Header */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-2 md:pt-4 mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <HeartHandshake className="w-4 h-4 text-accent" /> Community & Farmer Welfare
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-primary font-bold mb-6 tracking-tight"
        >
          {heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-dark/75 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
        >
          {heroSubtitle}
        </motion.p>
      </section>

      {/* Key Metrics / Impact Strip */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-primary text-secondary p-8 rounded-2xl shadow-xl">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center p-4 border-r border-secondary/10 last:border-0">
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent mb-1">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-secondary/80 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Society Pillars */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">Our Core Welfare Initiatives</h2>
          <p className="text-gray-600 font-light text-sm md:text-base">
            How The Nagauri Welfare Society gives back directly to the guardians of India’s most potent Ayurvedic soil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((init, idx) => {
            const IconComp = LucideIcons[init.iconName] || LucideIcons.HeartHandshake;
            return (
              <div key={idx} className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#eef7ee] flex items-center justify-center text-primary mb-6">
                  <IconComp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-sans text-gray-900 mb-3">{init.title}</h3>
                <p className="text-gray-600 font-light text-sm leading-relaxed">{init.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Nagaur Origin Story */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-[#f0ece1] rounded-3xl p-8 md:p-14 border border-[#e2dccf] flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-3/5 space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-accent" /> Nagaur, Rajasthan • Heart of Ayurveda
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Honoring The Soil, <br />
              <span className="italic font-light text-primary">Empowering The Growers.</span>
            </h2>
            <p className="text-gray-700 font-light text-base leading-relaxed">
              Nagaur’s arid desert soil and alkaline minerals yield the world's most concentrated Ashwagandha roots. But the true strength lies in the hands that nurture them. The Nagauri Welfare Society is built on the pledge that as our brand expands globally, our local farming community grows with us.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/shop" 
                className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-lg transition-all inline-flex items-center gap-2 shadow-md"
              >
                Shop Farm-Direct Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/contact" 
                className="bg-white/80 hover:bg-white text-gray-800 text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-lg transition-all inline-flex items-center border border-gray-300"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-2/5 space-y-4 bg-white/60 p-6 rounded-2xl border border-white/60">
            <h4 className="font-serif font-bold text-lg text-primary border-b border-primary/10 pb-3">Society Commitments</h4>
            <ul className="space-y-3 font-sans text-sm text-gray-700">
              {commitments.map((com, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span>{com}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
