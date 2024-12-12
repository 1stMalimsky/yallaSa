import React, { useState, useRef, Fragment } from "react";
import { Divider, Grid, Typography, Button, Box } from "@mui/material";
import RatingThing from "./helpers/RatingThing";
import { useNavigate } from "react-router-dom";
import icons from "./helpers/icons";
import CaravanCardModal from "./caravanCard/CaravanCardModal";
import CaravanCardGallery from "./caravanCard/CaravanCardImageGallery";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dayjs from "dayjs";
import { maxHeight } from "@mui/system";

const CaravanCard = ({ caravanDetails, chosenDates }) => {
  const navigate = useNavigate();

  const [unixDates, setUnixDates] = useState({
    start: dayjs(chosenDates.start).unix(),
    end: dayjs(chosenDates.end).unix(),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageClick = (index) => {
    if (index !== undefined && caravanDetails.images[index]) {
      setCurrentImage(caravanDetails.images[index].original);
      setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

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
            caravanImgs={caravanDetails.images}
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
            {caravanDetails.title}
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
              {caravanDetails.beds}
              <icons.HotelIcon className="CaravanFacilitiesIcons" />
            </Typography>
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.seats}
              <icons.EventSeatIcon className="CaravanFacilitiesIcons" />
            </Typography>
            {caravanDetails.baths ? (
              <Fragment>
                <Divider className="CaravanDivider" orientation="vertical" />
                <Typography variant="h6" className="CaravanFacilities">
                  <icons.BathtubIcon className="CaravanFacilitiesIcons" />
                </Typography>
              </Fragment>
            ) : (
              ""
            )}
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.kitchen}
              <icons.KitchenIcon className="CaravanFacilitiesIcons" />
            </Typography>
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.measurements}
              <icons.StraightenIcon className="CaravanFacilitiesIcons" />
            </Typography>
            <Divider className="CaravanDivider" orientation="vertical" />
            <Typography variant="h6" className="CaravanFacilities">
              {caravanDetails.licenseRequired}
              <icons.DriveEtaIcon className="CaravanFacilitiesIcons" />
            </Typography>
          </Box>
          <Typography variant="subtitle1" className="caravanCardReviews">
            חוות דעת
          </Typography>
          <Typography variant="h6" className="caravanCardLocation">
            מיקום
          </Typography>
          <Typography variant="subtitle1" className="caravanCardIncluded">
            כלול בקרוואן
          </Typography>
          <Typography variant="subtitle1">קרוואן כשר</Typography>
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
            מחיר: {caravanDetails.pricePerNight} ש"ח \{" "}
            <span style={{ fontSize: "0.5em" }}>ללילה</span>
          </Typography>
          <Typography variant="h6">
            סה"כ: {+caravanDetails.pricePerNight * +chosenDates.numOfDay}
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
