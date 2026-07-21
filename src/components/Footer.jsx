import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>© {new Date().getFullYear()} musaddiknpm. Built with React & Vite.</p>
      </div>

      <div className="footer-socials">
        <a 
          href="https://github.com/musaddiknpm" 
          target="_blank" 
          rel="noreferrer" 
          className="social-icon-btn"
          aria-label="GitHub Profile"
        >
          <Github size={18} />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noreferrer" 
          className="social-icon-btn"
          aria-label="Twitter Profile"
        >
          <Twitter size={18} />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noreferrer" 
          className="social-icon-btn"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={18} />
        </a>
        <a 
          href="mailto:contact@musaddik.dev" 
          className="social-icon-btn"
          aria-label="Email Me"
        >
          <Mail size={18} />
        </a>
      </div>
    </footer>
  );
}
