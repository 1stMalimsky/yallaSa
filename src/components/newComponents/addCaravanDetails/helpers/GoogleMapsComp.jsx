import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const Test = ({ coords, info }) => {
  const [locationData, setLocationData] = useState(null);
  const [markerRef, marker] = useMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  //console.log("map init");

  useEffect(() => {
    const parsedCoords = parseCoords(coords);
    setLocationData(parsedCoords);
  }, [coords]);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

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

  //console.log("parsedCoords", locationData);

  return (
    <APIProvider apiKey="AIzaSyBtJ9sNi4g703bq6QXBfXbAYo99J7BQFGY">
      {locationData && (
        <Box sx={{ width: "250px", height: "250px" }}>
          <Map
            defaultCenter={locationData}
            defaultZoom={10}
            mapId="DEMO_MAP_ID"
            disableDefaultUI={true}
          >
            <AdvancedMarker
              ref={markerRef}
              position={locationData}
              onClick={handleMarkerClick}
            />
            {infoWindowShown && (
              <InfoWindow anchor={marker} onClose={handleClose}>
                <Typography variant="h6" sx={{ textDecoration: "underline" }}>
                  כתובת
                </Typography>
                <Typography variant="body2">
                  {info.street} {info.houseNumber}
                </Typography>
                <Typography variant="body2">{info.city}</Typography>
              </InfoWindow>
            )}
          </Map>
        </Box>
      )}
    </APIProvider>
  );
};

export default Test;
