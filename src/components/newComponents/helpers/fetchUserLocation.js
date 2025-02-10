const getUserLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    console.log("position", position);
    const { latitude, longitude } = position.coords;
    //console.log("User's Location:", latitude, longitude);
    return { latitude, longitude };
  } catch (error) {
    console.warn("Error retrieving location:", error);
    return { latitude: 0, longitude: 0 };
  }
};

export default getUserLocation;
