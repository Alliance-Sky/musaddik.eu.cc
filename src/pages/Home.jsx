import React, { useState } from 'react';
import { ExternalLink, Globe, Github } from 'lucide-react';
import StatsSection from '../components/StatsSection';

export default function Home() {
  const bioText = "I'm Musaddik Temkar — a pokemon fan and hobbyist developer building across the web stack with foundational knowledge of HTML, CSS, JavaScript, TypeScript and SQL, focusing on React, Next.js and Vite on the frontend, alongside Node.js and PostgreSQL for the backend. I build my software using AI to drive development, and I am always eager to learn and explore new technologies.";

  const projects = [
    {
      id: 1,
      title: 'impulse-server',
      domain: 'impulse.psim.us',
      description: 'Pokemon Showdown side server with custom chat-plugins and game modes.',
      githubUrl: 'https://github.com/Alliance-Sky/impulse-server',
      liveUrl: 'https://impulse.psim.us',
      isLive: true
    },
    {
      id: 2,
      title: 'mgba-web',
      domain: 'mgba.musaddik.eu.cc',
      description: 'A web-based Game Boy (GB), Game Boy Color (GBC), and Game Boy Advance (GBA) emulator.',
      githubUrl: 'https://github.com/Alliance-Sky/mgba-web',
      liveUrl: 'https://mgba.musaddik.eu.cc',
      isLive: true
    },
    {
      id: 3,
      title: 'musaddik.eu.cc',
      domain: 'musaddik.eu.cc',
      description: 'Personal portfolio website inspired by @dalelarroder',
      githubUrl: 'https://github.com/Alliance-Sky/musaddik.eu.cc',
      liveUrl: 'https://musaddik.eu.cc',
      isLive: true
    }
  ];

  const [visibleProjectCount, setVisibleProjectCount] = useState(5);
  const visibleProjects = projects.slice(0, visibleProjectCount);
  const hasMoreProjects = projects.length > visibleProjectCount;

  return (
    <div className="hero-container fade-in">
      <h1 className="hero-title font-serif">
        <span className="highlight">Welcome to my personal portfolio</span>
        {' — '}
        <span style={{ fontStyle: 'italic' }}>
          or, as I like to call it, my{' '}
          <span className="italic-border">playground</span>
          {' on the web.'}
        </span>
      </h1>

      <p className="hero-bio">
        {bioText}
      </p>

      <div className="home-projects-section" style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-color)', margin: 0 }} className="font-serif">
            Projects
          </h2>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--accent-color)', opacity: 0.8 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {visibleProjects.map((project) => (
            <div key={project.id} className="card live-preview-card" style={{ padding: '1.25rem', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  {project.isLive ? (
                    <span className="live-status-badge">
                      <span className="live-status-dot" /> Live
                    </span>
                  ) : (
                    <div />
                  )}
                  {project.domain && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{project.domain}</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 0.35rem 0' }} className="font-serif">
                  {project.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0, lineHeight: 1.45 }}>
                  {project.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px solid var(--item-border)' }}>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Globe size={12} className="project-card-icon" /> View Server <ExternalLink size={10} className="project-card-icon" />
                  </a>
                ) : (
                  <div />
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Github size={12} className="project-card-icon" /> Source <ExternalLink size={10} className="project-card-icon" />
                  </a>
                )}
              </div>
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

      <StatsSection />
    </div>
  );
}



