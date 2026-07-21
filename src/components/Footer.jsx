import React from 'react';
import { Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-socials">
          <a 
            href="https://github.com/Alliance-Sky" 
            target="_blank" 
            rel="noreferrer" 
            className="icon-btn"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a 
            href="mailto:allianceskygit@gmail.com" 
            className="icon-btn"
            title="Email"
            aria-label="Email Me"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="footer-copyright font-mono">
          Copyright {new Date().getFullYear()} Musaddik Temkar. Built with React & Vite.
        </p>
      </div>
    </footer>
  );
}
