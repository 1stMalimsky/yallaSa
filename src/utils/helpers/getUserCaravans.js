import axios from "axios";

const getUserCaravans = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/caravans/usercaravans/${userId}`
    );
    //console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default getUserCaravans;
