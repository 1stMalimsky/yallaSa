import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const Test = ({ location, info }) => {
  const [locationData, setLocationData] = useState(null);
  const [markerRef, marker] = useMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const defaultPosition = { lat: 32.08503, lng: 34.78428 };

  useEffect(() => {
    const parsedCoords = parseCoords(locationData);
    setLocationData(parsedCoords);
  }, [location]);

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
  return (
    <APIProvider apiKey="AIzaSyBtJ9sNi4g703bq6QXBfXbAYo99J7BQFGY">
      {locationData && (
        <Box sx={{ width: "400px", height: "400px", border: 1 }}>
          <Map
            defaultCenter={defaultPosition}
            defaultZoom={10}
            mapId="DEMO_MAP_ID"
            disableDefaultUI={true}
          >
            <AdvancedMarker
              ref={markerRef}
              position={defaultPosition}
              onClick={handleMarkerClick}
            />
            {infoWindowShown && (
              <InfoWindow anchor={marker} onClose={handleClose}>
                <Typography
                  variant="subtitle1"
                  sx={{ textDecoration: "underline" }}
                >
                  כתובת
                </Typography>
                <Typography variant="body2">רחוב + מס בית</Typography>
                <Typography variant="body2">עיר</Typography>
              </InfoWindow>
            )}
          </Map>
        </Box>
      )}
    </APIProvider>
  );
};

export default Test;
