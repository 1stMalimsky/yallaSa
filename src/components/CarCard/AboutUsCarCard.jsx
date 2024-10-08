import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ImgXpand from "../ImgExpand";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const AboutUsCarCardComponent = ({
  title,
  description,
  url,
  alt,
  carType,
  carModel,
  city,
  street,
  houseNumber,
  phone,
  price,
}) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const likeClicked = () => {
    setLikeStatus((prevLikeStatus) => !prevLikeStatus);
  };

  const handleCheckOut = () => {};

  const aboutClick = () => {};

  return (
    <Grid container className="aboutCardGridContainer">
      {/* img item */}
      <Grid item xs={12} sm={3} md={5} className="carCardImgItem">
        <ImgXpand url={url} alt={alt} className="imgURL" />
      </Grid>

      <Grid item xs={8} sm={6} md={7}>
        {/* title and description */}
        <Grid item xs={12} className="aboutCarCardItem">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">Description: {description}</Typography>
        </Grid>
      </Grid>
      {/* car details */}
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="body2">
          Car Type: {carType}
          <br />
          Car Model: {carModel}
          <br />
          Phone: {phone}
          <br />
          Price (per day): ₪{price}
        </Typography>
      </Grid>
      {/* location details */}
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="body2">
          <span style={{ textDecoration: "underline" }}>Location</span>
          <br />
          City: {city}
          <br />
          Street: {street}
          <br />
          House Number: {houseNumber}
        </Typography>
      </Grid>
      {/* buttons */}
      <Grid item xs={12} className="carCardBtnSection">
        <Button
          variant="contained"
          className="cardBtn"
          onClick={handleCheckOut}
        >
          Rent
        </Button>
        <IconButton onClick={likeClicked}>
          {!likeStatus ? (
            <FavoriteBorderIcon fontSize="large" />
          ) : (
            <FavoriteIcon fontSize="large" />
          )}
        </IconButton>
        <div className="profileAv">
          <Button
            variant="contained"
            className="cardBtn"
            onClick={aboutClick}
            startIcon={<AccountBoxIcon />}
          >
            About The Owner
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default AboutUsCarCardComponent;
