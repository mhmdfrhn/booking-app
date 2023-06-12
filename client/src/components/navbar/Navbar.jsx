import React from "react";
import "./navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HBooking</span>
        </Link>
        <div className="navbar-items">
          <button className="navbar-button">Register</button>
          <button className="navbar-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
