import React, { useState, useEffect } from 'react';
import {
  ExternalLink, GitCommit, Star,
  BookOpen, Users, GitFork, Activity
} from 'lucide-react';

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
      const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

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
        // Use Promise.allSettled or just catch individual errors
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

        // If rate limited, try to fallback to expired cache
        if (isRateLimited && cachedData) {
          setProfile(cachedData.profile);
          setTotalStars(cachedData.stars);
          setEvents(cachedData.events);
          setTotalContributions(cachedData.contributions);
        } else if (pData) {
          // Only cache if we at least got the profile successfully
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
    <div className="home-stats-section" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-color)', margin: 0 }} className="font-serif">
          Stats & Live Activity
        </h2>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--accent-color)', opacity: 0.8 }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div className="card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-color)' }}>
            <BookOpen size={18} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>REPOSITORIES</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.4rem' }}>
            {profile?.public_repos || 1}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Public projects
          </div>
        </div>

        <div className="card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-color)' }}>
            <BookOpen size={18} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>GISTS</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.4rem' }}>
            {profile?.public_gists ?? 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Public gists
          </div>
        </div>

        <div className="card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-color)' }}>
            <Star size={18} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>STARS</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.4rem' }}>
            {totalStars}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Total stars earned
          </div>
        </div>

        <div className="card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-color)' }}>
            <GitCommit size={18} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>CONTRIBUTIONS</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.4rem' }}>
            {totalContributions || events.length || 1}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
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
                className={`hero-btn ${activeFilter === tab.id ? 'hero-btn-primary' : 'hero-btn-secondary'}`}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                        <GitCommit size={15} className="text-accent" />
                        <span style={{ textTransform: 'capitalize' }}>{formatEventType(evt.type)}</span>
                        <span style={{ color: 'var(--text-muted)' }}>on</span>
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
                              padding: '0.1rem 0.35rem',
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
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-color)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                          "{commitMessage}"
                        </div>
                      )}

                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.25rem' }}>
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
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="hero-btn hero-btn-secondary"
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
