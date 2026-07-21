import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, BarChart2, Github, Mail } from 'lucide-react';

export default function Home() {
  // Lock body scroll on main page matching dalelarroder.com 1:1
  useEffect(() => {
    document.body.classList.add('home-page-locked');
    return () => {
      document.body.classList.remove('home-page-locked');
    };
  }, []);

  const bioText = "I'm Musaddik Temkar — a pokêmon fan and hobbyist developer building across the web stack with foundational knowledge of HTML, CSS, JavaScript, TypeScript and SQL, focusing on React, Next.js and Vite on the frontend, alongside Node.js and PostgreSQL for the backend. I build my software using AI to drive development, and I am always eager to learn and explore new technologies.";

  return (
    <div className="hero-container fade-in">
      {/* Title Header */}
      <h1 className="hero-title font-serif">
        <span className="highlight">Welcome to my personal portfolio</span>
        {' — '}
        <span className="italic-border">or, as I like to call it, my playground on the web.</span>
      </h1>

      {/* Main Bio Paragraph */}
      <p className="hero-bio">
        {bioText}
      </p>

      {/* Action Buttons: Projects, Stats */}
      <div className="hero-action-buttons">
        <Link to="/projects" className="hero-btn hero-btn-secondary">
          <FolderGit2 size={18} /> Projects
        </Link>
        <Link to="/stats" className="hero-btn hero-btn-secondary">
          <BarChart2 size={18} /> Stats
        </Link>
      </div>

      {/* More About Me Section below buttons */}
      <div className="more-about-container">
        <span className="more-about-label">More about me:</span>
        <div className="social-links">
          <a
            href="https://github.com/musaddiknpm"
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            title="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:musaddiknpm@gmail.com"
            className="icon-btn"
            title="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
