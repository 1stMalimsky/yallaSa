import {
  kitchenList,
  bathroomList,
  safetyList,
  livingList,
  physicalList,
} from "../../addCaravanDetails/helpers/acc6facilitiesList.js";

const normalizeFacilities = (serverData) => {
  console.log("serverData in normaalize", serverData);

  return {
    kitchen: Object.entries(serverData.kitchen || {})
      .filter(([key, value]) => value) // Only keep `true` values
      .map(([key]) => ({ [key]: kitchenList[key] })),

    bathroom: Object.entries(serverData.bathroom || {})
      .filter(([key, value]) => value)
      .map(([key]) => ({ [key]: bathroomList[key] })),

    safety: Object.entries(serverData.vehicleProps || {})
      .filter(([key, value]) => value)
      .map(([key]) => ({ [key]: safetyList[key] })),

    comfort: Object.entries(serverData.caravanProps || {})
      .filter(([key, value]) => value)
      .map(([key]) => ({ [key]: livingList[key] })),
  };
};

export default normalizeFacilities;
