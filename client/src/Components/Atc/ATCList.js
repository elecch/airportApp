import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import getATCData from "../../services/AtcService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";

const ATCList = () => {
  const [atcData, setAtcData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getATCData();
        setAtcData(data);
        setFilteredData(data); // 초기 필터링 데이터 설정
      } catch (error) {
        console.error("Error fetching ATC data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const newFilteredData = atcData.filter((item) => {
      const itemDate = new Date(item.time);
      const itemDateKST = new Date(itemDate.getTime() + 9 * 60 * 60 * 1000);
      const selectedDateKST = startDate
        ? new Date(startDate.getTime() + 9 * 60 * 60 * 1000)
        : null;

      const matchesDate = selectedDateKST
        ? itemDateKST.toISOString().split("T")[0] ===
          selectedDateKST.toISOString().split("T")[0]
        : true;

      return matchesDate;
    });

    setFilteredData(newFilteredData);
  };

  const handlePlayAudio = (path) => {
    setAudioSrc(path);
  };

  return (
    <Container>
      <h1 className="text-center mt-4" style={{ fontSize: "2rem" }}>
        ATC Data
      </h1>
      <Form>
        <InputGroup className="my-3">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            placeholderText="Select a date"
          />
          <Button
            variant="primary"
            onClick={handleSearch}
            style={{ marginLeft: "10px" }}
          >
            <FaSearch />
          </Button>
        </InputGroup>
      </Form>
      {audioSrc && (
        <div className="mb-3">
          <audio controls src={audioSrc} style={{ width: "100%" }}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Radio Code</th>
            <th>Script</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.time}</td>
              <td>{item.radio_code}</td>
              <td>{item.script}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handlePlayAudio(item.path)}
                >
                  Play
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ATCList;
