import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const navClass = ({ isActive }) =>
    `nav-link${isActive ? " active" : ""}`;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <div className="navbar-logo-icon">E</div>
          <span className="navbar-logo-text">
            Event<span>Hub</span>
          </span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          type="button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Links wrapper */}
        <div className={`navbar-links-wrapper${menuOpen ? " open" : ""}`}>
          <div className="navbar-links">
            <NavLink to="/" end className={navClass} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/events" className={navClass} onClick={() => setMenuOpen(false)}>
              Events
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/dashboard" className={navClass} onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
            )}
            {isAuthenticated && user?.role === "admin" && (
              <NavLink to="/categories/create" className={navClass} onClick={() => setMenuOpen(false)}>
                Categories
              </NavLink>
            )}

            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className={navClass} onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => `nav-link btn btn-primary btn-sm${isActive ? " active" : ""}`} onClick={() => setMenuOpen(false)}>
                  Register
                </NavLink>
              </>
            ) : (
              <div className="navbar-auth">
                <div className="navbar-avatar">{initials}</div>
                <span className="navbar-username">{user?.name}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;