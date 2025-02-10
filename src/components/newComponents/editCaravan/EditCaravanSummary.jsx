import { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ImageGallery from "../../../utils/helpers/ImageGallery";
import CaravanIconRow from "../addCaravanDetails/helpers/CaravanIcons";
import GoogleMapsComp from "../addCaravanDetails/helpers/GoogleMapsComp";

const EditCaravanSummary = ({ setupDetails, caravanImages }) => {
  const [accDetails, setAccDetails] = useState(setupDetails);
  const [images, setImages] = useState(caravanImages);
  const [priceDetails, setPriceDetails] = useState(setupDetails[9]);
  const [personCapacity, setPersonCapacity] = useState(setupDetails[3]);
  const [features, setFeatures] = useState(setupDetails[4]);
  const [listingtext, setListingtext] = useState(setupDetails[1]);
  const [locationDetails, setLocationDetails] = useState(setupDetails[6]);

  useEffect(() => {
    setAccDetails(setupDetails);
    setImages(caravanImages);
    setPriceDetails(setupDetails[9]);
    setFeatures(setupDetails[4]);
    setListingtext(setupDetails[1]);
    setLocationDetails(setupDetails[6]);
    setPersonCapacity(setupDetails[3]);
  }, [setupDetails, caravanImages]);

  //console.log("summary imageState", images);
  if (!images) return <CircularProgress />;
  return (
    <Box>
      <Card>
        <CardHeader
          title={
            <Typography sx={{ padding: 1, border: 1 }} variant="h5">
              המודעה שלכם
            </Typography>
          }
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", marginBottom: 2 }}
              >
                {(!listingtext || (listingtext && !listingtext.listingName)) &&
                  "כותרת המודעה"}
                {listingtext &&
                  listingtext.listingName &&
                  listingtext.listingName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {personCapacity && features && (
                <CaravanIconRow
                  data={[personCapacity, features, accDetails[2].vehicleType]}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {!images && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src="/imgs/caravanPhotos/tempCarPhoto.png"
                    alt="no-image"
                    style={{
                      height: "300px",
                      width: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              {images && <ImageGallery images={images} />}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                כלול בקרוואן
              </Typography>
            </Grid>
            {features && features.kitchen.length > 0 && (
              <Grid item xs={3}>
                <Typography variant="subtitle1">מטבח:</Typography>
                {features.kitchen.map((item, index) => (
                  <Typography key={index} variant="body2">
                    - {Object.values(item)[0]}
                  </Typography>
                ))}
              </Grid>
            )}
            {features && features.bathroom.length > 0 && (
              <Grid item xs={3}>
                <Typography variant="subtitle1">מקלחת:</Typography>
                {features.bathroom.map((item, index) => (
                  <Typography key={index} variant="body2">
                    - {Object.values(item)[0]}
                  </Typography>
                ))}
              </Grid>
            )}
            {features && features.comfort.length > 0 && (
              <Grid item xs={3}>
                <Typography variant="subtitle1">איבזור:</Typography>
                {features.comfort.map((item, index) => (
                  <Typography key={index} variant="body2">
                    - {Object.values(item)[0]}
                  </Typography>
                ))}
              </Grid>
            )}
            {features && features.safety.length > 0 && (
              <Grid item xs={3}>
                <Typography variant="subtitle1">בטיחות:</Typography>
                {features.safety.map((item, index) => (
                  <Typography key={index} variant="body2">
                    - {Object.values(item)[0]}
                  </Typography>
                ))}
              </Grid>
            )}
            {locationDetails && locationDetails.city && (
              <Fragment>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                    מיקום
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle2">
                    עיר: {locationDetails.city}
                  </Typography>
                  <Typography variant="subtitle2">
                    רחוב: {locationDetails.street} {locationDetails.houseNumber}
                  </Typography>
                </Grid>
              </Fragment>
            )}
            {locationDetails && locationDetails.mapsLocation && (
              <Grid item xs={12} md={9}>
                <GoogleMapsComp
                  coords={locationDetails.mapsLocation}
                  info={{
                    city: locationDetails.city,
                    street: locationDetails.street,
                    houseNumber: locationDetails.houseNumber,
                  }}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditCaravanSummary;
