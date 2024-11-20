const getUserLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const { latitude, longitude } = position.coords;
    //console.log("User's Location:", latitude, longitude);
    return { latitude, longitude };
  } catch (error) {
    console.error("Error retrieving location:", error);
    throw error;
  }
};

export default getUserLocation;
