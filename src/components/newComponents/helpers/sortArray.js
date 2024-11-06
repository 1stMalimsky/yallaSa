import { sortByProximity } from "./calculateDistance";

const sortArray = async (sortPick, setState, arr, userLocation) => {
  console.log("sort Array array", arr);

  switch (sortPick) {
    case "numOfBeds":
      setState([...arr].sort((a, b) => a.beds - b.beds));
      break;
    case "location":
      const newState = await sortByProximity(userLocation, arr);
      console.log("newState", newState);

      //setState(newState);
      break;
    case "price":
      setState([...arr].sort((a, b) => b.pricePerNight - a.pricePerNight));
      break;
    default:
      console.log("default break");
      break;
  }
};

export default sortArray;
