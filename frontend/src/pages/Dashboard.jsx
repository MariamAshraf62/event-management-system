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
        setRegistrations(regsRes.data.data || []);
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
    <section className="dashboard-page">
      <div className="dashboard-head">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, {user?.name}</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="dashboard-grid">
      <div className="ui-card dashboard-panel">
        <div className="dashboard-panel-head">
          <h2 className="dashboard-panel-title">My Created Events</h2>
          <Link to="/events/create" className="dashboard-link">
            + Create Event
          </Link>
        </div>
        {!myCreatedEvents.length && <p className="empty-state">No created events yet.</p>}
        <ul className="dashboard-list">
          {myCreatedEvents.map((event) => (
            <li key={event._id} className="dashboard-item">
              <Link to={`/events/${event._id}`} className="dashboard-item-title">
                {event.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="ui-card dashboard-panel">
        <h2 className="dashboard-panel-title">My Registrations</h2>
        {!registrations.length && <p className="empty-state">No registrations yet.</p>}
        <ul className="dashboard-list">
          {registrations.map((registration) => (
            <li key={registration._id} className="dashboard-item">
              <p className="dashboard-item-title">{registration.event?.title || "Event"}</p>
              <p className="dashboard-item-meta">Status: {registration.status}</p>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
};

export default Dashboard;
