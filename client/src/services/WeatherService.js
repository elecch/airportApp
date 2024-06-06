import { DateTime } from "luxon";

// 데이터베이스에서 날씨 데이터를 가져오는 함수
const getWeatherData = (searchParams) => {
  const url = new URL(`http://localhost:3001/weather`);
  url.search = new URLSearchParams(searchParams);

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch weather data`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
};

const formatCurrentWeather = (data) => {
  const {
    ICAO,
    INFO_TIME,
    AIRPORT_NAME,
    METAR,
    Air_Temperature,
    Dew_Temperature,
    QNH,
    Wind_Direction,
    Wind_Speed,
    Visibility,
  } = data;

  return {
    ICAO,
    INFO_TIME,
    AIRPORT_NAME,
    METAR,
    Air_Temperature,
    Dew_Temperature,
    QNH,
    Wind_Direction,
    Wind_Speed,
    Visibility,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData(searchParams).then(
      formatCurrentWeather
    );

    return formattedCurrentWeather;
  } catch (error) {
    console.error("Error getting formatted weather data:", error);
    throw error;
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;
export { formatToLocalTime };
