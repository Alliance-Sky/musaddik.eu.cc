import React, { useState } from 'react';
import { ExternalLink } from 'lucide-preact';
import Github from '../components/GithubIcon';
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
      isLive: true,
      tags: ['TypeScript', 'Node.js', 'PostgreSQL']
    },
    {
      id: 2,
      title: 'mgba-web',
      domain: 'mgba.musaddik.eu.cc',
      description: 'A web-based Game Boy (GB), Game Boy Color (GBC), and Game Boy Advance (GBA) emulator.',
      githubUrl: 'https://github.com/Alliance-Sky/mgba-web',
      liveUrl: 'https://mgba.musaddik.eu.cc',
      isLive: true,
      tags: ['JavaScript', 'CSS', 'HTML']
    },
    {
      id: 3,
      title: 'musaddik.eu.cc',
      domain: 'musaddik.eu.cc',
      description: 'Personal portfolio website inspired by @dalelarroder',
      githubUrl: 'https://github.com/Alliance-Sky/musaddik.eu.cc',
      liveUrl: 'https://musaddik.eu.cc',
      isLive: true,
      tags: ['Astro', 'Preact', 'CSS']
    },
    {
      id: 4,
      title: 'smogon-stats',
      domain: 'smogonstats.eu.cc',
      description: 'A Pokemon Showdown usage stats viewer built with Preact and Vite.',
      githubUrl: 'https://github.com/Alliance-Sky/smogon-stats',
      liveUrl: 'https://smogonstats.eu.cc',
      isLive: true,
      tags: ['Preact', 'Zustand', 'Chart.js']
    },
    {
      id: 5,
      title: 'proxy-api',
      description: 'A fast, caching reverse proxy built with Golang to serve Smogon usage stats efficiently.',
      githubUrl: 'https://github.com/Alliance-Sky/proxy-api',
      isLive: true,
      tags: ['Go', 'REST API', 'Caching']
    }
  ];

  const [visibleProjectCount, setVisibleProjectCount] = useState(4);
  const visibleProjects = projects.slice(0, visibleProjectCount);
  const hasMoreProjects = projects.length > visibleProjectCount;

  return (
    <div className="intro">
      <h1 className="intro-title font-serif">
        <span className="highlight">Welcome to my personal portfolio</span>
        {' — '}
        <span style={{ fontStyle: 'italic' }}>
          or, as I like to call it, my{' '}
          <span className="italic-border">playground</span>
          {' on the web.'}
        </span>
      </h1>

      <p className="bio">
        {bioText}
      </p>

      <div className="home-projects-section" style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-color)', margin: 0 }} className="font-serif">
            Projects
          </h2>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--accent-color)', opacity: 0.8 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {visibleProjects.map((project) => (
            <div key={project.id} className="project-row card">
              <div className="project-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h3 className="project-title font-serif">{project.title}</h3>
                </div>
                {project.tags && (
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <p className="project-desc">{project.description}</p>
                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link">
                      Visit Site <ExternalLink size={14} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                      <Github size={14} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMoreProjects && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => setVisibleProjectCount((prev) => prev + 4)}
              className="btn btn-secondary"
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



