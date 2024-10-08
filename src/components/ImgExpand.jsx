import React, { useState } from "react";
import { Modal, Button, Typography, Box } from "@mui/material";

const ImgXpand = ({ url, alt }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img
        src={url}
        alt={alt}
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
        className="imgXpand"
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: "50%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={url}
            alt={alt}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          <Typography variant="caption">{alt}</Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ImgXpand;
