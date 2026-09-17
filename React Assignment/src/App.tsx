/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, Show } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { MovieListing } from './components/MovieListing';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedMovie, setSelectedMovie] = useState<Show | null>(null);

  // Sync with browser URL hash for friendly navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'movies') {
        setCurrentPage('movies');
      } else {
        setCurrentPage('home');
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'movies' ? 'movies' : 'home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMovie = (show: Show) => {
    setSelectedMovie(show);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#090a0d] text-zinc-100 antialiased">
      {/* 1. Navbar: Brand Logo, Nav Links, Prominent Movies CTA */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content View Switcher */}
      <div className="flex-1">
        {currentPage === 'home' ? (
          <HomePage
            onNavigateToMovies={() => handleNavigate('movies')}
            onSelectMovie={handleSelectMovie}
          />
        ) : (
          <MovieListing
            onSelectMovie={handleSelectMovie}
          />
        )}
      </div>

      {/* 3. Movie Details Modal: Backdrop, Title, Rating, Release, Summary, Close buttons */}
      <MovieDetailsModal
        show={selectedMovie}
        onClose={handleCloseModal}
      />

      {/* Footer: Application name, Copyright, Social links */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
