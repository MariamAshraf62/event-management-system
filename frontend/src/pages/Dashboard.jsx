import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import Loader from "../components/Loader";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsRes, regsRes] = await Promise.all([
          api.get("/events", { params: { page: 1, limit: 100 } }),
          api.get("/registrations/me"),
        ]);
        setEvents(eventsRes.data.data || []);
        // Only show active (non-cancelled) registrations
        const activeRegs = (regsRes.data.data || []).filter(
          (reg) => reg.status !== "cancelled"
        );
        setRegistrations(activeRegs);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const myCreatedEvents = useMemo(
    () => events.filter((item) => item.createdBy?._id === user?.id),
    [events, user]
  );

  if (loading) return <Loader />;

  return (
    <section className="dashboard page-section">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h1>Dashboard</h1>
          <p>
            Welcome back, <strong>{user?.name}</strong> — here's your overview.
          </p>
        </div>
        <Link to="/events/create" className="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Event
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-icon stat-card-icon-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value">{myCreatedEvents.length}</div>
            <div className="stat-card-label">Events Created</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stat-card-icon-green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value">{registrations.length}</div>
            <div className="stat-card-label">Registrations</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stat-card-icon-orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value">{events.length}</div>
            <div className="stat-card-label">Total Events</div>
          </div>
        </div>
      </div>

      {/* My Created Events */}
      <div className="dashboard-panel">
        <div className="dashboard-panel-header">
          <h2 className="dashboard-panel-title">My Created Events</h2>
          <Link to="/events/create" className="btn btn-ghost btn-sm">
            + New Event
          </Link>
        </div>
        <div className="dashboard-panel-body">
          {!myCreatedEvents.length ? (
            <div className="dashboard-panel-empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                style={{ margin: "0 auto 10px", display: "block", opacity: 0.3 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              No events created yet.{" "}
              <Link to="/events/create">Create your first event →</Link>
            </div>
          ) : (
            myCreatedEvents.map((event) => (
              <div key={event._id} className="dashboard-event-item">
                <Link to={`/events/${event._id}`} className="dashboard-event-name">
                  {event.title}
                </Link>
                <span className="dashboard-event-meta">
                  {new Date(event.date).toLocaleDateString(undefined, { dateStyle: "medium" })}
                </span>
                <Link to={`/events/${event._id}/edit`} className="btn btn-secondary btn-sm" style={{ marginLeft: 8 }}>
                  Edit
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* My Registrations */}
      <div className="dashboard-panel">
        <div className="dashboard-panel-header">
          <h2 className="dashboard-panel-title">My Registrations</h2>
          <Link to="/events" className="btn btn-ghost btn-sm">
            Browse events →
          </Link>
        </div>
        <div className="dashboard-panel-body">
          {!registrations.length ? (
            <div className="dashboard-panel-empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                style={{ margin: "0 auto 10px", display: "block", opacity: 0.3 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              No registrations yet.{" "}
              <Link to="/events">Browse events →</Link>
            </div>
          ) : (
            registrations.map((registration) => (
              <div key={registration._id} className="dashboard-reg-item">
                <Link
                  to={`/events/${registration.event?._id}`}
                  className="dashboard-event-name"
                >
                  {registration.event?.title || "Event"}
                </Link>
                <span
                  className={`badge ${
                    registration.status === "confirmed"
                      ? "badge-green"
                      : registration.status === "pending"
                      ? "badge-orange"
                      : "badge-blue"
                  }`}
                >
                  {registration.status}
                </span>
                <Link
                  to={`/events/${registration.event?._id}`}
                  className="btn btn-secondary btn-sm"
                  style={{ marginLeft: 8 }}
                >
                  View Event
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
