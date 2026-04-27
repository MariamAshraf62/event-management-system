import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";
import Pagination from "../components/Pagination";
import useAuth from "../hooks/useAuth";
import "../styles/events.css";
import "../styles/forms.css";

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [eventsRes, categoriesRes] = await Promise.all([
        api.get("/events", { params: { page, limit: 6, ...(category && { category }) } }),
        api.get("/categories"),
      ]);
      setEvents(eventsRes.data.data || []);
      setTotalPages(eventsRes.data.pagination?.totalPages || 1);
      setCategories(categoriesRes.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, category]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="events-page page-section">
      {/* Header */}
      <div className="events-page-header">
        <h1>All Events</h1>
        <Link to="/events/create" className="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Event
        </Link>
      </div>

      {/* Filter bar */}
      <div className="events-filter-bar">
        <div className="form-field">
          <label className="form-label">Filter by category</label>
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {category && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => { setCategory(""); setPage(1); }}
            style={{ alignSelf: "flex-end", marginBottom: 1 }}
          >
            Clear filter
          </button>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Grid */}
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDelete}
              canManage={user && event.createdBy?._id === user.id}
            />
          ))}
        </div>
      ) : (
        <div className="events-empty">
          <div className="events-empty-icon">📅</div>
          <p>No events found. Try changing the filter or create a new event.</p>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default Events;