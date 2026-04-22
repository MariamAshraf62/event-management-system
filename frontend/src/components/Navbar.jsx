import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`;

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Event System
        </Link>

        <div className="navbar-links">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/events" className={navClass}>
            Events
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
          )}
          {isAuthenticated && user?.role === "admin" && (
            <NavLink to="/categories/create" className={navClass}>
              Create Category
            </NavLink>
          )}

          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navClass}>
                Register
              </NavLink>
            </>
          ) : (
            <div className="navbar-auth">
              <span className="navbar-user">{user?.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-dark"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
