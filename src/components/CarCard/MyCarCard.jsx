import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ImgXpand from "../ImgExpand";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookedDatesExpand from "../BookedDatesExpand";

const MyCarCardComponent = ({
  id,
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
  bookedDates,
  isDarkMode,
  editClick,
  deleteClick,
}) => {
  const handleEditBtn = () => {
    editClick(id);
  };

  const handleDeleteBtn = () => {
    deleteClick(id);
  };

  return (
    <Grid container className="cardGridContainer">
      {/* img item */}
      <Grid item xs={12} sm={5} className="carCardImgItem">
        <ImgXpand url={url} alt={alt} className="imgUrl" />
      </Grid>

      <Grid item xs={12} sm={7}>
        <Grid container sx={{ display: "flex", flexDirection: "row" }}>
          {/* title and description */}
          <Grid item xs={12} className="carCardItem">
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
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
              Price (per day): ₪{price}
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
      <Grid item xs={12} className="myCarCardBtnSection">
        <Button
          variant="contained"
          className="cardBtn"
          onClick={handleEditBtn}
          startIcon={<EditIcon />}
        >
          <Typography>Edit</Typography>
        </Button>
        <Button
          variant="contained"
          className="cardBtn"
          onClick={handleDeleteBtn}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <BookedDatesExpand
          arr={bookedDates}
          isDarkMode={isDarkMode}
          className="bookedDates"
        />
      </Grid>
    </Grid>
  );
};

export default MyCarCardComponent;
