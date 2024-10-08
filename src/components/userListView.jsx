import { useState, useEffect, Fragment } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AboutOwnerExpand from "./AboutOwnerExpand";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const UserListView = ({
  id,
  name,
  url,
  alt,
  email,
  address,
  handleDelete,
  isDarkMode,
}) => {
  const [open, setOpen] = useState(false);
  const [ownerProfile, setOwnerData] = useState(null);

  const ownerData = async () => {
    try {
      const { data } = await axios.get("/user/" + id);
      delete data.password;
      delete data.__v;
      setOwnerData(data);
    } catch (err) {
      toast.error("owner Data err");
      console.log("owner Data err", err);
    }
  };

  useEffect(() => {
    ownerData(id);
  }, []);

  const deleteCar = () => {
    handleDelete(id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Grid item xs={5} sm={2} className="carCardImgItem">
            <img src={url} alt={alt} className="imgURL" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="body1" component="div">
              Name: {name.firstName} <br />
              {name.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body1" component="div">
              Email: {email}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={2} className="carCardBtnSection">
          <Button
            variant="contained"
            onClick={deleteCar}
            sx={{ background: "red" }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box className={isDarkMode ? "modalBoxDark" : "modalBox"}>
          <Typography component="h3" variant="h4">
            About The Owner
          </Typography>
          <img
            src={ownerProfile.image.url}
            alt={ownerProfile.image.alt}
            className="smallImg"
          />
          <Typography variant="body1">
            Name: {ownerProfile.name.firstName} {ownerProfile.name.lastName}
            <br />
            Phone Number: {ownerProfile.phone}
            <br />
            Email address: {ownerProfile.email}
          </Typography>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default UserListView;
