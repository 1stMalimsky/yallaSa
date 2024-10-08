import React, { Fragment, useState } from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";

const AboutOwnerExpand = ({ ownerProfile }) => {
  const [open, setOpen] = useState(false);

  let isDarkMode = useSelector(
    (storePie) => storePie.darkThemeSlice.isDarkTheme
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="cardBtn"
        onClick={handleOpen}
        startIcon={<AccountBoxIcon />}
      >
        About The Owner
      </Button>
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
    </div>
  );
};

export default AboutOwnerExpand;
