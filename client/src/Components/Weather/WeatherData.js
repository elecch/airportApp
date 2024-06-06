import React, { useEffect, useState } from "react";
import getFormattedWeatherData from "../../services/WeatherService";
import TopButtons from "./TopButtons";
import Inputs from "./Inputs";
import TimeAndLocation from "./TimeAndLocation";
import TemperatureAndDetails from "./TemperatureAndDetails";
import "../../styles/weatherData.css";

const WeatherData = () => {
  const [query, setQuery] = useState({ q: "RKSI" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({
          airportCode: query.q,
          units,
        });
        setWeather(data);
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    };

    fetchWeather();
  }, [query, units]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <div className="content">
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        <TimeAndLocation weather={weather} />
        <TemperatureAndDetails weather={weather} units={units} />
        {/* <Forecast title="hourly forecast" items={weather.hourly || []} />
        <Forecast title="daily forecast" items={weather.daily || []} /> */}
      </div>
    </div>
  );
};

export default WeatherData;
