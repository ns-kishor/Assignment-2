import React, { useState } from 'react';
import { Film, Home, Menu, Search, X, Compass } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#090a0d]/85 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNav('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.12] text-amber-400 shadow-sm transition-all group-hover:border-amber-400/40 group-hover:bg-zinc-800">
            <Film className="h-4.5 w-4.5 stroke-[2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1">
              Movie<span className="text-amber-400 font-semibold">Explorer</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium">
              Cinema & TV Directory
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.06] bg-zinc-900/60 p-1">
          <button
            id="nav-link-home"
            onClick={() => handleNav('home')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              currentPage === 'home'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/[0.08]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </button>

          <button
            id="nav-link-movies-browse"
            onClick={() => handleNav('movies')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              currentPage === 'movies'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/[0.08]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Catalog
          </button>
        </nav>

        {/* Desktop CTA / Search Quick Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="navbar-cta-movies"
            onClick={() => handleNav('movies')}
            className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-zinc-300 shadow-sm transition-all hover:border-white/[0.2] hover:bg-zinc-800 hover:text-white active:scale-98"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span>Search Movies</span>
            <kbd className="hidden lg:inline-block ml-1 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-white/[0.06]">
              /
            </kbd>
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex items-center md:hidden">
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-[#090a0d] px-4 pt-3 pb-6 space-y-2 md:hidden">
          <button
            id="mobile-nav-home"
            onClick={() => handleNav('home')}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
              currentPage === 'home'
                ? 'bg-zinc-900 text-white border border-white/[0.08]'
                : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </button>

          <button
            id="mobile-nav-movies"
            onClick={() => handleNav('movies')}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
              currentPage === 'movies'
                ? 'bg-zinc-900 text-white border border-white/[0.08]'
                : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4" />
            Browse Movies & Shows
          </button>

          <div className="pt-2">
            <button
              id="mobile-cta-movies"
              onClick={() => handleNav('movies')}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-100 py-2.5 text-center text-xs font-semibold text-zinc-950 transition-colors hover:bg-white"
            >
              <Search className="h-3.5 w-3.5" />
              Search Full Catalog
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
