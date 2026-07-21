import React from 'react';
import { NavLink } from 'react-router-dom';
import { Code2, FolderGit2, BarChart3, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="nav-logo">
        <Code2 className="accent-icon" size={24} color="#6366f1" />
        <span>musaddik<span className="gradient-text">npm</span></span>
      </NavLink>

      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              /home
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              /projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              /stats
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
