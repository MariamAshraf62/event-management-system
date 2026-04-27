import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import api from "../services/api";
import "../styles/forms.css";

const CreateEvent = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      await api.post("/events", values);
      navigate("/events");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event.");
    }
  };

  return (
    <div className="form-page page-section">
      <div className="form-page-header">
        <h1>Create New Event</h1>
        <p>Fill in the details below to publish your event to the platform.</p>
      </div>
      {error && <div className="alert alert-error" style={{ marginBottom: 20 }}>{error}</div>}
      <EventForm categories={categories} onSubmit={handleSubmit} submitText="Publish Event" />
    </div>
  );
};

export default CreateEvent;