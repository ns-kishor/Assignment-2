import React from 'react';
import { ArrowRight, Film, Search, Star, ShieldCheck, Database } from 'lucide-react';

interface HeroBannerProps {
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#090a0d] py-20 sm:py-28 lg:py-32">
      {/* High-Resolution Cinematic Film Atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity filter blur-xs"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=2400&q=80')`
        }}
        aria-hidden="true"
      />
      
      {/* Editorial Vignette & Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#090a0d] via-[#090a0d]/60 to-[#090a0d]" />
      
      {/* Subtle Warm Amber Glow Behind Header */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content strictly adhering to wireframe specifications */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Curated Directory Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-zinc-900/80 px-3.5 py-1.5 text-[11px] font-medium text-zinc-300 backdrop-blur-md mb-8">
          <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span>Curated Television & Cinema Catalog</span>
        </div>

        {/* Wireframe Heading: DISCOVER MOVIES */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white">
          DISCOVER <span className="text-zinc-100 underline decoration-amber-400/60 decoration-4 underline-offset-8">MOVIES</span>
        </h1>

        {/* Wireframe Engaging Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
          Explore and discover your favorite movies and shows from around the world. Search comprehensive titles with verified ratings, release schedules, and deep plot overviews.
        </p>

        {/* Wireframe CTA: [ Explore Now ] */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="hero-cta-explore"
            onClick={onExplore}
            className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-md transition-all hover:bg-zinc-200 active:scale-98 cursor-pointer"
          >
            <Film className="h-4 w-4 text-zinc-900" />
            <span>Explore Now</span>
            <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            id="hero-secondary-search"
            onClick={onExplore}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-zinc-900/60 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white active:scale-98 cursor-pointer"
          >
            <Search className="h-4 w-4 text-zinc-400" />
            <span>Search by Title</span>
          </button>
        </div>

        {/* Professional Metric / Trust Strip */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/[0.06] pt-8 text-left">
          <div className="flex items-start gap-3 rounded-xl p-3 bg-zinc-900/20 border border-white/[0.03]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.08] text-amber-400">
              <Star className="h-4 w-4 fill-amber-400/20" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-200">Verified Ratings</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Audience & critic score aggregation</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl p-3 bg-zinc-900/20 border border-white/[0.03]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-200">Thousands of Titles</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Global networks, cast & schedules</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl p-3 bg-zinc-900/20 border border-white/[0.03]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-200">Open Public API</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">Real-time TVMaze data integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
