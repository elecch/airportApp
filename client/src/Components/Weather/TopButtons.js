import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    { id: 1, title: "RKSI" },
    { id: 2, title: "RKSS" },
    { id: 3, title: "RKPC" },
    { id: 4, title: "RKPK" },
    { id: 5, title: "RKNY" },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
