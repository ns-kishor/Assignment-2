import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, ExternalLink, Globe, Star, Tv, X } from 'lucide-react';
import { Show } from '../types';
import { formatRating, formatReleaseDate, sanitizeSummary } from '../services/tvmazeApi';

interface MovieDetailsModalProps {
  show: Show | null;
  onClose: () => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ show, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  const backdropImage = show.image?.original || show.image?.medium;
  const ratingText = formatRating(show.rating?.average);
  const releaseDate = show.premiered ? formatReleaseDate(show.premiered) : 'TBA';
  const fullReleaseDate = show.premiered || 'Release date TBA';
  const cleanSummary = sanitizeSummary(show.summary);
  const networkName = show.network?.name || show.webChannel?.name || null;
  const networkCountry = show.network?.country?.name;

  return (
    <div
      id="movie-details-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-movie-title"
    >
      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.1] bg-[#101216] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Wireframe Top Close Button: [ ✕ ] */}
        <button
          id="modal-close-top-btn"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-zinc-400 backdrop-blur-md border border-white/[0.1] hover:bg-zinc-800 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-400"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Movie Backdrop Container */}
        <div className="relative aspect-video w-full max-h-72 overflow-hidden bg-zinc-950 border-b border-white/[0.06]">
          {backdropImage ? (
            <img
              src={backdropImage}
              alt={`${show.name} backdrop`}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-zinc-600">
              <span className="text-xs font-medium">No Backdrop Available</span>
            </div>
          )}
          {/* Subtle gradient vignette to blend with dark card */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-[#101216]/50 to-transparent" />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[68vh] overflow-y-auto">
          {/* Header & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              {show.genres?.map((genre) => (
                <span
                  key={genre}
                  className="rounded-md border border-white/[0.08] bg-zinc-800/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300"
                >
                  {genre}
                </span>
              ))}
              {show.status && (
                <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${show.status === 'Running' ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                  {show.status}
                </span>
              )}
            </div>

            <h2
              id="modal-movie-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
            >
              {show.name}
            </h2>
          </div>

          {/* Wireframe Info Strip: ⭐ Rating: 8.5   |   📅 Release: 2024 */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/[0.06] bg-zinc-900/60 p-3.5 text-xs font-medium text-zinc-300">
            <div className="flex items-center gap-1.5 text-zinc-200">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>Rating: <strong className="text-white font-semibold">{ratingText}</strong></span>
              {show.rating?.average && <span className="text-zinc-500">/ 10</span>}
            </div>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <Calendar className="h-4 w-4 text-zinc-400" />
              <span>Release: <strong className="text-white font-semibold">{releaseDate}</strong></span>
              {show.premiered && show.premiered !== releaseDate && (
                <span className="text-zinc-500">({fullReleaseDate})</span>
              )}
            </div>

            {show.runtime && (
              <>
                <span className="text-zinc-700 hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Clock className="h-4 w-4 text-zinc-400" />
                  <span>Duration: <strong className="text-white font-semibold">{show.runtime} min</strong></span>
                </div>
              </>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {networkName && (
              <div className="rounded-lg border border-white/[0.06] bg-zinc-900/40 p-3">
                <span className="text-zinc-400 flex items-center gap-1 mb-1">
                  <Tv className="h-3.5 w-3.5 text-zinc-500" /> Network
                </span>
                <span className="font-medium text-zinc-200">
                  {networkName} {networkCountry ? `(${networkCountry})` : ''}
                </span>
              </div>
            )}

            {show.language && (
              <div className="rounded-lg border border-white/[0.06] bg-zinc-900/40 p-3">
                <span className="text-zinc-400 flex items-center gap-1 mb-1">
                  <Globe className="h-3.5 w-3.5 text-zinc-500" /> Language
                </span>
                <span className="font-medium text-zinc-200">{show.language}</span>
              </div>
            )}

            {show.type && (
              <div className="rounded-lg border border-white/[0.06] bg-zinc-900/40 p-3">
                <span className="text-zinc-400 mb-1 block">Category</span>
                <span className="font-medium text-zinc-200">{show.type}</span>
              </div>
            )}
          </div>

          {/* Wireframe Overview Section */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Overview
            </h4>
            <div className="text-sm leading-relaxed text-zinc-300 whitespace-pre-line font-normal">
              {cleanSummary}
            </div>
          </div>

          {/* External links */}
          {show.officialSite && (
            <div>
              <a
                href={show.officialSite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white underline underline-offset-4 transition-colors"
              >
                <span>Visit Official Production Site</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {/* Modal Footer with [ ✕ Close ] button strictly adhering to wireframe */}
          <div className="flex items-center justify-end border-t border-white/[0.06] pt-4">
            <button
              id="modal-close-bottom-btn"
              onClick={onClose}
              className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-zinc-800/90 px-5 py-2 text-xs font-semibold text-zinc-200 transition-all hover:bg-zinc-700 hover:text-white active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <X className="h-3.5 w-3.5" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
