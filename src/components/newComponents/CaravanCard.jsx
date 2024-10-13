import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import ImageGallery from "react-image-gallery";

const CaravanCard = () => {
  const [caravanPhotos, setcaravanPhotos] = useState([
    {
      original: "/imgs/caravanPhotos/caravanGolan01.jpg",
      thumbnail: "/imgs/caravanPhotos/caravanGolan01mini.jpg",
      description: "",
    },
    {
      original: "/imgs/caravanPhotos/caravanGolan03.jpg",
      thumbnail: "/imgs/caravanPhotos/caravanGolan03mini.jpg",
      description: "",
    },
    {
      original: "/imgs/caravanPhotos/caravanGolan05.jpg",
      thumbnail: "/imgs/caravanPhotos/caravanGolan05mini.jpg",
      description: "",
    },
  ]);

  const renderLeftNav = (onClick, disabled) => (
    <button
      className="image-gallery-custom-left-nav"
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "50px", // Adjust the size to your preference
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
        width: "50px", // Adjust the size to your preference
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

  const CaravanGallery = () => {
    return (
      <ImageGallery
        showPlayButton={false}
        showThumbnails={false}
        isRTL={true}
        items={caravanPhotos}
        renderItem={(item) => (
          <img
            src={item.thumbnail}
            alt={item.description}
            style={{
              width: "100%",
              height: "250px",
              objectFit: "contain",
            }}
          />
        )}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
      />
    );
  };

  return (
    <div>
      <Grid
        container
        /* fullWidth={true} */
        className="caravanCardGridContainer"
        spacing={1}
      >
        {/* GALLERY */}
        <Grid item xs={12} sm={12} md={4}>
          <div style={{ maxwidth: "250px" }}>
            <CaravanGallery />
          </div>
        </Grid>

        {/* DESCRIPTION */}
        <Grid item xs={12} sm={6} md={6} sx={{ padding: 2 }}>
          <Typography variant="h3" className="caravanCardTitle">
            מלך הקרוואנים
          </Typography>
          <Typography variant="h6" className="caravanCardDescription">
            4 מיטות | 4 מושבים | אוטומטי | מקלחת\שירותים | מטבח מלא | 9 מטר
          </Typography>
          <Typography variant="subtitle1" className="caravanCardReviews">
            חוות דעת
          </Typography>
          <Typography variant="h6" className="caravanCardLocation">
            מיקום
          </Typography>
          <Typography variant="subtitle1" className="caravanCardIncluded">
            כלול במחיר
          </Typography>
          <Typography variant="subtitle1">קרוואן כשר</Typography>
        </Grid>

        {/* PRICE CARD */}
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          style={{ paddingLeft: "2em", paddingTop: "1em" }}
          sx={{ textAlign: "left" }}
        >
          <Typography variant="h4">
            מחיר: 700 ש"ח \ <span style={{ fontSize: "0.5em" }}>ללילה</span>
          </Typography>
          <Typography variant="h6">סה"כ: XXX</Typography>
          <Button variant="contained">הזמן עכשיו</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CaravanCard;
