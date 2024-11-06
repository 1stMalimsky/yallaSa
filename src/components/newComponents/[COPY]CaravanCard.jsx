import React, { useState, useRef, Fragment } from "react";
import { Divider, Grid, Typography, Button, Box, Modal } from "@mui/material";
import ImageGallery from "react-image-gallery";
import { useNavigate } from "react-router-dom";
import icons from "./helpers/icons";
import CaravanCardModal from "./caravanCard/CaravanCardModal";
import CaravanCardGallery from "./caravanCard/CaravanCardImageGallery";

const CaravanCard = ({ caravanDetails, numOfDays }) => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImage(caravanDetails.imgs[index].original);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  /* GALLERY APP */
  const renderLeftNav = (onClick, disabled) => (
    <button
      className="image-gallery-custom-left-nav"
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      ◀
    </button>
  );

  const renderRightNav = (onClick, disabled) => (
    <button
      className="image-gallery-custom-right-nav"
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      ▶
    </button>
  );
  /* END GALLERY APP */

  const CaravanGallery = () => {
    const isFullScreen = useRef(false);

    const handleScreenChange = (fullscreen) => {
      isFullScreen.current = fullscreen;
    };

    return (
      <ImageGallery
        showPlayButton={false}
        showThumbnails={false}
        isRTL={true}
        items={caravanDetails.imgs}
        onScreenChange={handleScreenChange}
        showFullscreenButton={false}
        onClick={(e, index) => handleImageClick(index)}
        renderItem={(item, index) => (
          <div className="image-gallery-custom-image-wrapper">
            <img
              src={item.thumbnail}
              alt={item.description}
              onClick={() => handleImageClick(index)}
              style={{
                width: "100%",
                height: isFullScreen.current ? "100%" : "250px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </div>
        )}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
      />
    );
  };

  return (
    <div>
      <Grid container className="caravanCardGridContainer" spacing={1}>
        {/* GALLERY */}
        <Grid item xs={12} sm={4} md={4} sx={{ order: { sm: 2, md: 1 } }}>
          <CaravanGallery />
        </Grid>

        {/* DESCRIPTION */}
        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          sx={{ order: { sm: 1, md: 2 }, padding: 2 }}
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
        </Grid>
        {/* PRICE CARD */}
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          sx={{
            order: { sm: 3, md: 3 },
            textAlign: "left",
            pl: "2em !important",
            pt: "1em !important",
          }}
        >
          <Typography variant="h4">
            מחיר: {caravanDetails.pricePerNight} ש"ח \{" "}
            <span style={{ fontSize: "0.5em" }}>ללילה</span>
          </Typography>
          <Typography variant="h6">
            סה"כ: {+caravanDetails.pricePerNight * +numOfDays}
          </Typography>
          <Button variant="contained" onClick={() => navigate("/test2")}>
            הזמן עכשיו
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CaravanCard;
