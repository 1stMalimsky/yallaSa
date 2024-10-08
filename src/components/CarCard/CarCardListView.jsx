import { useState, useEffect, Fragment } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Modal } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CarCardComponent from "./CarCard";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const CarCardListView = ({
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
  isAdmin,
  adminControls,
  isLiked,
  handleLikeClick,
  handleCheckOutClick,
  handleDelete,
  isDarkMode,
}) => {
  const [likeStatus, setLikeStatus] = useState(isLiked);
  const [open, setOpen] = useState(false);
  const [ownerProfile, setOwnerData] = useState(null);

  const likeClicked = () => {
    setLikeStatus((prevLikeStatus) => !prevLikeStatus);
    handleLikeClick(id);
  };

  const ownerData = async () => {
    try {
      const { data } = await axios.get("/user/" + user_id);
      delete data.password;
      delete data.address;
      delete data.__v;
      setOwnerData(data);
    } catch (err) {
      console.log("owner Data err", err);
    }
  };

  useEffect(() => {
    ownerData(id);
  }, []);

  const handleCheckOut = () => {
    handleCheckOutClick();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCar = () => {
    handleDelete(id);
  };

  if (!ownerProfile) {
    return <CircularProgress />;
  }

  return (
    <Fragment>
      <Grid container className="cardGridListContainer">
        <Grid
          item
          xs={12}
          sm={10}
          onClick={handleOpen}
          className="cardModalList"
        >
          {/* img item */}
          <Grid item xs={12} sm={3} className="carCardImgItem">
            <img src={url} alt={alt} className="imgURL" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="body1" component="div">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1" component="div">
              Car Type: {carType}
            </Typography>
          </Grid>
          {!adminControls ? (
            <Grid item xs={12} sm={3}>
              <Typography variant="body1" component="div">
                Price (per day): ₪{price}
              </Typography>
            </Grid>
          ) : null}
        </Grid>

        <Grid item xs={2} className="carCardBtnSection">
          {!isAdmin ? (
            <Button
              variant="contained"
              className="cardBtn"
              onClick={handleCheckOut}
            >
              Rent
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={deleteCar}
              sx={{ background: "red" }}
            >
              Delete
            </Button>
          )}
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className="infoModal">
        <Box className={isDarkMode ? "carInfoModalBoxDark" : "carInfoModalBox"}>
          <CarCardComponent
            id={id}
            user_id={user_id}
            title={title}
            description={description}
            url={url}
            alt={alt}
            carType={carType}
            carModel={carModel}
            city={city}
            street={street}
            houseNumber={houseNumber}
            phone={phone}
            price={price}
            loggedIn={false}
            isAdmin={isAdmin}
            handleLikeClick={handleLikeClick}
            handleCheckOutClick={handleCheckOutClick}
            handleDeleteClick={deleteCar}
          />
        </Box>
      </Modal>
    </Fragment>
  );
};

export default CarCardListView;
