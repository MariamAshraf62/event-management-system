import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm";
import api from "../services/api";
import Loader from "../components/Loader";
import "../styles/forms.css";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, categoriesRes] = await Promise.all([
          api.get(`/events/${id}`),
          api.get("/categories"),
        ]);
        setEvent(eventRes.data.data);
        setCategories(categoriesRes.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load event.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await api.put(`/events/${id}`, values);
      navigate(`/events/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event.");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="form-page">
      <h1 className="page-title">Edit Event</h1>
      {error && <p className="form-error">{error}</p>}
      <EventForm
        categories={categories}
        initialValues={event}
        onSubmit={handleSubmit}
        submitText="Update Event"
      />
    </section>
  );
};

export default EditEvent;
