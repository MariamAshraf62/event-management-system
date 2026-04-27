import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forms.css";

const EventForm = ({ categories, initialValues, onSubmit, submitText = "Save Event" }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: 1,
    category: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        description: initialValues.description || "",
        date: initialValues.date ? initialValues.date.slice(0, 16) : "",
        location: initialValues.location || "",
        capacity: initialValues.capacity || 1,
        category: initialValues.category?._id || initialValues.category || "",
      });
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title || !form.description || !form.location || !form.category || !form.date) {
      setError("All fields are required.");
      return;
    }

    if (Number(form.capacity) < 1) {
      setError("Capacity must be at least 1.");
      return;
    }

    setError("");
    onSubmit({
      ...form,
      capacity: Number(form.capacity),
      date: new Date(form.date).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="event-form-body">
        {error && <div className="alert alert-error">{error}</div>}

        {/* Title */}
        <div className="form-field">
          <label htmlFor="title" className="form-label">Event Title</label>
          <input
            id="title"
            name="title"
            placeholder="e.g. Annual Tech Summit 2025"
            value={form.title}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Description */}
        <div className="form-field">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe what attendees can expect..."
            value={form.description}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        {}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="date" className="form-label">Date & Time</label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              id="location"
              name="location"
              placeholder="e.g. Cairo International Center"
              value={form.location}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Capacity & Category row */}
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="capacity" className="form-label">Capacity</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              className="form-input"
            />
            <p className="form-hint">Maximum number of attendees</p>
          </div>

          <div className="form-field">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!categories.length && (
          <div className="form-no-categories">
            No categories found. Ask an admin to{" "}
            <Link to="/categories/create">create categories first</Link>.
          </div>
        )}
      </div>

      <div className="event-form-footer">
        <button type="submit" className="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {submitText}
        </button>
        <Link to="/events" className="btn btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default EventForm;