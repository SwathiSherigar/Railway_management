import React, { Component } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

import TrainSearchResults from "../Components/TrainSearchResults";

// import backgroundImage from "../../images/3.jpg";

class FindTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOption: "SEARCH by station",
      from: " ", // Add default values here
      to: " ",
      name: "Train Name",
      number: " ",
      trains: [],
    };
  }

  handleOptionChange = (event) => {
    this.setState({ searchOption: event.target.value });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleReset = () => {
    this.setState({
      searchOption: "SEARCH by station",
      from: "",
      to: "",
      name: "",
      number: "",
      trains: [],
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
  
    // Construct the API URL based on the search options
    let apiUrl = "http://localhost:8000/trains"; // The API endpoint to fetch train data
  
    if (this.state.searchOption === "SEARCH by station") {
      apiUrl += `?searchOption=SEARCH%20by%20station&origin=${this.state.from}&destination=${this.state.to}`;
    } else if (this.state.searchOption === "SEARCH by name") {
      apiUrl += `?searchOption=SEARCH%20by%20name&name=${this.state.name}`;
    } else if (this.state.searchOption === "SEARCH by number") {
      apiUrl += `?searchOption=SEARCH%20by%20number&number=${this.state.number}`;
    }
  
    try {
      const response = await axios.get(apiUrl);
      const data = response?.data || []; // Use optional chaining to safely access data
  
      this.setState({ trains: data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
    // const backgroundStyle = {
    //   // backgroundImage: `url("../images/3.jpg")`,
    //   // backgroundSize: 'cover',
    //   // backgroundPosition: 'center',
    //   height: '100vh', 
    //   // backgroundRepeat: 'no-repeat'
    // backgroundColor: '#111827'
    // };

    return (
      <>
         <div>
    <Navbar/>
      
    </div>
      <div className="text-center min-h-screen py-16 bg-gray-900">
        <h1 className="text-6xl text-center mt-4 cardo text-white" >Find Train</h1>
     
        <form
          onSubmit={this.handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-fit px-80 py-10 mt-4 raleway rounded-lg">
            <div className="flex w-fit items-center justify-between mx-auto mb-6 ">
              <div className="w-full px-3">
                <label className="block text-white text-sm font-bold mb-2">
                  Search by
                </label>
                <select
                  name="searchOption"
                  value={this.state.searchOption}
                  onChange={this.handleOptionChange}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="SEARCH by station">SEARCH by station</option>
                  <option value="SEARCH by name">SEARCH by name</option>
                  <option value="SEARCH by number">SEARCH by number</option>
                </select>
              </div>
              {this.state.searchOption === "SEARCH by station" && (
                <div className="w-full px-3">
                  <label className="block text-white text-sm font-bold mb-2">
                    From
                  </label>
                  <input
                    type="text"
                    name="from"
                    value={this.state.from}
                    onChange={this.handleInputChange}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              )}
              {this.state.searchOption === "SEARCH by station" && (
                <div className="w-full px-3">
                  <label className="block text-white text-sm font-bold mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    name="to"
                    value={this.state.to}
                    onChange={this.handleInputChange}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              )}
              {this.state.searchOption === "SEARCH by name" && (
                <div className="w-full px-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              )}
              {this.state.searchOption === "SEARCH by number" && (
                <div className="w-full px-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleInputChange}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="ml-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        <div className="show-result mx-auto mt-6  text-white font-bold rounded-md w-11/12">
          {this.state.trains.length > 0 ? (
            <TrainSearchResults trains={this.state.trains} />

          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
      </>
    );
  }
}

export default FindTrain;
