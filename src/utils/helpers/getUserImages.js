import axios from "axios";

const getUserImages = async (userId) => {
  try {
    const foundImages = await axios.get(`/images/getuserimages/${userId}`);
    if (foundImages && foundImages.data) {
      //console.log("foundImages", foundImages.data.images);
      return foundImages.data.images;
    } else return;
  } catch (err) {
    console.log("getUserImages err", err);
  }
};

export default getUserImages;
