import axios from "axios";

const getCaravanImages = async (caravanId) => {
  try {
    const caravanImages = await axios.get(`/caravans/images/${caravanId}`);
    if (caravanImages) {
      //console.log("caravanImages lodaed", caravanImages.data);
    }
    if (!caravanImages || caravanImages.data.caravanImages.length < 1) {
      return console.log("no caravan found");
    }
    return caravanImages.data;
  } catch (err) {
    console.log("get caravan images error", err);
  }
};

export default getCaravanImages;
