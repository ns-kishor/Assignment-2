import React, { useEffect, useState } from 'react';
import { ArrowRight, Film, Loader2, Star, Shield, Clock } from 'lucide-react';
import { Show } from '../types';
import { HeroBanner } from './HeroBanner';
import { MovieCard } from './MovieCard';
import { fetchAllShows } from '../services/tvmazeApi';

interface HomePageProps {
  onNavigateToMovies: () => void;
  onSelectMovie: (show: Show) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToMovies,
  onSelectMovie,
}) => {
  const [topShows, setTopShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadFeatured() {
      try {
        const all = await fetchAllShows();
        if (!isCancelled) {
          // Sort by highest rating and take top 8
          const sorted = [...all]
            .filter((s) => s.rating?.average && s.rating.average >= 7.5 && s.image?.medium)
            .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
            .slice(0, 8);
          
          setTopShows(sorted.length > 0 ? sorted : all.slice(0, 8));
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error loading featured shows on home:', err);
          setIsLoading(false);
        }
      }
    }

    loadFeatured();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#090a0d]">
      {/* 1. Hero Banner Component matching exact Wireframe */}
      <HeroBanner onExplore={onNavigateToMovies} />

      {/* 2. Top-Rated & Trending Spotlight Preview Section */}
      <section className="py-16 sm:py-20 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span>Featured Selections</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Top Rated Shows & Movies
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-xl">
                Consistently acclaimed titles based on global broadcast network metrics and audience reviews.
              </p>
            </div>

            <button
              id="home-view-all-movies-btn"
              onClick={onNavigateToMovies}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Loading or Grid of top picks */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-400 mb-2.5" />
              <p className="text-xs">Loading featured titles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {topShows.map((show) => (
                <MovieCard
                  key={show.id}
                  show={show}
                  onSelect={onSelectMovie}
                />
              ))}
            </div>
          )}

          {/* Clean Explore Card */}
          <div className="mt-14 rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Looking for a specific title or genre?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
                Search through thousands of television shows, dramas, comedies, and sci-fi series instantly.
              </p>
            </div>

            <button
              onClick={onNavigateToMovies}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-zinc-950 shadow-sm hover:bg-zinc-200 transition-all active:scale-98 shrink-0 cursor-pointer"
            >
              <span>Open Search Catalog</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Platform Capabilities Section */}
      <section className="py-16 sm:py-20 bg-[#090a0d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/[0.06] bg-zinc-900/30 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300 mb-4">
                <Film className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Expansive Index</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct integration with TVMaze public database providing up-to-date program information, season summaries, and broadcast networks.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-zinc-900/30 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300 mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Neutral Ratings</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Aggregated audience review scores calculated transparently across thousands of user feedback data points.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-zinc-900/30 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300 mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Instant Details</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Access synopses, runtimes, original networks, and official sites in a focused, modal overlay with zero clutter.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
