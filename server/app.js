const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: "kyunsan.iptime.org",
  port: "3307",
  user: "db_read",
  password: "123456789a",
  database: "whisper",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/weather", (req, res) => {
  const airportCode = req.query.airportCode || "RKSI"; // default to RKSI if no query parameter
  const query = `
    SELECT 
      ICAO, 
      INFO_TIME,
      Air_Temperature, 
      Dew_Temperature, 
      Wind_Direction, 
      Wind_Speed, 
      Visibility, 
      METAR
    FROM Weather 
    WHERE ICAO = ?
    ORDER BY INFO_TIME DESC 
    LIMIT 1
  `;

  app.get("/atc", (req, res) => {
    db.query("SELECT * FROM ATC", (err, results) => {
      if (err) {
        console.error("Failed to fetch ATC data: " + err);
        res.status(500).send("Server error");
        return;
      }

      const baseUrl = "http://kyunsan.iptime.org:8001/";

      // 각 결과 항목의 path를 프록시 URL로 변경
      const modifiedResults = results.map((result) => {
        return {
          ...result,
          path: baseUrl + result.path,
        };
      });

      res.json(modifiedResults);
    });
  });

  db.query(query, [airportCode], (err, results) => {
    if (err) {
      console.error("Failed to fetch weather data: " + err);
      res.status(500).json({ error: "Failed to fetch weather data" });
      return;
    }
    res.json(results[0]);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
