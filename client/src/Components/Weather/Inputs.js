import React, { useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";

const airports = [
  "RKSI",
  "RKSS",
  "RKPC",
  "RKPK",
  "RKNY",
  "RKNW",
  "RKTU",
  "RKTN",
  "RKTH",
  "RKJJ",
  "RKJB",
  "RKJY",
  "RKPU",
];

function Inputs({ setQuery, units, setUnits }) {
  const [selectedAirport, setSelectedAirport] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (selectedAirport !== "") setQuery({ q: selectedAirport });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-6 items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-row items-center space-x-4">
        <select
          value={selectedAirport}
          onChange={(e) => setSelectedAirport(e.currentTarget.value)}
          className="text-xl font-light p-2 w-full md:w-64 bg-white text-black rounded-md shadow-md focus:outline-none capitalize placeholder:lowercase"
        >
          <option value="" disabled>
            공항을 선택하세요
          </option>
          {airports.map((airport) => (
            <option key={airport} value={airport}>
              {airport}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearchClick}
          className="bg-blue-500 text-white p-2 rounded-md shadow-md transition ease-out hover:bg-blue-600 focus:outline-none"
        >
          <UilSearch size={25} />
        </button>
      </div>

      <div className="flex flex-row items-center space-x-4">
        <button
          name="metric"
          className={`text-xl font-light transition ease-out hover:scale-125 ${
            units === "metric" ? "text-blue-500" : "text-white"
          }`}
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className={`text-xl font-light transition ease-out hover:scale-125 ${
            units === "imperial" ? "text-blue-500" : "text-white"
          }`}
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
