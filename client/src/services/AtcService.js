import axios from "axios";

const getATCData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/atc");
    return response.data;
  } catch (error) {
    console.error("Error fetching ATC data:", error);
    throw error;
  }
};

export default getATCData;
