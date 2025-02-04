import {
  kitchenList,
  livingList,
  safetyList,
  bathroomList,
} from "../../addCaravanDetails/helpers/acc6facilitiesList";

const normalizeForServer = (data) => {
  const convertArrayToObject = (array, referenceList) => {
    // If category is empty, set all items to false
    if (array.length === 0) {
      return Object.keys(referenceList).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
    }

    // Convert selected features to true
    return array.reduce((acc, item) => {
      const key = Object.keys(item)[0]; // Extract key from { hasSink: "מטבח עם כיור" }
      acc[key] = true;
      return acc;
    }, {});
  };
  console.log("data.measurments", data.measurements);
  console.log(
    "converObject",
    convertArrayToObject(data.safety || [], safetyList)
  );

  return {
    measurements:
      {
        length: +data.measurements.length,
        width: +data.measurements.width,
        weight: +data.measurements.weight,
        minimumAge: data.measurements.minimumAge,
        licenseClass: data.measurements.licenseClass,
      } || {},
    features: {
      kitchen: convertArrayToObject(data.kitchen || [], kitchenList),
      bathroom: convertArrayToObject(data.bathroom || [], bathroomList),
      vehicleProps: convertArrayToObject(data.safety || [], safetyList),
      caravanProps: convertArrayToObject(data.comfort || [], livingList),
    },
  };
};

export default normalizeForServer;
