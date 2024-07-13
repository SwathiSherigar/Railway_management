import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    train_num: 1,
    email: '',
    journey_date: '2024-03-03',
    coach: 'class1A',
    seatsbooked: 2,
    passengers: [
      {
        name: '',
        age: '',
        email: '',
        phone: '',
        gender: 'Male',
      },
    ],
  });

  const navigate = useNavigate();

  const handlePassengerInputChange = (index, e) => {
    const newPassengers = [...formData.passengers];
    newPassengers[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      passengers: newPassengers,
    });
  };

  const handleAddPassenger = () => {
    setFormData({
      ...formData,
      passengers: [...formData.passengers, { name: '', age: '', email: '', phone: '', gender: 'Male' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/make_booking', formData);

      if (response.status === 200) {
        // Save response data to session storage
        sessionStorage.setItem('billDetails', JSON.stringify(response.data));
        
        // Navigate to the bill page
        navigate("/bill");
      } else {
        console.error('Failed to make booking');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col md:flex-row bg-white p-8 rounded shadow-lg w-full max-w-screen-lg">
          <div className="md:w-1/2 mb-4 md:mb-0 pr-4">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Booking Form</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Train Number:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                name="train_num"
                value={formData.train_num}
                onChange={(e) => setFormData({ ...formData, train_num: e.target.value })}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Journey Date:</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                name="journey_date"
                value={formData.journey_date}
                onChange={(e) => setFormData({ ...formData, journey_date: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Coach:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                name="coach"
                value={formData.coach}
                onChange={(e) => setFormData({ ...formData, coach: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Seats Booked:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                name="seatsbooked"
                value={formData.seatsbooked}
                onChange={(e) => setFormData({ ...formData, seatsbooked: e.target.value })}
              />
            </div>
              <div className="mb-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
       
          <div className="md:w-1/2">
            {/* Passenger inputs */}
            {/* Add Passenger button */}
            <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Passengers:</label>
            {formData.passengers.map((passenger, index) => (
              <div key={index} className="mb-4 border p-4 rounded">
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder={`Name of Passenger ${index + 1}`}
                  name="name"
                  value={passenger.name}
                  onChange={(e) => handlePassengerInputChange(index, e)}
                />
                <input
                  type="number"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Age"
                  name="age"
                  value={passenger.age}
                  onChange={(e) => handlePassengerInputChange(index, e)}
                />
                <input
                  type="email"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Email"
                  name="email"
                  value={passenger.email}
                  onChange={(e) => handlePassengerInputChange(index, e)}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Phone"
                  name="phone"
                  value={passenger.phone}
                  onChange={(e) => handlePassengerInputChange(index, e)}
                />
                <label className="block text-sm font-semibold mb-1">Gender:</label>
                <select
                  className="w-full p-2 border rounded mb-2"
                  name="gender"
                  value={passenger.gender}
                  onChange={(e) => handlePassengerInputChange(index, e)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              type="button"
              onClick={handleAddPassenger}
            >
              Add Passenger
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
