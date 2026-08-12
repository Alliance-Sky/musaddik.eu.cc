import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-preact';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const hasCookie = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
      const hasLocal = localStorage.getItem('theme');
      
      if (!hasCookie && !hasLocal) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="icon-btn theme-toggle-btn"
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
