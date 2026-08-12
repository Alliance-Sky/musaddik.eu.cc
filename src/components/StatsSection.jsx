import React, { useState, useEffect } from 'react';
import {
  ExternalLink, GitCommit, Star,
  BookOpen, Activity
} from 'lucide-preact';

export default function StatsSection() {
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const CACHE_KEY = 'github_stats_cache_v1';
      const CACHE_TTL = 30 * 60 * 1000;

      let cachedData = null;
      try {
        const stored = localStorage.getItem(CACHE_KEY);
        if (stored) {
          cachedData = JSON.parse(stored);
        }
      } catch (e) {}

      if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
        setProfile(cachedData.profile);
        setTotalStars(cachedData.stars);
        setEvents(cachedData.events);
        setTotalContributions(cachedData.contributions);
        setLoading(false);
        return;
      }

      try {
        const fetchConfig = { headers: { Accept: 'application/vnd.github.v3+json' } };
        const searchConfig = { headers: { Accept: 'application/vnd.github.cloak-preview' } };
        
        const [profileRes, reposRes, eventsRes, commitsRes] = await Promise.all([
          fetch('https://api.github.com/users/Alliance-Sky', fetchConfig).catch(() => ({ ok: false })),
          fetch('https://api.github.com/users/Alliance-Sky/repos?per_page=100', fetchConfig).catch(() => ({ ok: false })),
          fetch('https://api.github.com/users/Alliance-Sky/events/public?per_page=100', fetchConfig).catch(() => ({ ok: false })),
          fetch('https://api.github.com/search/commits?q=author:Alliance-Sky', searchConfig).catch(() => ({ ok: false }))
        ]);

        let pData = null;
        let stars = 0;
        let eData = [];
        let contributions = 0;
        let isRateLimited = false;

        if (profileRes.ok) {
          pData = await profileRes.json();
          setProfile(pData);
        } else {
          isRateLimited = true;
        }

        if (reposRes.ok) {
          const rData = await reposRes.json();
          if (Array.isArray(rData)) {
            stars = rData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
            setTotalStars(stars);
          }
        } else {
          isRateLimited = true;
        }

        if (eventsRes.ok) {
          eData = await eventsRes.json();
          if (Array.isArray(eData)) {
            setEvents(eData);
          }
        } else {
          isRateLimited = true;
        }

        if (commitsRes.ok) {
          const cData = await commitsRes.json();
          if (cData && typeof cData.total_count === 'number') {
            contributions = cData.total_count;
            setTotalContributions(contributions);
          }
        } else {
          isRateLimited = true;
        }

        if (isRateLimited && cachedData) {
          setProfile(cachedData.profile);
          setTotalStars(cachedData.stars);
          setEvents(cachedData.events);
          setTotalContributions(cachedData.contributions);
        } else if (pData) {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              timestamp: Date.now(),
              profile: pData,
              stars,
              events: Array.isArray(eData) ? eData : [],
              contributions
            }));
          } catch (e) {}
        }
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        if (cachedData) {
          setProfile(cachedData.profile);
          setTotalStars(cachedData.stars);
          setEvents(cachedData.events);
          setTotalContributions(cachedData.contributions);
        }
      } finally {
        setLoading(false);
      }
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
        observer.disconnect();
      }
    }, { rootMargin: '100px' });

    const element = document.getElementById('github-stats-section');
    if (element) {
      observer.observe(element);
    } else {
      fetchData();
    }

    return () => observer.disconnect();
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

  const [visibleCount, setVisibleCount] = useState(4);

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
    setVisibleCount(4);
  };

  return (
    <div id="github-stats-section" className="home-stats-section" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-color)', margin: 0 }} className="font-serif">
          Stats & Live Activity
        </h2>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--accent-color)', opacity: 0.8 }} />
      </div>

      <div className="stats-grid">
        <div className="stat-item card">
          <div className="stat-header">
            <BookOpen size={16} /> REPOSITORIES
          </div>
          <div className="stat-value">
            {profile?.public_repos || 1}
          </div>
          <div className="stat-desc">
            Public projects
          </div>
        </div>

        <div className="stat-item card">
          <div className="stat-header">
            <BookOpen size={16} /> GISTS
          </div>
          <div className="stat-value">
            {profile?.public_gists ?? 0}
          </div>
          <div className="stat-desc">
            Public gists
          </div>
        </div>

        <div className="stat-item card">
          <div className="stat-header">
            <Star size={16} /> STARS
          </div>
          <div className="stat-value">
            {totalStars}
          </div>
          <div className="stat-desc">
            Total stars earned
          </div>
        </div>

        <div className="stat-item card">
          <div className="stat-header">
            <GitCommit size={16} /> CONTRIBUTIONS
          </div>
          <div className="stat-value">
            {totalContributions || events.length || 1}
          </div>
          <div className="stat-desc">
            Public commits & activities
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '0.4rem', width: '100%' }}>
          <h3 style={{ fontSize: 'clamp(0.85rem, 3.2vw, 1.05rem)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap', margin: 0, flexShrink: 0 }}>
            <Activity size={18} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
            <span>Live GitHub Activity</span>
          </h3>

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
                className={`btn ${activeFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Loading live activity feed...</p>
        ) : visibleEvents.length > 0 ? (
          <>
            <div className="activity-list">
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
                  <div key={evt.id} className="activity-row card">
                    <div className="activity-time">
                      {getTimeAgo(evt.created_at)}
                      <div style={{ opacity: 0.6, fontSize: '0.7rem', marginTop: '0.15rem' }}>
                        {new Date(evt.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="activity-content">
                      <div className="activity-title">
                        <GitCommit size={16} style={{ color: 'var(--accent-color)' }} />
                        <span style={{ textTransform: 'capitalize' }}>{formatEventType(evt.type)}</span>
                        <span style={{ color: 'var(--text-muted)' }}>on</span>
                        <a href={`https://github.com/${evt.repo.name}`} target="_blank" rel="noreferrer">
                          {evt.repo.name}
                        </a>
                      </div>
                      
                      {commitMessage && (
                        <p className="activity-desc">"{commitMessage}"</p>
                      )}
                    </div>

                    <div>
                      <a href={targetUrl} target="_blank" rel="noreferrer" className="activity-link">
                        View Details <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  More
                </button>
              </div>
            )}
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No public activity matching the selected filter found.</p>
        )}
      </div>
    </div>
  );
}
