import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AdminNavbar from "../Components/AdminNavbar";

const AdminD = () => {
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    const data = {
      email: sessionStorage.getItem("admin"),
    };
    axios.post("http://localhost:8000/get_admin", data).then((response) => {
      setCurrentAdmin({
        username: response.data.username,
        email: response.data.email,
      });
    });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen pb-12 bg-gray-900 text-white">
        {currentAdmin ? (
          <>
            <h1 className="text-4xl text-center text-purple-700 font-bold mt-8">
              Welcome,{" "}
              <span className="text-5xl text-purple-800">
                {currentAdmin.username}
              </span>
            </h1>
            <div className="w-96 p-12 mt-6 mx-auto bg-gray-800 border border-gray-700 rounded-md shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl mb-4">
                <span className="text-blue-500 font-semibold">Username:</span>{" "}
                {currentAdmin.username}
              </h3>
              <h3 className="text-2xl">
                <span className="text-blue-500 font-semibold">Email:</span>{" "}
                {currentAdmin.email}
              </h3>
            </div>
          </>
        ) : (
          <div className="w-full h-full text-red-600 text-6xl cardo mt-48 flex items-center justify-center">
            Login First!!!
          </div>
        )}
      </div>
    </>
  );
};

AdminD.propTypes = {
  currentAdmin: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    // Add other prop types for the remaining fields if needed
  }),
};

export default AdminD;
