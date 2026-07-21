import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftSquare } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'impulse-server',
      role: 'Maintainer',
      description: 'impulse pokemon-showdown server repository',
      githubUrl: 'https://github.com/musaddiknpm/impulse-server'
    }
  ];

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
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-row"
            style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.35rem', padding: '1.75rem 1rem' }}
          >
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="project-row-title font-serif">
                <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {project.title}
                </a>
              </h2>
              <p className="project-row-role">
                {project.role}
              </p>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 400 }}>
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
