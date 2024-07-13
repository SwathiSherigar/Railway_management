import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Bill = () => {
  
  const location = useLocation();
  const { passengers, billDetails, userBookingDetails} = location.state || {};


  const handlePrintBill = () => {
    window.print();
  };

  return (
    <>
    <Navbar/>
    <div className="mt-4 mx-auto bg-white p-8 rounded border border-blue-950 max-w-md">
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-800">Booking Bill</h2>
      <div>
        <h3 className="text-2xl text-blue-800 font-semibold mb-2">Passenger Details</h3>
        <ul>
          {passengers && passengers.map((passenger, index) => (
            <li className="text-lg" key={index}>
           
      
              <span className="font-semibold">Name:</span> {passenger.name},{' '}
              <br></br>
              <span className="font-semibold">Age:</span> {passenger.age},{' '}
              <br></br>
              <span className="font-semibold">Email:</span> {passenger.email},{' '}
              <br></br>
              <span className="font-semibold">Phone:</span> {passenger.phone}
              <hr></hr>
            </li>
          ))}
        </ul>
       
      </div>
      <div className="mt-4">
        <h3 className="text-2xl text-blue-800 font-semibold mb-2">Booking Fare Details</h3>
        
        <p className="text-lg">Fare: ${billDetails ? billDetails.fare : ''}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl text-blue-800 font-semibold mb-2">User Booking Details</h3>
        <p className="text-lg">Train Number: {userBookingDetails ? userBookingDetails.train_num : ''}</p>
        <p className="text-lg">Coach: {userBookingDetails ? userBookingDetails.coach : ''}</p>
        <p className="text-lg">Journey Date: {userBookingDetails ? userBookingDetails.journey_date : ''}</p>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handlePrintBill}
        >
          Print Bill
        </button>
      </div>
    </div>
    </>
  );
};

export default Bill;
