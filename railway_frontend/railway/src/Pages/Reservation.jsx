import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Reservation = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [trains, setTrains] = useState([]);
  const [showBook, setShowBook] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let apiUrl = "http://localhost:8000/reservation";
    apiUrl += `?origin=${from}&destination=${to}`;

    try {
      const response = await axios.post(apiUrl);
      const data = response?.data || [];
      setTrains(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleButtonClick = () => {
    setShowBook((prevShowBook) => !prevShowBook);
    navigate("/booking");
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="px-8 py-4 bg-gray-900 min-h-screen ">
        <h1 className="text-6xl text-center mt-4 cardo text-white " style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold", fontSize: "50px", color: "white" }}>Reservation</h1>
        <br></br>
        <div className="input-details items-center justify-center w-11/12 border rounded-md px-8 py-6 mx-auto raleway flex flex-col bg-gray-100">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
              <label htmlFor="from" className="block w-full  text-gray-700 text-sm font-bold mb-2">
                From
              </label>
              <input
                className="w-full border px-3 py-2 border-gray-600 rounded"
                type="text"
                name="from"
                value={from}
                placeholder="From"
                required
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="to" className="block text-gray-700 text-sm font-bold mb-2">
                To
              </label>
              <input
                className="w-full border px-3 py-2 border-gray-600 rounded"
                type="text"
                name="to"
                placeholder="To"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <button className="bg-orange-500 text-white rounded-md mt-2 px-6 py-2">
              search
            </button>
          </form>
        </div>
        <div className="show-trains mt-8 w-11/12 mx-auto p-2 rounded-md">
          {trains && trains.length > 0 ? (
            <div>
              <p className="text-white font-bold mb-2">Available Trains:</p>
              {trains.map((train) => (
                <div key={train.train_num} className="mb-4 border p-4 rounded-md flex justify-between items-center bg-gray-100">
                  <div>
                    <p>{`Train Name: ${train.train_name}, Train Number: ${train.train_num}`}</p>
                  </div>
                  <button
                    onClick={handleButtonClick}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "white" }}>No trains found for the given  origin, and destination.</p>
          )}
        </div>
       
      
      </div>
    </>
  );
};

export default Reservation;
