import React, { useState, useEffect } from "react";

function TemperatureAndDetails({
  weather: {
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
  } = {},
  units,
}) {
  const [imageSrc, setImageSrc] = useState("");

  const calculateSimpleCurTime = () => {
    const now = new Date();
    const simpleCurTime =
      now.getUTCFullYear().toString().slice(2) +
      ("0" + (now.getUTCMonth() + 1)).slice(-2) +
      ("0" + now.getUTCDate()).slice(-2) +
      ("0" + now.getUTCHours()).slice(-2) +
      ("0" + now.getUTCMinutes()).slice(-2);

    let simpleCurTimeInt = parseInt(simpleCurTime);

    let minutesInt = parseInt(("0" + now.getUTCMinutes()).slice(-2));

    if (parseInt(("0" + now.getUTCHours()).slice(-2)) === 0) {
      if (minutesInt < 4) {
        simpleCurTimeInt += 2400;
      }
    }

    if (minutesInt < 4) {
      simpleCurTimeInt -= 40;
    }

    // 홀수 시간일 때는 직전 시간으로 변경
    if (simpleCurTimeInt % 2 === 1) {
      simpleCurTimeInt -= 1;
    }

    // 4분을 빼기(6분빼기로 정정)
    simpleCurTimeInt -= 6;

    return simpleCurTimeInt;
  };

  useEffect(() => {
    const simpleCurTime = calculateSimpleCurTime();
    const filename = `k2a_ami_le1b_true+ir_ko020lc_20${simpleCurTime}.thn.png`;
    const imageUrl = `/img/${filename}`;
    setImageSrc(imageUrl);
  }, []);

  const convertTemperature = (temp) => {
    if (units === "imperial") {
      return ((temp * 9) / 5 + 32).toFixed();
    }
    return temp.toFixed();
  };

  const temperatureUnit = units === "imperial" ? "°F" : "°C";

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{AIRPORT_NAME}</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-gray-200 p-4 rounded-lg shadow-md flex items-center justify-center">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="위성사진"
              className="w-full h-auto max-h-96 object-contain"
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <div className="col-span-2 grid grid-rows-2 grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold text-gray-700">
              {Air_Temperature !== undefined
                ? `${convertTemperature(Air_Temperature)}${temperatureUnit}`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-2">기온 (Air Temperature)</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold text-gray-700">
              {Dew_Temperature !== undefined
                ? `${convertTemperature(Dew_Temperature)}${temperatureUnit}`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              이슬점 (Dew Temperature)
            </p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold text-gray-700">
              {Wind_Direction !== undefined
                ? `${Wind_Direction.toFixed()}° at ${Wind_Speed.toFixed()} knot`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-2">풍향/풍속 (Wind)</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold text-gray-700">
              {Visibility !== undefined ? `${Visibility.toFixed()} m` : "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-2">시정 (Visibility)</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center justify-center mt-4">
        <p className="text-xl text-gray-700">{METAR}</p>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center justify-center mt-4">
        <div>
          <p className="text-sm text-gray-500">
            관측 시간 (Observation Time):{" "}
            <span className="font-medium">
              {new Date(INFO_TIME).toLocaleString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
