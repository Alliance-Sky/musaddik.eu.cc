import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FluidCanvas from './FluidCanvas';
import ThemeToggle from './ThemeToggle';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="main-wrapper">
      <FluidCanvas />

      {/* Fixed Top Header with Left "M" Logo (Main page only) & Right Theme Toggle */}
      <header className="top-header">
        <div>
          {isHomePage && (
            <Link to="/" className="icon-btn top-logo" title="Musaddik Temkar — Home" aria-label="Home">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24" className="m-logo-svg">
                <defs>
                  <linearGradient id="headerLogoGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#db2777" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                  <linearGradient id="headerLogoGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" rx="26" className="m-logo-bg" />
                <rect x="5" y="5" width="90" height="90" rx="22" fill="none" className="m-logo-border" strokeWidth="5" />
                <text x="50" y="67" fontFamily="'Merriweather', Georgia, serif" fontSize="54" fontWeight="bold" className="m-logo-text" textAnchor="middle">
                  M
                </text>
              </svg>
            </Link>
          )}
        </div>

        <ThemeToggle />
      </header>

      <main className="page-container">
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}

