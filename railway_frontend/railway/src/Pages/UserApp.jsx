import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import "./style.css"; 
import AdminNavbar from "../Components/AdminNavbar";

const UserTable = ({ users, onDelete }) => {
  return (
   
    
    <table className="user-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.pid}>
            <td>{user[1]}</td>
            <td>{user[2]}</td>
            <td>{user[4]}</td>
            <td>{user[5]}</td>
            <td>
              <button className="delete-button" onClick={() => onDelete(user[3])}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.array).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const UserApp = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the server when the component mounts
    axios.get("http://localhost:8000/get_users")
      .then((response) => {
        console.log("API Response:", response.data);
        setUsers(response.data.users);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (pid) => {
    // Delete user with the specified ID
    axios.delete(`http://localhost:8000/delete_user/${pid}`)
      .then(() => {
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user[3] !== pid));
        alert("User deleted successfully!");
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <>
    <AdminNavbar/>
    <div className="user-app">
      <h1 style={{color:"white"}}>User List</h1>
      <div className="table-container">
        <UserTable users={users} onDelete={handleDelete} />
      </div>
    </div>
    </>
  );
};

export default UserApp;
