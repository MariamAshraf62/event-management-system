import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import "../styles/events.css";

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [userRegistration, setUserRegistration] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isRegistered = !!userRegistration;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data.data);

        if (isAuthenticated) {
          try {
            const regsRes = await api.get("/registrations/me");
            const registration = regsRes.data.data.find(
              (reg) => reg.event._id === id && reg.status !== "cancelled"
            );
            setUserRegistration(registration || null);
          } catch (error) {
            console.log(error.message);
          }
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Failed to load event details."
        );
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, isAuthenticated]);

  const handleRegister = async () => {
    try {
      setIsProcessing(true);
      setMessage("");

      const res = await api.post("/registrations", { event: id });

      const regsRes = await api.get("/registrations/me");
      const registration = regsRes.data.data.find(
        (reg) => (reg.event?._id === id || reg.event === id) && reg.status !== "cancelled"
      );

      if (registration) {
        setUserRegistration(registration);
        setMessage(res.data?.message || "Registered successfully.");
        setMessageType("success");
      } else {
        throw new Error("Registration succeeded but could not fetch details.");
      }

    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Registration failed."
      );
      setMessageType("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!userRegistration || !userRegistration._id) return;

    try {
      setIsProcessing(true);
      setMessage("");

      const res = await api.patch(
        `/registrations/${userRegistration._id}/cancel`,
        { status: "cancelled" }
      );

      setMessage(
        res.data?.message || "Registration cancelled successfully."
      );
      setMessageType("success");

      setUserRegistration(null);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to cancel registration."
      );
      setMessageType("error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <Loader />;

  if (!event)
    return (
      <div
        className="alert alert-error"
        style={{ maxWidth: 600, margin: "40px auto" }}
      >
        {message || "Event not found."}
      </div>
    );

  return (
    <div className="event-details page-section">
      <div style={{ marginBottom: 20 }}>
        <Link to="/events" className="btn btn-secondary btn-sm">
          Back to Events
        </Link>
      </div>

      <div className="event-details-card">
        <div className="event-details-hero">
          {event.category?.name && (
            <div className="event-details-category">
              {event.category.name}
            </div>
          )}

          <h1 className="event-details-title">
            {event.title}
          </h1>
        </div>

        <div className="event-details-body">
          <p className="event-details-description">
            {event.description}
          </p>

          <div className="event-details-meta-grid">
            <div className="event-details-meta-item">
              <span className="event-details-meta-label">
                Date & Time
              </span>

              <span className="event-details-meta-value">
                {new Date(event.date).toLocaleString(
                  undefined,
                  {
                    dateStyle: "long",
                    timeStyle: "short",
                  }
                )}
              </span>
            </div>

            <div className="event-details-meta-item">
              <span className="event-details-meta-label">
                Location
              </span>

              <span className="event-details-meta-value">
                {event.location}
              </span>
            </div>

            <div className="event-details-meta-item">
              <span className="event-details-meta-label">
                Capacity
              </span>

              <span className="event-details-meta-value">
                {event.capacity} seats
              </span>
            </div>

            <div className="event-details-meta-item">
              <span className="event-details-meta-label">
                Category
              </span>

              <span className="event-details-meta-value">
                {event.category?.name || "—"}
              </span>
            </div>
          </div>

          <div className="event-details-actions">
            {isAuthenticated ? (
              isRegistered ? (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className="btn btn-danger btn-lg"
                  style={{
                    opacity: isProcessing ? 0.6 : 1,
                    cursor: isProcessing
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {isProcessing
                    ? "Cancelling..."
                    : "Cancel Registration"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={isProcessing}
                  className="btn btn-success btn-lg"
                  style={{
                    opacity: isProcessing ? 0.6 : 1,
                    cursor: isProcessing
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {isProcessing
                    ? "Registering..."
                    : "Register for this Event"}
                </button>
              )
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-lg"
              >
                Sign in to Register
              </Link>
            )}
          </div>

          {message && (
            <div
              className={`alert alert-${messageType}`}
              style={{ marginTop: 20 }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;