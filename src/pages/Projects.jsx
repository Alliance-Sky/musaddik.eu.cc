import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftSquare, ExternalLink, Globe, Github } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'impulse-server',
      role: 'Fork Maintainer',
      description: 'Pokemon Showdown side server with custom chat-plugins and game modes.',
      githubUrl: 'https://github.com/Alliance-Sky/impulse-server',
      liveUrl: 'https://impulse.psim.us'
    },
    {
      id: 2,
      title: 'mgba-web',
      role: 'Developer',
      description: 'A web-based Game Boy (GB), Game Boy Color (GBC), and Game Boy Advance (GBA) emulator.',
      githubUrl: 'https://github.com/Alliance-Sky/mgba-web',
      liveUrl: 'https://mgba.musaddik.eu.cc'
    }
  ];

  const [visibleProjectCount, setVisibleProjectCount] = useState(5);
  const visibleProjects = projects.slice(0, visibleProjectCount);
  const hasMoreProjects = projects.length > visibleProjectCount;

  return (
    <div className="fade-in">
      {/* Banner Header */}
      <Link to="/" className="nav-banner">
        <div className="nav-banner-home">
          <ArrowLeftSquare size={22} />
          <span>Home</span>
        </div>
        <div className="nav-banner-line" />
        <span className="nav-banner-title font-serif">Projects</span>
      </Link>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Here are some of my selected projects worth sharing.
        </p>
      </div>

      {/* Typographic Hover List with short description */}
      <div>
        {visibleProjects.map((project) => (
          <div 
            key={project.id} 
            className="project-row"
            style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.35rem', padding: '1.75rem 1rem' }}
          >
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="project-row-title font-serif">
                <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {project.title}
                </a>
              </h2>
              <p className="project-row-role">
                {project.role}
              </p>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 400, margin: '0.25rem 0 0.5rem 0' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.25rem' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <Globe size={13} /> Website <ExternalLink size={10} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <Github size={13} /> Source <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMoreProjects && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => setVisibleProjectCount((prev) => prev + 5)}
            className="hero-btn hero-btn-secondary"
            style={{ padding: '0.5rem 1.5rem', fontSize: '0.88rem', cursor: 'pointer' }}
          >
            More
          </button>
        </div>
      )}
    </div>
  );
}
