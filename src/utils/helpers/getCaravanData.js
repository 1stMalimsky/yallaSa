import axios from "axios";

const getCarvanData = async (caravanId) => {
  try {
    const caravanSearchResult = await axios.get(
      `http://localhost:5000/api/caravans/${caravanId}`
    );
    return caravanSearchResult.data;
  } catch (err) {
    console.log("getCaravanErr", err);
  }
};

export default getCarvanData;
