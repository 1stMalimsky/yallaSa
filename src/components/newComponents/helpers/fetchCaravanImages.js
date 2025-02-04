import axios from "axios";

const fetchCaravanImages = async (caravanId, setState) => {
  try {
    const caravanPhotos = await axios.get(`/caravans/images/${caravanId}`);
    if (caravanPhotos.data.caravanImages.length < 1) {
      return console.log("no caravan found");
    }
    setState(caravanPhotos.data.caravanImages);
    return caravanPhotos.data.caravanImages;
  } catch (err) {
    console.log("caravan photo search error", err);
  }
};

export default fetchCaravanImages;
