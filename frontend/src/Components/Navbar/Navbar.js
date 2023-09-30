import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="Navbar-container">
        <Link to="/" className="Navbar-logo">
          MovieApp
        </Link>
        <ul className="Navbar-links">
          <li>
            <Link to="/" className="Navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="Navbar-link">
              Login
            </Link>
          </li>
          <li>
            <Link to="/dash" className="Navbar-link">
              Add Movie
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
