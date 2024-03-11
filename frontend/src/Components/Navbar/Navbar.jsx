import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container containerr">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <Link to="/">
              <li>Home</li>
            </Link>

            <Link to="/adminlogin">
              <li>Admin Login</li>
            </Link>

            <Link to="/login">
              <li>User Login</li>
            </Link>
          </ul>
          <h1 className="logo">Navbar</h1>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
