import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Components/AdminNavbar';

const TrainTable = () => {
  const [trains, setTrains] = useState([]);
  const [editableTrains, setEditableTrains] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [trainsDictionary, setTrainsDictionary] = useState({});

  useEffect(() => {
    fetchTrains();
  }, []);

  const formatSecondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const fetchTrains = async () => {
    try {
      const response = await axios.get('http://localhost:8000/showtrain');
      setTrains(response.data.trains || []);

      const trainsDictionary = {};
      response.data.trains.forEach(train => {
        trainsDictionary[train.train_num] = train;
      });

      setTrainsDictionary(trainsDictionary);
    } catch (error) {
      console.error('Error fetching trains:', error);
    }
  };

  const handleUpdate = async (train_num) => {
    try {
      const updatedData = { ...trainsDictionary[train_num], ...editedData };
      await axios.put(`http://localhost:8000/update_train/${train_num}`, updatedData);
      console.log('Train updated successfully');
      fetchTrains();
      setEditableTrains([]);
      setEditedData({});
    } catch (error) {
      console.error('Error updating train:', error);
    }
  };

  const handleDelete = async (train_num) => {
    try {
      await axios.delete(`http://localhost:8000/delete_train/${train_num}`);
      console.log('Train deleted successfully');
      fetchTrains();
      setEditableTrains([]);
      setEditedData({});
    } catch (error) {
      console.error('Error deleting train:', error);
    }
  };

  const startEditing = (train_num) => {
    setEditableTrains((prevEditableTrains) => [...prevEditableTrains, train_num]);
    setEditedData(trainsDictionary[train_num] || {});
  };

  const stopEditing = (train_num) => {
    setEditableTrains((prevEditableTrains) => prevEditableTrains.filter((train) => train !== train_num));
    setEditedData({});
  };

  const isEditable = (train_num) => editableTrains.includes(train_num);

  const handleInputChange = (key, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const keyValuePairTrains = trains.map((train, index) => {
    const keys = [
      'train_num', 'train_name', 'origin', 'destination', 'arrival', 'departure',
      'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun',
      'class1A', 'class2A', 'class3A', 'sleeper', 'general',
      'vacancy_1A', 'vacancy_2A', 'vacancy_3A', 'vacancy_sl', 'vacancy_gl'
    ];

    return Object.fromEntries(keys.map((key, index) => [key, train[key]]));
  });

  return (
    <>
      <div>
        <AdminNavbar />
      </div>
      <div>
        <table className="table-auto show-result mx-auto mt-6 rounded-md text-white bg-gray-800 border-collapse w-full">
          <thead>
          <tr className="border-b border-white">
            <th className="text-center p-2 ">Train Number</th>
            <th className="text-center p-2">Train Name</th>
            <th className="text-center p-2">Class 1A</th>
           
            <th className="text-center p-2">Class 2A</th>
            <th className="text-center p-2">Class 3A</th>
            <th className="text-center p-2">Sleeper</th>
            <th className="text-center p-2">General</th>
            <th className="text-center p-2">Origin</th>
            <th className="text-center p-2">Destination</th>
            <th className="text-center p-2">Arrival</th>
            <th className="text-center p-2">Departure</th>
            <th className="text-center p-2">Mon</th>
            <th className="text-center p-2">Tue</th>
            <th className="text-center p-2">Wed</th>
            <th className="text-center p-2">Thu</th>
            <th className="text-center p-2">Fri</th>
            <th className="text-center p-2">Sat</th>
            <th className="text-center p-2">Sun</th>
            <th className="text-center p-2">Vacancy 1A</th>
            <th className="text-center p-2">Vacancy 2A</th>
            <th className="text-center p-2">Vacancy 3A</th>
            <th className="text-center p-2">Vacancy SL</th>
            <th className="text-center p-2">Vacancy GL</th>
            <th className="text-center p-2">Actions</th></tr>
          </thead>
          <tbody>
            {keyValuePairTrains.map((train, index) => (
              <tr key={`${train.train_num}_${index}`} className={`border-b border-white ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}`}>
               <td className="text-center p-2 overflow-hidden overflow-ellipsis ">{train.train_num}</td>
              <td className="text-center p-2 overflow-hidden overflow-ellipsis">{train.train_name}</td>
              <td className="text- p-2">{train.class1A}</td>
              <td className="text-center p-2">{train.class2A}</td>
              <td className="text-center p-2">{train.class3A}</td>
              <td className="text-center p-2">{train.sleeper}</td>
              <td className="text-center p-2">{train.general}</td>
              <td className="text-center p-2">{train.origin}</td>
              <td className="text-center p-2">{train.destination}</td>
              <td className="text-center p-2">{formatSecondsToTime(trainsDictionary[train.train_num]?.arrival)}</td>
              <td className="text-center p-2">{trainsDictionary[train.train_num]?.departure ? formatSecondsToTime(trainsDictionary[train.train_num]?.departure) : 'N/A'}</td>
              <td className="text-center p-2">{train.mon ? 'Yes' : 'No'}</td>
              <td className="text-center p-2">{train.tue ? 'Yes' : 'No'}</td>
              <td className="text-center p-2">{train.wed ? 'Yes' : 'No'}</td>
              <td className="text-center p-2">{train.thu ? 'Yes' : 'No'}</td>
              <td className="text-center p-2">{train.fri ? 'Yes' : 'No'}</td>
              <td className="text-center p-2">{train.sat ? 'Yes' : 'No'}</td>
              <td className="text-center p-2">{train.sun ? 'Yes' : 'No'}</td>
              <td className="text-center p-2">{train.vacancy_1A}</td>
              <td className="text-center p-2">{train.vacancy_2A}</td>
              <td className="text-center p-2">{train.vacancy_3A}</td>
              <td className="text-center p-2">{train.vacancy_sl}</td>
              <td className="text-center p-2">{train.vacancy_gl}</td>
                <td colSpan={4} style={{ textAlign: 'center' }}>
                  {isEditable(train.train_num) ? (
                    <>
                      <button
                        onClick={() => handleUpdate(train.train_num)}
                        style={{
                          marginRight: '10px',
                          padding: '5px 10px',
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => stopEditing(train.train_num)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(train.train_num)}
                        style={{
                          marginRight: '10px',
                          padding: '5px 10px',
                          backgroundColor: '#2196F3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(train.train_num)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TrainTable;
