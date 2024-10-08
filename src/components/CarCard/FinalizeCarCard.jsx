import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CircularProgress } from "@mui/material";
import ImgXpand from "../ImgExpand";
import axios from "axios";

const FinalizeCarCard = ({
  id,
  user_id,
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
  totalPrice,
  loggedIn,
  handleLikeClick,
}) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [ownerProfile, setOwnerProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`/user/${user_id}`)
      .then(({ data }) => {
        setOwnerProfile(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  });

  const likeClicked = () => {
    handleLikeClick(id);
    setLikeStatus(!likeStatus);
  };

  if (!ownerProfile) {
    return <CircularProgress />;
  }

  return (
    <Grid container className="PaymentCarCardGridContainer">
      {/* Title */}
      <Grid item xs={12} sx={{ flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <ImgXpand url={url} alt={alt} className="imgURL" />
      </Grid>
      <Grid item xs={12}>
        <Grid container sx={{ display: "flex", flexDirection: "row" }}>
          {/* description */}
          <Grid item xs={12} className="checkoutCarCardItem">
            <Typography variant="body2">Description: {description}</Typography>
          </Grid>
          {/* car details */}
          <Grid item xs={6}>
            <Typography variant="body2">
              Car Type: {carType}
              <br />
              Car Model: {carModel}
              <br />
              Phone: {phone}
              <br />
              Price (per day): {price} ILS
            </Typography>
          </Grid>
          {/* location details */}
          <Grid item xs={6}>
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
        </Grid>
      </Grid>
      {/* buttons */}
      <Grid item xs={6} className="checkoutCarCardBtnSection">
        <IconButton
          onClick={likeClicked}
          className="PaymentCarCardBtn"
          sx={{ display: loggedIn ? "flex" : "none" }}
        >
          {!likeStatus ? (
            <FavoriteBorderIcon fontSize="large" />
          ) : (
            <FavoriteIcon fontSize="large" />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} className="checkoutPrice">
        <Typography variant="body1">
          Your Total price is:
          <br />
          {totalPrice} ILS
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FinalizeCarCard;
