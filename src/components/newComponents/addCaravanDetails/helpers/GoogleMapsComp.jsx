import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Marker } from "@googlemaps/adv-markers-utils";

const loader = new Loader({
  apiKey: "Your aPI", // Replace with your actual Google Maps API key
  version: "weekly",
  libraries: ["places", "marker"], // Add 'marker' only if it is a recognized library
});

const GoogleMapsComp = ({ coords }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

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
      const { lat, lng } = parseCoords(coords);
      const initialMap = new google.maps.Map(mapRef.current, {
        mapId: "test-map",
        center: { lat, lng },
        zoom: 8,
        disableDefaultUI: true,
        // Include any additional options needed for your setup
      });
      setMap(initialMap);

      const marker = new Marker({
        position: { lat, lng },
        map: initialMap,
        title: "Click me!",
      });

      const infoWindow = new google.maps.InfoWindow({
        content: "Hello World! Here is more info.",
      });

      marker.addListener("click", () => {
        infoWindow.open(initialMap, marker);
      });
    });
  }, [coords]);

  return <div ref={mapRef} style={{ width: "400px", height: "400px" }} />;
};

export default GoogleMapsComp;
