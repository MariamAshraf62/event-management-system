import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";
import Pagination from "../components/Pagination";
import useAuth from "../hooks/useAuth";
import "../styles/events.css";

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
    <section className="events-page">
      <div className="events-header">
        <h1 className="events-title">All Events</h1>
        <Link
          to="/events/create"
          className="btn btn-primary"
        >
          Create Event
        </Link>
      </div>

      <div className="ui-card events-filter-card">
        <label className="form-label">Filter by category</label>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setPage(1);
          }}
          className="form-control events-filter"
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

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

      {!events.length && <p className="empty-state">No events found.</p>}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};

export default Events;
