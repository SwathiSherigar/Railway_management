// AddRoute.js
import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import AdminNavbar from "../../Components/AdminNavbar";
const AddRoute = ({ currentAdmin }) => {
  const [formData, setFormData] = useState({
    serial_no: "",
    train_num: "",
    city: "",
    time:"",
    cost_1A: "",
    cost_2A: "",
    cost_3A: "",
    cost_sleeper: "",
    cost_general: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/add_route", formData);

      if (response.status === 200) {
        alert("Route added successfully!!!");
        console.log("Route added successfully!");
      }
    } catch (error) {
      alert("Error adding route!");
      console.error("Error:", error);
    }
  };

  return (
    <>
<AdminNavbar/>
   
 
    <div className="w-full h-full py-16 work bg-gray-900">
      {currentAdmin === null ? (
        <div className="w-full h-full text-red-600 text-6xl cardo mt-48 flex items-center justify-center">
          Login First!!!
        </div>
      ) : (
        <div className="bg-grey-lighter h-fit flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-gray-100 px-6 py-8 rounded border border-black shadow-md text-black w-full">
              <h1 className="mb-8 text-4xl text-center cardo">Add a Route</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="serial_no"
                  placeholder="Serial Number"
                  value={formData.serial_no}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="train_num"
                  placeholder="Train Number"
                  value={formData.train_num}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="time"
              placeholder="Time"
              value={formData.time}
              onChange={handleInputChange}
            />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="cost_1A"
                  placeholder="1A Price"
                  value={formData.cost_1A}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="cost_2A"
                  placeholder="2A Price"
                  value={formData.cost_2A}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="cost_3A"
                  placeholder="3A Price"
                  value={formData.cost_3A}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="cost_sleeper"
                  placeholder="Sleeper Price"
                  value={formData.cost_sleeper}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="cost_general"
                  placeholder="General Price"
                  value={formData.cost_general}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-orange-500 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Add Route
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};
AddRoute.propTypes = {
  currentAdmin: PropTypes.object,
 
};
AddRoute.defaultProps = {
  setCurrentAdmin: () => {},
  // other default props
};

export default AddRoute;
