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
    <form onSubmit={handleSubmit} className="ui-card event-form">
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          name="title"
          placeholder="Event title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Event description"
          value={form.description}
          onChange={handleChange}
          className="form-control form-textarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Date and time
        </label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          id="location"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="capacity" className="form-label">
          Capacity
        </label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          min="1"
          value={form.capacity}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {!categories.length && (
        <p className="form-note">
          No categories found. Ask an admin to create categories first{" "}
          <Link to="/categories/create" className="form-link">
            from here
          </Link>
          .
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
      >
        {submitText}
      </button>
    </form>
  );
};

export default EventForm;
