import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink,useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
// ... (imports and other code)

function AdminNavbar({ currentAdmin, setCurrentAdmin }) {
    const [menuOpen, setMenuOpen] = useState(false);
  const histroy=useNavigate();
    return (
      <nav className="work bg-gray-700">
        <div className="flex items-center justify-center gap-0 px-2">
          {/* <img className="w-fit h-14" src="./locomotive.webp" alt="logo" /> */}
          <Link to="/" className="title poppins">
            RouteRover
          </Link>
        </div>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/admin-dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/addtrain">Add Train</NavLink>
          </li>
          <li>
            <NavLink to="/user">View user</NavLink>
          </li>
          <li>
            <NavLink to="/addroute">Add Routes</NavLink>
          </li>
          <li>
          <Link to="/viewtrains">View Trains</Link>
     
      </li>
          {currentAdmin === null ? (
            <li>
              <NavLink to="/admin">LogIn</NavLink>
            </li>
          ) : null}
          {currentAdmin && currentAdmin.username && (
            <div className="flex justify-center items-center flex-col mx-2">
              <h3 className="text-center justify-center">Hi </h3>
              <p className="text-white font-medium">{currentAdmin.username}</p>
            </div>
          )}
          {currentAdmin === null ? null : (
            <button
              onClick={() => {sessionStorage.clear();histroy('/admin')}}
              className="bg-gray-900 rounded-lg py-0 mx-2 px-4"
            >
              Log Out
            </button>
          )}
        </ul>
      </nav>
    );
  }
  
  AdminNavbar.propTypes = {
    currentAdmin: PropTypes.object,
    setCurrentAdmin: PropTypes.func,
  };
  
  export default AdminNavbar;
  