import React, { useEffect, useState } from 'react';

function PokeballIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >

      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />

      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" />

      <circle cx="12" cy="12" r="3" fill="var(--bg-color)" stroke="currentColor" strokeWidth="2" />

      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const cookieMatch = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
    if (cookieMatch) {
      return cookieMatch[2];
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500);
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`icon-btn theme-toggle-btn ${isSpinning ? 'pokeball-spin' : ''}`}
      aria-label="Toggle Theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="theme-icon-wrapper">
        {theme === 'dark' ? (
          <PokeballIcon size={20} className="theme-sun-icon" />
        ) : (
          <PokeballIcon size={20} className="theme-moon-icon" />
        )}
      </div>
    </button>
  );
}
