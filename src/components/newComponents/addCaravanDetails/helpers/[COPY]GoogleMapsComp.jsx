import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Marker } from "@googlemaps/adv-markers-utils";

const loader = new Loader({
  apiKey: "your api",
  version: "weekly",
  libraries: ["places", "marker"],
});

const GoogleMapsComp = ({ coords }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  const parseCoords = (coords) => {
    if (!coords) return null;
    const parts = coords.split(",");
    if (parts.length === 2) {
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
  };

  useEffect(() => {
    loader.load().then((google) => {
      const parsedCoords = parseCoords(coords);
      console.log("mapRef", mapRef);

      const initialMap = new google.maps.Map(mapRef.current, {
        mapId: "test-map",
        center: parsedCoords,
        zoom: 9,
        title: "Hello World!",
        disableDefaultUI: true,
      });
      setMap(initialMap);

      const initialMarker = new Marker({
        id: "test-marker",
        position: parsedCoords,
        map: initialMap,
        title: "Hello World!",
      });
      setMarker(initialMarker);

      const initialInfoWindow = new google.maps.InfoWindow({
        content: "<div>Hello World! Here is more info.</div>", // Customize with HTML content
      });

      setInfoWindow(initialInfoWindow);

      initialMarker.addListener("click", () => {
        if (infoWindow) {
          infoWindow.close(); // Close any open InfoWindow
          infoWindow.setContent(initialMarker.title); // Set the new content
          infoWindow.open(initialMap, initialMarker); // Open InfoWindow on the map at the marker
        }
      });
    });
  }, [coords]);

  return <div ref={mapRef} style={{ width: "400px", height: "400px" }} />;
};
export default GoogleMapsComp;
