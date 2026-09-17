import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ArrowUpDown, 
  Film, 
  Loader2, 
  RefreshCw, 
  Search, 
  SlidersHorizontal, 
  X 
} from 'lucide-react';
import { Show, SortOption } from '../types';
import { MovieCard } from './MovieCard';
import { fetchAllShows, searchShows } from '../services/tvmazeApi';

interface MovieListingProps {
  onSelectMovie: (show: Show) => void;
  initialQuery?: string;
}

export const MovieListing: React.FC<MovieListingProps> = ({ 
  onSelectMovie,
  initialQuery = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce search query changes (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch shows when debounced query changes
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        let results: Show[];
        if (debouncedQuery.trim()) {
          results = await searchShows(debouncedQuery);
        } else {
          results = await fetchAllShows();
        }
        if (!isCancelled) {
          setShows(results);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          console.error('Failed to load shows:', err);
          setError('Unable to fetch movie records right now. Please check your network connection.');
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery]);

  // Extract available genres dynamically from loaded shows
  const availableGenres = useMemo(() => {
    const set = new Set<string>();
    shows.forEach((show) => {
      show.genres?.forEach((genre) => set.add(genre));
    });
    return ['All', ...Array.from(set).sort()];
  }, [shows]);

  // Filter & Sort shows
  const processedShows = useMemo(() => {
    let result = [...shows];

    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter((show) => show.genres?.includes(selectedGenre));
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'rating-desc') {
        const rA = a.rating?.average ?? -1;
        const rB = b.rating?.average ?? -1;
        return rB - rA;
      }
      if (sortBy === 'rating-asc') {
        const rA = a.rating?.average ?? 999;
        const rB = b.rating?.average ?? 999;
        return rA - rB;
      }
      if (sortBy === 'date-desc') {
        const dateA = a.premiered ? new Date(a.premiered).getTime() : 0;
        const dateB = b.premiered ? new Date(b.premiered).getTime() : 0;
        return dateB - dateA;
      }
      if (sortBy === 'date-asc') {
        const dateA = a.premiered ? new Date(a.premiered).getTime() : 9999999999999;
        const dateB = b.premiered ? new Date(b.premiered).getTime() : 9999999999999;
        return dateA - dateB;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [shows, selectedGenre, sortBy]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <main className="min-h-screen py-10 sm:py-14 bg-[#090a0d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            <Film className="h-3.5 w-3.5 text-zinc-400" />
            <span>Title Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Explore All Movies & Shows
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Browse TV shows and films with real-time search, genre categorizations, and aggregated audience ratings.
          </p>
        </div>
        <div className="relative mb-6">
          <div className="relative flex items-center rounded-xl border border-white/[0.1] bg-zinc-900/60 shadow-sm transition-all focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-400/20">
            <div className="pointer-events-none pl-4 text-zinc-400">
              <Search className="h-5 w-5 text-zinc-400" />
            </div>

            <input
              id="movie-search-input"
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full bg-transparent py-3.5 pl-3 pr-12 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                id="search-clear-btn"
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-3.5 rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {debouncedQuery && (
            <div className="mt-2.5 flex items-center gap-2 text-xs text-zinc-400">
              <span>Search query:</span>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-white font-medium">
                "{debouncedQuery}"
              </span>
              <button 
                onClick={handleClearSearch} 
                className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2 ml-1"
              >
                clear
              </button>
            </div>
          )}
        </div>

        {/* Filter and Sorting Controls Bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
          {/* Genre Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-zinc-400 flex items-center gap-1 shrink-0 mr-1.5 font-medium">
              <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" /> Filter:
            </span>
            {availableGenres.slice(0, 8).map((genre) => (
              <button
                key={genre}
                id={`filter-genre-${genre.toLowerCase()}`}
                onClick={() => setSelectedGenre(genre)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedGenre === genre
                    ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                    : 'bg-zinc-900 border border-white/[0.08] text-zinc-300 hover:border-white/[0.18] hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Sort Selector & Results Count */}
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
            <span className="text-xs text-zinc-400">
              {isLoading ? (
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400" /> Loading...
                </span>
              ) : (
                <span>
                  <strong className="text-white font-semibold">{processedShows.length}</strong> titles
                </span>
              )}
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-3.5 w-3.5 text-zinc-500" />
              <select
                id="movie-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort movies"
                className="rounded-lg border border-white/[0.08] bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-200 focus:border-zinc-400 focus:outline-none"
              >
                <option value="rating-desc">Rating: Highest First</option>
                <option value="rating-asc">Rating: Lowest First</option>
                <option value="date-desc">Release: Newest First</option>
                <option value="date-asc">Release: Oldest First</option>
                <option value="name-asc">Title: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="my-12 rounded-xl border border-red-500/20 bg-red-950/20 p-8 text-center max-w-md mx-auto">
            <p className="text-xs text-red-300 font-medium mb-3">{error}</p>
            <button
              onClick={() => {
                setDebouncedQuery(searchQuery + ' ');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-zinc-800 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Retry Query
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse flex flex-col rounded-xl border border-white/[0.06] bg-zinc-900/30 overflow-hidden"
              >
                <div className="aspect-[2/3] bg-zinc-800/60 w-full" />
                <div className="p-4 space-y-2.5">
                  <div className="h-4 bg-zinc-800/80 rounded w-3/4" />
                  <div className="h-3.5 bg-zinc-800/50 rounded w-1/2" />
                  <div className="h-8 bg-zinc-800/70 rounded-lg mt-3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Search Results */}
        {!isLoading && !error && processedShows.length === 0 && (
          <div className="my-16 flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-white/[0.08] max-w-sm mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-white/[0.06] text-zinc-400 mb-3">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No matching titles</h3>
            <p className="text-xs text-zinc-400 mb-5">
              No results found for "{debouncedQuery || selectedGenre}". Try searching by another keyword.
            </p>
            <button
              onClick={() => {
                handleClearSearch();
                setSelectedGenre('All');
              }}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Movie Cards Grid - Responsive CSS Grid (1 col mobile, 2 col sm, 3 col md, 4 col lg/xl) */}
        {!isLoading && !error && processedShows.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {processedShows.map((show) => (
              <MovieCard
                key={show.id}
                show={show}
                onSelect={onSelectMovie}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};
