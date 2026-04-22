import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      const res = await api.post("/registrations", { event: id });
      setMessage(res.data.message || "Registered successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  if (loading) return <Loader />;
  if (!event) return <p className="text-red-600">{message || "Event not found."}</p>;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800">{event.title}</h1>
      <p className="mt-3 text-slate-600">{event.description}</p>
      <div className="mt-4 space-y-1 text-sm text-slate-500">
        <p>Date: {new Date(event.date).toLocaleString()}</p>
        <p>Location: {event.location}</p>
        <p>Capacity: {event.capacity}</p>
        <p>Category: {event.category?.name}</p>
      </div>

      {isAuthenticated && (
        <button
          type="button"
          onClick={handleRegister}
          className="mt-5 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
        >
          Register for Event
        </button>
      )}

      {message && <p className="mt-4 text-sm text-blue-600">{message}</p>}
    </section>
  );
};

export default EventDetails;
