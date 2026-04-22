import { Link } from "react-router-dom";
import "../styles/event-card.css";

const EventCard = ({ event, onDelete, canManage }) => {
  return (
    <article className="event-card">
      <h3 className="event-card-title">{event.title}</h3>
      <p className="event-card-description">{event.description}</p>
      <div className="event-card-meta">
        <p>Date: {new Date(event.date).toLocaleString()}</p>
        <p>Location: {event.location}</p>
        <p>Category: {event.category?.name || "N/A"}</p>
      </div>
      <div className="event-card-actions">
        <Link
          to={`/events/${event._id}`}
          className="btn btn-outline"
        >
          View
        </Link>
        {canManage && (
          <>
            <Link
              to={`/events/${event._id}/edit`}
              className="btn btn-warning"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete(event._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
};

export default EventCard;
