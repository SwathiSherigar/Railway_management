import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
function Navbar({ currentUser, setCurrentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="work bg-gray-700">
      <div className=" flex items-center justify-center gap-0 px-2">
        {/* <img className="w-fit h-14" src="./locomotive.webp" alt="logo" /> */}
      <Link to="/" className="title poppins">
        RouteRover
      </Link></div>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/findtrain">Find Train</NavLink>
        </li>
        
        <li>
          <NavLink to="/reservation">Reservation</NavLink>
        </li>
       
        
       <li><NavLink to="/contact">Contact</NavLink></li>
          
       
       
      </ul>
    </nav>
  );
}
Navbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired, // Adjust the prop type according to your 'currentUser' data structure
};
export default Navbar;
