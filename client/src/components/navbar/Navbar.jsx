import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HBooking</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="navbar-items">
            <button className="navbar-button">Register</button>
            <button className="navbar-button">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
