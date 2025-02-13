import axios from "axios";

const getReservations = async (ownerId, type) => {
  try {
    const foundReservations = await axios.get(
      `/reservations/owner/${ownerId}/${type}`
    );
    console.log("foundReservations", foundReservations.data.responseData);

    if (!foundReservations.data) return console.log("no res found");
    else return foundReservations.data.responseData;
  } catch (err) {
    console.error("Error:", err);
  }
};

export default getReservations;
