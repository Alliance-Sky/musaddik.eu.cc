import React, { useState } from 'react';
import { ExternalLink, Globe, Github } from 'lucide-react';
import StatsSection from '../components/StatsSection';

export default function Home() {
  const bioText = "I'm Musaddik Temkar — a pokêmon fan and hobbyist developer building across the web stack with foundational knowledge of HTML, CSS, JavaScript, TypeScript and SQL, focusing on React, Next.js and Vite on the frontend, alongside Node.js and PostgreSQL for the backend. I build my software using AI to drive development, and I am always eager to learn and explore new technologies.";

  const projects = [
    {
      id: 1,
      title: 'impulse-server',
      role: 'Fork Maintainer',
      description: 'impulse pokemon-showdown server repository',
      githubUrl: 'https://github.com/musaddiknpm/impulse-server'
    }
  ];

  const liveProjects = [
    {
      id: 1,
      title: 'impulse-server',
      domain: 'impulse-server.com',
      description: 'Live Impulse Pokemon Showdown server instance hosted on cloud infrastructure.',
      liveUrl: 'https://github.com/musaddiknpm/impulse-server', // Replace with live app domain when deployed
      githubUrl: 'https://github.com/musaddiknpm/impulse-server'
    }
  ];

  const [visibleProjectCount, setVisibleProjectCount] = useState(5);
  const visibleProjects = projects.slice(0, visibleProjectCount);
  const hasMoreProjects = projects.length > visibleProjectCount;

  return (
    <div className="hero-container fade-in">
      {/* Title Header */}
      <h1 className="hero-title font-serif">
        <span className="highlight">Welcome to my personal portfolio</span>
        {' — '}
        <span style={{ fontStyle: 'italic' }}>
          or, as I like to call it, my{' '}
          <span className="italic-border">playground</span>
          {' on the web.'}
        </span>
      </h1>

      {/* Main Bio Paragraph */}
      <p className="hero-bio">
        {bioText}
      </p>

      {/* Projects Section */}
      <div className="home-projects-section" style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-color)', margin: 0 }} className="font-serif">
            Projects
          </h2>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--accent-color)', opacity: 0.8 }} />
        </div>
        <div>
          {visibleProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-row"
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.35rem', padding: '1.25rem 1rem', borderRadius: '0.375rem' }}
            >
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="project-row-title font-serif">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    {project.title} <ExternalLink size={16} style={{ opacity: 0.6 }} />
                  </a>
                </h3>
                <p className="project-row-role">
                  {project.role}
                </p>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 400, margin: 0 }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>

        {hasMoreProjects && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => setVisibleProjectCount((prev) => prev + 5)}
              className="hero-btn hero-btn-secondary"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              More
            </button>
          </div>
        )}
      </div>

      {/* Dedicated Live Previews Section */}
      <div className="home-live-previews-section" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-color)', margin: 0 }} className="font-serif">
            Live Previews
          </h2>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--accent-color)', opacity: 0.8 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {liveProjects.map((project) => (
            <div key={project.id} className="card live-preview-card" style={{ padding: '1.25rem', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span className="live-status-badge">
                    <span className="live-status-dot" /> Live
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{project.domain}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 0.35rem 0' }} className="font-serif">
                  {project.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, lineHeight: 1.45 }}>
                  {project.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px solid var(--item-border)' }}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-btn hero-btn-primary"
                  style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Globe size={13} /> Visit App <ExternalLink size={11} />
                </a>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Github size={12} /> Source <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section below Projects */}
      <StatsSection />
    </div>
  );
}



