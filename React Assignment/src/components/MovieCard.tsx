import React, { useState } from 'react';
import { Calendar, Film, Info, Star } from 'lucide-react';
import { Show } from '../types';
import { formatRating, formatReleaseDate } from '../services/tvmazeApi';

interface MovieCardProps {
  show: Show;
  onSelect: (show: Show) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ show, onSelect }) => {
  const [imageError, setImageError] = useState(false);

  const posterUrl = show.image?.medium || show.image?.original;
  const ratingText = formatRating(show.rating?.average);
  const releaseYear = formatReleaseDate(show.premiered);
  const hasRating = show.rating?.average !== null && show.rating?.average !== undefined && show.rating?.average > 0;

  return (
    <article
      id={`movie-card-${show.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900/50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-zinc-900/90 hover:shadow-lg hover:shadow-black/40"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={show.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-zinc-600 bg-zinc-950">
            <Film className="h-10 w-10 mb-2 text-zinc-700" />
            <span className="text-xs font-medium text-zinc-400">No Poster Available</span>
            <span className="text-[11px] text-zinc-500 mt-1 line-clamp-2 px-2">{show.name}</span>
          </div>
        )}

        {/* Top Badges overlay: Primary Genre and Running Status */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {show.genres && show.genres.length > 0 ? (
            <span className="rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-medium text-zinc-300 backdrop-blur-md border border-white/[0.1]">
              {show.genres[0]}
            </span>
          ) : <span />}

          {show.status && (
            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium backdrop-blur-md border ${
              show.status === 'Running' 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40' 
                : 'bg-black/75 text-zinc-400 border-white/[0.08]'
            }`}>
              {show.status === 'Running' && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              {show.status}
            </span>
          )}
        </div>

        {/* Subtle dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-75" />
      </div>

      {/* Card Info Section strictly matching Wireframe:
          Title
          ⭐ 8.5  •  📅2024
          [ See Details ]
      */}
      <div className="flex flex-1 flex-col p-4">
        {/* Movie Title */}
        <h3 
          className="text-sm sm:text-base font-bold text-zinc-100 line-clamp-1 group-hover:text-white transition-colors"
          title={show.name}
        >
          {show.name}
        </h3>

        {/* Meta details: ⭐ Rating  •  📅 Release Year */}
        <div className="mt-2 flex items-center gap-2.5 text-xs text-zinc-400">
          <div className="flex items-center gap-1">
            <Star className={`h-3.5 w-3.5 ${hasRating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}`} />
            <span className={hasRating ? 'font-semibold text-zinc-200' : 'text-zinc-500'}>
              {ratingText}
            </span>
          </div>

          <span className="text-zinc-700">•</span>

          <div className="flex items-center gap-1 text-zinc-400">
            <Calendar className="h-3 w-3 text-zinc-500" />
            <span>{releaseYear}</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="mt-4 flex-1" />

        {/* [ See Details ] Button */}
        <button
          id={`btn-details-${show.id}`}
          onClick={() => onSelect(show)}
          className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-800/80 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-all hover:bg-white hover:text-zinc-950 hover:border-white active:scale-98 cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-400/40"
        >
          <Info className="h-3.5 w-3.5" />
          <span>See Details</span>
        </button>
      </div>
    </article>
  );
};
