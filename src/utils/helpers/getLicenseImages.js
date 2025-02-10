import axios from "axios";

const getLicenseImages = async (caravanId) => {
  try {
    const foundImages = await axios.get(
      `/images/getlicenseimages/${caravanId}`
    );
    if (foundImages && foundImages.data) {
      //console.log("foundImages", foundImages.data.images);
      return foundImages.data.images;
    } else return;
  } catch (err) {
    console.log("getLicenseImages err", err);
  }
};

export default getLicenseImages;
