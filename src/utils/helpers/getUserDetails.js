import axios from "axios";

const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    console.log("getUserDetails error", err);
  }
};

export default getUserDetails;
