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
    <section className="form-page">
      <h1 className="page-title">Create Event</h1>
      {error && <p className="form-error">{error}</p>}
      <EventForm categories={categories} onSubmit={handleSubmit} submitText="Create Event" />
    </section>
  );
};

export default CreateEvent;
