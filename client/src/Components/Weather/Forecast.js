// import React from "react";
// import { formatToLocalTime } from "../services/weatherService";

// function Forecast({ title, items }) {
//   return (
//     <div>
//       <div className="flex items-center justify-start mt-6">
//         <p className="text-white font-medium uppercase">{title}</p>
//       </div>
//       <hr className="my-2" />
//       <div className="flex flex-row items-center justify-between text-white">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center justify-center"
//           >
//             <p className="font-light text-sm">
//               {formatToLocalTime(item.dt, item.timezone, "hh:mm a")}
//             </p>
//             <img
//               src="http://kyunsan.iptime.org:8001/img"
//               alt="weather icon"
//               className="w-12 my-1"
//             />
//             <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Forecast;
