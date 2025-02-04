import React, { useState, useEffect, Fragment } from "react";
import { Divider, Grid, Typography, Button, Box } from "@mui/material";
import RatingThing from "../helpers/RatingThing";
import { useNavigate } from "react-router-dom";
import icons from "../helpers/icons";
import CaravanCardModal from "./CaravanCardModal";
import CaravanCardGallery from "./CaravanCardImageGallery";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dayjs from "dayjs";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const CaravanCard = ({ caravanDetails, chosenDates }) => {
  const navigate = useNavigate();

  const [unixDates, setUnixDates] = useState({
    start: dayjs(chosenDates.start).unix(),
    end: dayjs(chosenDates.end).unix(),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [caravanPhotos, setCaravanPhotos] = useState([]);

  const caravanId = caravanDetails._id;
  console.log(
    "caravavanDetails",
    caravanDetails.ownerDetails.ownerId,
    caravanDetails.listingName
  );

  useEffect(() => {
    const fetchCaravanImages = async (caravanId, setState) => {
      try {
        const caravanPhotos = await axios.get(`/caravans/images/${caravanId}`);
        if (caravanPhotos) {
          console.log("caravanPhotos", caravanPhotos);
        }
        if (!caravanPhotos || caravanPhotos.data.caravanImages.length < 1) {
          return console.log("no caravan found");
        }
        setState(caravanPhotos.data.caravanImages);
        return caravanPhotos.data.caravanImages;
      } catch (err) {
        console.log("caravan photo search error", err);
      }
    };
    fetchCaravanImages(caravanId, setCaravanPhotos);
  }, []);

  const handleImageClick = (index) => {
    console.log("caravanPhotos in imageclick", caravanPhotos);

    if (index !== undefined && caravanPhotos && caravanPhotos[index]) {
      setCurrentImage(caravanPhotos[index].original);
      setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };
  //console.log("caravanPhotos", caravanPhotos);
  if (caravanPhotos.length < 1) return <CircularProgress />;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid container className="caravanCardGridContainer" spacing={1}>
        {/* GALLERY */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          sx={{ order: { xs: 2, md: 1 } }}
        >
          <CaravanCardGallery
            caravanImgs={caravanPhotos}
            handleImageClick={handleImageClick}
          />
          <CaravanCardModal
            isModalOpen={modalOpen}
            handleClose={handleClose}
            currentImage={currentImage}
          />
        </Grid>

        {/* DESCRIPTION */}
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          sx={{ order: { xs: 1, md: 2 }, padding: 2 }}
        >
          <Typography variant="h3" className="caravanCardTitle">
            {caravanDetails.listingName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.personCapacity.numOfBeds}
              <icons.HotelIcon className="CaravanFacilitiesIcons" />
            </Typography>
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.personCapacity.numOfSeats}
              <icons.EventSeatIcon className="CaravanFacilitiesIcons" />
            </Typography>
            <Fragment>
              <Divider className="CaravanDivider" orientation="vertical" />
              <Typography variant="h6" className="CaravanFacilities">
                <icons.BathtubIcon className="CaravanFacilitiesIcons" />
              </Typography>
            </Fragment>
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.features.kitchen ? (
                <icons.KitchenIcon className="CaravanFacilitiesIcons" />
              ) : (
                ""
              )}
            </Typography>
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.measurements.length}x
              {caravanDetails.measurements.width}
              <icons.StraightenIcon className="CaravanFacilitiesIcons" />
            </Typography>
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.measurements.weight}
              <icons.ScaleIcon className="CaravanFacilitiesIcons" />
            </Typography>
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.licenseDetails.licenseRequired}
              <icons.DriveEtaIcon className="CaravanFacilitiesIcons" />
            </Typography>
          </Box>

          <Typography variant="h6" className="caravanCardLocation">
            מיקום
          </Typography>
          <Typography variant="subtitle1" className="caravanCardIncluded">
            כלול בקרוואן
          </Typography>
          {caravanDetails.features.kosherCaravan ? (
            <Typography variant="subtitle1">קרוואן כשר</Typography>
          ) : (
            ""
          )}
          <Typography variant="subtitle1" className="caravanCardReviews">
            חוות דעת
          </Typography>
          <div>
            <RatingThing readOnly={true} />
          </div>
        </Grid>
        {/* PRICE CARD */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          sx={{
            order: { xs: 3, md: 3 },
            textAlign: "right",
            padding: 2,
          }}
        >
          <Typography variant="h4">
            מחיר: {caravanDetails.priceDetails.pricePerNight} ש"ח \{" "}
            <span style={{ fontSize: "0.5em" }}>ללילה</span>
          </Typography>
          <Typography variant="h6">
            סה"כ:{" "}
            {+caravanDetails.priceDetails.pricePerNight * +chosenDates.numOfDay}
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                `/checkout/${caravanDetails._id}/${unixDates.start}/${unixDates.end}/${chosenDates.numOfDay}`
              )
            }
          >
            הזמן עכשיו
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CaravanCard;
