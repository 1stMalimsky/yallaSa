import normalizeFacilities from "../../components/newComponents/editCaravan/helpers/normalizeFacilities";
const normalizeEditCaravan = (dataFromServer, userDetails) => {
  if (!dataFromServer || !userDetails) {
    return console.log("Data missing from Normalize edit caravan");
  }
  const paymentTypeCheck = () => {
    //console.log("userDetails normalize caravan", userDetails);
    //console.log("dataFromServer", dataFromServer);

    if (
      userDetails.paymentDetails.bankAccount &&
      !userDetails.paymentDetails.phone
    ) {
      return "1";
    }
    if (
      userDetails.paymentDetails.phone &&
      !userDetails.paymentDetails.bankAccount
    ) {
      return "2";
    } else {
      return; //console.log("paymentType undefined");
    }
  };

  const checkUserDetails = () => {
    if (dataFromServer.ownerDetails.isBusiness) {
      return dataFromServer.ownerDetails.businessDetails;
    }
    if (!dataFromServer.ownerDetails.isBusiness) {
      return dataFromServer.ownerDetails.ownerId;
    } else return console.log("userDetails undefined");
  };

  //console.log("measurements from dataFromServer", dataFromServer.measurements);

  const normalizedAccData = [
    {
      privateUser: dataFromServer.ownerDetails.isBusiness ? "false" : "true",
      paymentType: paymentTypeCheck(),
      paymentDetails: userDetails.paymentDetails || {},
      userDetails: checkUserDetails(),
    },
    {
      listingName: dataFromServer.listingName || "",
      description: dataFromServer.description || "",
    },
    { location: "", vehicleType: dataFromServer.carType || "" },
    {
      numOfseats: dataFromServer.personCapacity.numOfSeats || 0,
      numOfbeds: dataFromServer.personCapacity.numOfBeds || 0,
      numOfsleepers: dataFromServer.personCapacity.numOfSleepers || 0,
    },

    {
      measurements: { ...dataFromServer.measurements },
      ...(normalizeFacilities(dataFromServer.features) || ""),
    },
    [
      { filename: "", base64Data: "" },
      { filename: "", base64Data: "" },
      { filename: "", base64Data: "" },
    ],
    {
      city: dataFromServer.locationDetails.city || "",
      street: dataFromServer.locationDetails.street || "",
      houseNumber: dataFromServer.locationDetails.houseNumber || "",
      mapsLocation: dataFromServer.locationDetails.gpsData || "",
      pickupTime: dataFromServer.locationDetails.pickupTime || "",
      dropoffTime: dataFromServer.locationDetails.dropoffTime || "",
    },
    dataFromServer.licenseDetails || "",
    {
      basicInsurance: dataFromServer.insuranceDetails.basicPricePerNight || "",
      cancelationPrice: dataFromServer.cancelationPolicy.cancelationFeePercent,
      freeCancelationDays: dataFromServer.cancelationPolicy.freeCancelWindow,
      insuranceIncluded: dataFromServer.insuranceDetails.basicIncluded,
      isCancelationPolicy:
        dataFromServer.cancelationPolicy.isCancelationPolicy || "false",
      minimumNights: dataFromServer.priceDetails.minimumNights || "",
      premiumInsurance:
        dataFromServer.insuranceDetails.premiumPricePerNight || "",
      pricePerNight: dataFromServer.priceDetails.pricePerNight,
    },
  ];
  //console.log("normalizedAccData", normalizedAccData);

  return normalizedAccData;
};

export default normalizeEditCaravan;
