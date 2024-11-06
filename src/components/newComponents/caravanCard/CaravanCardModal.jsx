import { useState } from "react";
import { Modal, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CaravanCardImageGallery from "./CaravanCardImageGallery";

const CaravanCardModal = ({ isModalOpen, handleClose, currentImage }) => {
  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 24,
          width: "80vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <img
          src={currentImage}
          alt="Full view"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Modal>
  );
};

export default CaravanCardModal;
