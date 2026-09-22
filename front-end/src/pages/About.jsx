import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Award, HeartHandshake, Beaker, Sprout, Target, Eye, Compass, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

export default function About() {
  const { content } = useContent();

  const aboutUs = content?.aboutUs;
  const heroTitle = aboutUs?.heroTitle || 'About Nagori Ayurveda';
  const heroSubtitle = aboutUs?.heroSubtitle || 'Purity, Science & Authentic Ayurvedic Heritage';
  const companyOverview = aboutUs?.companyOverview || 'Nagori Ayurveda was founded with a singular purpose: to deliver the purest, single-origin Ayurvedic botanicals directly from the fertile, arid soils of Nagaur, Rajasthan. We bridge ancient Vedic wisdom with modern clinical validation.';
  const mission = aboutUs?.mission || 'To bridge traditional Vedic wisdom with modern clinical validation, creating uncompromising botanical formulations you can trust daily.';
  const vision = aboutUs?.vision || 'To become the global gold standard for single-origin, high-potency Ayurvedic nutrition.';

  const defaultDirectors = [
    {
      name: 'Parul Choudhary',
      title: 'Director, Nagori',
      quote: 'Purity, Science & Authentic Ayurvedic Heritage',
      bio: 'At Nagori Ayurveda, our vision is to provide uncompromised purity and clinically validated potency. Sourced directly from the arid, nutrient-rich soils of Nagaur, Rajasthan, every batch is crafted to honor traditional Ayurvedic wisdom while meeting the strictest modern quality benchmarks.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'Manak Choudhary',
      title: 'Director, Nagori',
      quote: 'From Frustration to True Formulation',
      bio: 'Growing up in Rajasthan, we saw firsthand the remarkable potency of indigenous Nagori Ashwagandha. But looking at the modern market, we realized most commercial supplements were heavily processed, diluted, or sourced from compromised soils. We established Nagori with a singular mission: to deliver single-origin, high-withanolide Ayurvedic formulations you can take with total confidence every single day.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  const directors = aboutUs?.directors?.length > 0 ? aboutUs.directors : defaultDirectors;

  const defaultValues = [
    {
      title: 'Soil-to-Shelf Transparency',
      description: 'Every root is ethically harvested in Nagaur and third-party tested with verifiable batch COAs.',
      iconName: 'CheckCircle2'
    },
    {
      title: 'Clinically Effective Doses',
      description: 'Standardized to maximum active alkaloids and withanolides without artificial fillers or shortcuts.',
      iconName: 'Beaker'
    },
    {
      title: 'Community First',
      description: 'A portion of proceeds directly benefits The Nagauri Welfare Society for local farmer upliftment.',
      iconName: 'HeartHandshake'
    }
  ];

  const values = aboutUs?.values?.length > 0 ? aboutUs.values : defaultValues;

  return (
    <div className="bg-secondary min-h-screen pt-[215px] md:pt-[230px] pb-24 overflow-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-2 md:pt-4 mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <Compass className="w-4 h-4 text-accent" /> Company Overview
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

      {/* 2. OVERVIEW & PHILOSOPHY */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-primary/10 shadow-sm text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {companyOverview}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link 
              to="/our-story" 
              className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-all inline-flex items-center gap-2 shadow-md"
            >
              Read Full Origin Story <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/welfare-society" 
              className="bg-[#ebe6d8] hover:bg-[#ded8c6] text-gray-800 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-all inline-flex items-center"
            >
              Welfare Society
            </Link>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION DUAL CARDS */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-primary text-secondary p-8 md:p-12 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-accent mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-accent mb-2">Our Purpose</h3>
              <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
              <p className="text-secondary/80 font-light text-base md:text-lg leading-relaxed">
                {mission}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#1f382a] text-secondary p-8 md:p-12 rounded-2xl shadow-xl flex flex-col justify-between border border-white/5">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-accent mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xs uppercase font-bold tracking-widest text-accent mb-2">Looking Ahead</h3>
              <h2 className="text-3xl font-serif font-bold mb-4">Our Vision</h2>
              <p className="text-secondary/80 font-light text-base md:text-lg leading-relaxed">
                {vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP / DIRECTORS */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-3">Our Leadership</h2>
          <p className="text-gray-600 font-light text-sm md:text-base">
            Guiding Nagori Ayurveda with vision, integrity, and deep reverence for Rajasthani botanical traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {directors.map((dir, idx) => (
            <div key={idx} className="bg-white/80 rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
              <div className="h-72 w-full overflow-hidden bg-[#e8e4d8] relative">
                <img 
                  src={dir.image || defaultDirectors[idx % defaultDirectors.length].image} 
                  alt={dir.name} 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow">
                  Director
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{dir.name}</h3>
                  <p className="text-xs uppercase font-bold tracking-wider text-accent mb-3">{dir.title || 'Director, Nagori'}</p>
                  {dir.quote && (
                    <p className="text-xs font-serif italic text-primary/90 font-medium mb-3 border-l-2 border-accent pl-3">
                      "{dir.quote}"
                    </p>
                  )}
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{dir.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CORE VALUES */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">Our Guiding Values</h2>
          <p className="text-gray-600 font-light text-sm md:text-base">
            The non-negotiable principles that shape every bottle, every extract, and every partnership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const IconComp = LucideIcons[val.iconName] || LucideIcons.CheckCircle2;
            return (
              <div key={idx} className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <IconComp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold font-sans text-gray-900 mb-3">{val.title}</h3>
                <p className="text-gray-600 font-light text-sm leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
