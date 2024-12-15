import axios from "axios";

const availableCaravanSearch = async (startDate, endDate, page, limit) => {
  try {
    const availableCaravanList = await axios.get(
      `/caravans/searchbydate/${startDate}/${endDate}`,
      {
        params: {
          page: page,
          limit: limit,
        },
      }
    );
    return availableCaravanList;
  } catch (err) {
    console.log("frontend caravan search error", err);
  }
};

export default availableCaravanSearch;
