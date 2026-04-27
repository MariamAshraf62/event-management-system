import { Link } from "react-router-dom";
import "../styles/eventCard.css";

const EventCard = ({ event, onDelete, canManage }) => {
  return (
    <article className="event-card">
      <div className="event-card-accent" />

      <div className="event-card-body">
        <div className="event-card-header">
          <h3 className="event-card-title">{event.title}</h3>
          {event.category?.name && (
            <span className="badge badge-blue">{event.category.name}</span>
          )}
        </div>

        <p className="event-card-description">
          {event.description}
        </p>

        <div className="event-card-meta">
          <div className="event-card-meta-item">
            <svg className="event-card-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span className="event-card-meta-text">
              {new Date(event.date).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          <div className="event-card-meta-item">
            <svg className="event-card-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="event-card-meta-text">{event.location}</span>
          </div>

          <div className="event-card-meta-item">
            <svg className="event-card-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="event-card-meta-text">
              Capacity: {event.capacity}
            </span>
          </div>
        </div>
      </div>

      <div className="event-card-footer">
        <Link to={`/events/${event._id}`} className="btn btn-secondary btn-sm">
          View Details
        </Link>
        {canManage && (
          <>
            <Link
              to={`/events/${event._id}/edit`}
              className="btn btn-warning btn-sm"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete(event._id)}
              className="btn btn-danger btn-sm"
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