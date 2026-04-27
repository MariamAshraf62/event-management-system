import { Link } from "react-router-dom";
import "../styles/home.css";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure Auth",
    desc: "JWT-based authentication with protected routes for your account.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Capacity Control",
    desc: "Set and enforce attendee limits on every event automatically.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
    title: "Category Filters",
    desc: "Organize events by category and filter them in seconds.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: "Easy Scheduling",
    desc: "Date-time scheduling with timezone-aware calendar control.",
  },
];

const Home = () => {
  return (
    <div className="home page-section">
      <div className="home-hero">
        <div className="home-hero-dots">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="home-hero-dot" />
          ))}
        </div>
        <div className="home-hero-eyebrow">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5" /></svg>
          Event Management Platform
        </div>
        <h1 className="home-hero-title">
          Organize events <em>&amp;</em> bring people together
        </h1>
        <p className="home-hero-subtitle">
          Create events, manage attendee capacity, and keep registrations organized — all in one clean, simple platform.
        </p>
        <div className="home-hero-actions">
          <Link to="/events" className="home-hero-btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Browse Events
          </Link>
          <Link to="/dashboard" className="home-hero-btn-secondary">
            Open Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="home-bottom">
        {features.map((f, i) => (
          <div key={i} className="home-feature-card">
            <div className="home-feature-icon">{f.icon}</div>
            <div className="home-feature-title">{f.title}</div>
            <p className="home-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;