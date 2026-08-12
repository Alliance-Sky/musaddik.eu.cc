import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-preact';
import Github from '../components/GithubIcon';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-socials">
          <a 
            href="https://github.com/Alliance-Sky" 
            target="_blank" 
            rel="noreferrer" 
            className="footer-social-link"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <Github size={15} />
          </a>
          <a 
            href="mailto:allianceskygit@gmail.com" 
            className="footer-social-link"
            title="Email"
            aria-label="Email Me"
          >
            <Mail size={15} />
          </a>
        </div>

        <p className="footer-copyright font-mono">
          © {new Date().getFullYear()} Musaddik Temkar. Built with <a href="https://astro.build" target="_blank" rel="noreferrer" className="footer-link">Astro <ArrowUpRight size={10} /></a> & <a href="https://preactjs.com/" target="_blank" rel="noreferrer" className="footer-link">Preact <ArrowUpRight size={10} /></a>.
        </p>
      </div>
    </footer>
  );
}
