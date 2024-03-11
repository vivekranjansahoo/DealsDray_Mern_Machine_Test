import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Adminnav = () => {
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
            <Link to="/admindashboard">
              <li>Home</li>
            </Link>
            <Link to="/admin/empdetails">
              <li>All EmpDetails</li>
            </Link>
            <Link to="/admin/empadd">
              <li>Add Emp</li>
            </Link>
          </ul>
          <h1 className="logo">Navbar</h1>
        </div>
      </nav>
    </>
  );
};

export default Adminnav;
