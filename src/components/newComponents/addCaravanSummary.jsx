import { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@mui/material";
import ImageGallery from "../../utils/helpers/ImageGallery";
import CaravanIconRow from "./addCaravanDetails/helpers/CaravanIcons";
import GoogleMapsComp from "./addCaravanDetails/helpers/GoogleMapsComp";

const AddCaravanSummary = ({ setupDetails }) => {
  const [accDetails, setAccDetails] = useState(setupDetails);
  const [images, setImages] = useState(setupDetails[4]);
  const [priceDetails, setPriceDetails] = useState(setupDetails[9]);
  const [features, setFeatures] = useState(setupDetails[5]);
  const [listingtext, setListingtext] = useState(setupDetails[7]);
  const [locationDetails, setLocationDetails] = useState(setupDetails[6]);

  useEffect(() => {
    setAccDetails(setupDetails);
    setImages(setupDetails[4]);
    setPriceDetails(setupDetails[9]);
    setFeatures(setupDetails[5]);
    setListingtext(setupDetails[7]);
  }, [setupDetails]);

  //console.log("summaryState", accDetails);

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
              {accDetails[1] && accDetails[5] && (
                <CaravanIconRow data={[accDetails[1], accDetails[5]]} />
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
            {accDetails && accDetails[6] && (
              <Grid>
                <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                  מיקום
                </Typography>
                <Typography variant="subtitle2">
                  עיר: {accDetails[6].city}
                </Typography>
                <Typography variant="subtitle2">
                  רחוב: {accDetails[6].street} {accDetails[6].houseNumber}
                </Typography>
                {accDetails && accDetails[6].mapsLocation && (
                  <GoogleMapsComp coords={accDetails[6].mapsLocation} />
                )}
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddCaravanSummary;
