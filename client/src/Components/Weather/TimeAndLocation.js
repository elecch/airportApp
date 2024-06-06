import React from "react";

function TimeAndLocation({ weather: { ICAO, INFO_TIME } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${ICAO}, ${INFO_TIME}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
