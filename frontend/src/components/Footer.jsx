import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            Event<span>Hub</span>
          </div>
          <p className="footer-tagline">Clean event planning experience — organized, simple, fast.</p>
        </div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/events" className="footer-link">Events</Link>
          <Link to="/dashboard" className="footer-link">Dashboard</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EventHub — Event Management System</p>
      </div>
    </footer>
  );
};

export default Footer;