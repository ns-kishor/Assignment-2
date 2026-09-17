import React from 'react';
import { Film, Github, Globe, Twitter } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#090a0d] text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.04]">
          {/* Logo & Brief Description */}
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-white font-bold text-base tracking-tight hover:opacity-90"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 border border-white/[0.1] text-amber-400">
                <Film className="h-3.5 w-3.5" />
              </div>
              <span>Movie<span className="text-amber-400 font-semibold">Explorer</span></span>
            </button>
            <p className="text-xs text-zinc-500 max-w-sm">
              Discover and explore movies and TV shows from around the world. Powered by TVMaze public REST API.
            </p>
          </div>

          {/* Clean Navigation Links */}
          <div className="flex items-center gap-6 text-xs font-medium text-zinc-400">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('movies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              Catalog
            </button>
            <a
              href="https://www.tvmaze.com/api"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>TVMaze API</span>
              <Globe className="h-3 w-3 text-zinc-500" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900/60 text-zinc-400 hover:border-white/[0.2] hover:text-white transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Profile"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900/60 text-zinc-400 hover:border-white/[0.2] hover:text-white transition-colors"
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom copyright info strictly matching specifications */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-400 font-medium">
          <p>© 2026 MovieExplorer. All rights reserved.</p>
          <p className="text-zinc-400">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
