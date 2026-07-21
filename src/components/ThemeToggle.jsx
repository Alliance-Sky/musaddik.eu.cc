import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // 1. Check cookies first
    const cookieMatch = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
    if (cookieMatch) {
      return cookieMatch[2];
    }
    // 2. Check localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // 3. System preference default
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist in Cookie (1 year duration)
    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Persist in LocalStorage as backup
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`icon-btn theme-toggle-btn ${isRotating ? 'rotate-animation' : ''}`}
      aria-label="Toggle Theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="theme-icon-wrapper">
        {theme === 'dark' ? (
          <Sun size={20} className="theme-sun-icon" />
        ) : (
          <Moon size={20} className="theme-moon-icon" />
        )}
      </div>
    </button>
  );
}
