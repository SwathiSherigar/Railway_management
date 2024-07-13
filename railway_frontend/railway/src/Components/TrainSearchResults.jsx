import React from 'react';
import PropTypes from 'prop-types';
class TrainSearchResults extends React.Component {
  render() {
    return (
      <div className="show-result mx-auto mt-6 text-white font-bold rounded-md w-11/12 border border-white p-4 overflow-auto">
        {this.props.trains.length > 0 ? (
          <table className="table-auto w-full bg-gray-800 border-collapse">
            <thead>
              <tr className="border-b border-white">
                <th className="p-2">Train Number</th>
                <th className="p-2">Train Name</th>
                <th className="p-2">Class 1A Price</th>
                <th className="p-2">Class 2A Price</th>
                <th className="p-2">Class 3A Price</th>
                <th className="p-2">Sleeper Price</th>
                <th className="p-2">General Price</th>
                <th className="p-2">Origin</th>
                <th className="p-2">Destination</th>
                <th className="p-2">Arrival Time</th>
                <th className="p-2">Departure Time</th>
                <th className="p-2">Mon</th>
                <th className="p-2">Tue</th>
                <th className="p-2">Wed</th>
                <th className="p-2">Thu</th>
                <th className="p-2">Fri</th>
                <th className="p-2">Sat</th>
                <th className="p-2">Sun</th>
                <th className="p-2">Vacancy 1A</th>
                <th className="p-2">Vacancy 2A</th>
                <th className="p-2">Vacancy 3A</th>
                <th className="p-2">Vacancy Sleeper</th>
                <th className="p-2">Vacancy General</th>
              </tr>
            </thead>
            <tbody>
              {this.props.trains.map((train, index) => (
                <tr key={train.train_num} className={`border-b border-white ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}`}>
                  <td className="p-2 overflow-hidden overflow-ellipsis text-center">{train.train_num}</td>
                  <td className="p-2 overflow-hidden overflow-ellipsis">{train.train_name}</td>
                  <td className="p-2 text-center">{train.class1A}</td>
                  <td className="p-2 text-center">{train.class2A}</td>
                  <td className="p-2 text-center">{train.class3A}</td>
                  <td className="p-2 text-center">{train.sleeper}</td>
                  <td className="p-2 text-center">{train.general}</td>
                  <td className="p-2">{train.origin}</td>
                  <td className="p-2">{train.destination}</td>
                  <td className="p-2 text-center">{train.arrival}</td>
                  <td className="p-2 text-center">{train.departure}</td>
                  <td className="p-2 text-center">{train.mon}</td>
                  <td className="p-2 text-center">{train.tue}</td>
                  <td className="p-2 text-center">{train.wed}</td>
                  <td className="p-2 text-center">{train.thu}</td>
                  <td className="p-2 text-center">{train.fri}</td>
                  <td className="p-2 text-center">{train.sat}</td>
                  <td className="p-2 text-center">{train.sun}</td>
                  <td className="p-2 text-center">{train.vacancy_1A}</td>
                  <td className="p-2 text-center">{train.vacancy_2A}</td>
                  <td className="p-2 text-center">{train.vacancy_3A}</td>
                  <td className="p-2 text-center">{train.vacancy_sl}</td>
                  <td className="p-2 text-center">{train.vacancy_gl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No search results available</p>
        )}
      </div>
    );
  }
}
TrainSearchResults.propTypes = {
  trains: PropTypes.array.isRequired,
};

export default TrainSearchResults;
