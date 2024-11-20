const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const toRadians = (angle) => (angle * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const sortByProximity = async (currentLocation, locations) => {
  const { latitude: lat1, longitude: lon1 } = currentLocation;
  console.log("locations", locations);

  return locations
    .map((location) => ({
      ...location,
      distance: haversineDistance(
        lat1,
        lon1,
        location.locationDetails.gpsData[0],
        location.locationDetails.gpsData[1]
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
};

export { haversineDistance, sortByProximity };
