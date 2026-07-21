import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, GitCommit, 
  Star, BookOpen, Users, GitFork, Activity 
} from 'lucide-react';

export default function Stats() {
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [profileRes, reposRes, eventsRes, commitsRes] = await Promise.all([
          fetch('https://api.github.com/users/Alliance-Sky'),
          fetch('https://api.github.com/users/Alliance-Sky/repos?per_page=100'),
          fetch('https://api.github.com/users/Alliance-Sky/events/public?per_page=100'),
          fetch('https://api.github.com/search/commits?q=author:Alliance-Sky', {
            headers: { Accept: 'application/vnd.github.cloak-preview' }
          })
        ]);

        if (profileRes.ok) {
          const pData = await profileRes.json();
          setProfile(pData);
        }

        if (reposRes.ok) {
          const rData = await reposRes.json();
          if (Array.isArray(rData)) {
            const stars = rData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
            setTotalStars(stars);
          }
        }

        if (eventsRes.ok) {
          const eData = await eventsRes.json();
          setEvents(eData);
        }

        if (commitsRes.ok) {
          const cData = await commitsRes.json();
          if (cData && typeof cData.total_count === 'number') {
            setTotalContributions(cData.total_count);
          }
        }
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatEventType = (type) => {
    if (!type) return 'Activity';
    if (type === 'PushEvent') return 'Push';
    if (type === 'PullRequestEvent') return 'PR';
    if (type === 'PullRequestReviewEvent') return 'PR Review';
    if (type === 'CreateEvent') return 'Created';
    if (type === 'WatchEvent') return 'Starred';
    return type.replace('Event', '');
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const [visibleCount, setVisibleCount] = useState(5);

  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'commits') return evt.type === 'PushEvent';
    if (activeFilter === 'prs') return evt.type === 'PullRequestEvent' || evt.type === 'PullRequestReviewEvent';
    return true;
  });

  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = filteredEvents.length > visibleCount;

  const handleFilterSelect = (filterId) => {
    setActiveFilter(filterId);
    setVisibleCount(5);
  };

  return (
    <div className="fade-in">
      <Link to="/" className="nav-banner" title="Back to Home">
        <span className="nav-banner-home">
          <ArrowLeft size={18} /> Home
        </span>
        <div className="nav-banner-line" />
        <h1 className="nav-banner-title font-serif">Stats</h1>
      </Link>

      <p className="text-muted" style={{ marginBottom: '2.5rem' }}>
        Here is my live developer dashboard and real-time GitHub activity feed.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.25rem', 
        marginBottom: '2.5rem' 
      }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-color)' }}>
            <BookOpen size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>REPOSITORIES</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>
            {profile?.public_repos || 1}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Public projects on GitHub
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-color)' }}>
            <Users size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>FOLLOWERS</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>
            {profile?.followers || 0}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            GitHub network followers
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-color)' }}>
            <Star size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>TOTAL STARS</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>
            {totalStars}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            GitHub Repository Stars
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-color)' }}>
            <GitCommit size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>TOTAL CONTRIBUTIONS</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>
            {totalContributions || events.length || 1}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Public commits & contributions
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '0.4rem', width: '100%' }}>
          <h2 style={{ fontSize: 'clamp(0.85rem, 3.2vw, 1.25rem)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap', margin: 0, flexShrink: 0 }}>
            <Activity size={20} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
            <span>Live GitHub Activity Stream</span>
          </h2>

          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--accent-color)', opacity: 0.8, minWidth: '4px', margin: '0 0.35rem' }} />

          <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'commits', label: 'Commits' },
              { id: 'prs', label: 'PRs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterSelect(tab.id)}
                className={`hero-btn ${activeFilter === tab.id ? 'hero-btn-primary' : 'hero-btn-secondary'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-muted">Loading live activity feed...</p>
        ) : visibleEvents.length > 0 ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {visibleEvents.map((evt) => {
                const commitSha = evt.payload?.commits?.[0]?.sha || evt.payload?.head;
                const commitMessage = evt.payload?.commits?.[0]?.message;
                const shortSha = commitSha ? commitSha.substring(0, 7) : null;

                let targetUrl = `https://github.com/${evt.repo.name}`;
                if (commitSha) {
                  targetUrl = `https://github.com/${evt.repo.name}/commit/${commitSha}`;
                } else if (evt.payload?.pull_request?.html_url) {
                  targetUrl = evt.payload.pull_request.html_url;
                }

                return (
                  <div 
                    key={evt.id} 
                    className="stat-card" 
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}
                  >
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <GitCommit size={16} className="text-accent" />
                        <span style={{ textTransform: 'capitalize' }}>{formatEventType(evt.type)}</span>
                        <span className="text-muted">on</span>
                        <a href={`https://github.com/${evt.repo.name}`} target="_blank" rel="noreferrer" className="underline-magical" style={{ fontWeight: 600 }}>
                          {evt.repo.name}
                        </a>
                        
                        {shortSha && (
                          <a 
                            href={targetUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="font-mono"
                            style={{ 
                              fontSize: '0.75rem', 
                              padding: '0.15rem 0.45rem', 
                              borderRadius: '0.25rem', 
                              background: 'var(--hover-bg)', 
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-color)',
                              textDecoration: 'none'
                            }}
                          >
                            #{shortSha}
                          </a>
                        )}
                      </div>

                      {commitMessage && (
                        <div style={{ fontSize: '0.88rem', color: 'var(--text-color)', marginTop: '0.3rem', fontStyle: 'italic' }}>
                          "{commitMessage}"
                        </div>
                      )}

                      <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
                        {getTimeAgo(evt.created_at)} ({new Date(evt.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })})
                      </div>
                    </div>

                    <a 
                      href={targetUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="icon-btn" 
                      title="View on GitHub"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                  className="hero-btn hero-btn-secondary"
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-muted">No public activity matching the selected filter found.</p>
        )}
      </div>
    </div>
  );
}
