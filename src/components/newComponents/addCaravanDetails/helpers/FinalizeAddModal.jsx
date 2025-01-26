import { useState, useEffect } from "react";
import { Modal, Typography, Box, Button } from "@mui/material";
import { logDOM } from "@testing-library/react";
import { color } from "@mui/system";
import { useNavigate } from "react-router-dom";

const FinalizeModal = ({ modalOpenState, handleClose, handleSubmit }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(modalOpenState);

  useEffect(() => {
    setOpen(modalOpenState);
  }, [modalOpenState]);

  const closeModal = () => {
    handleClose();
    setOpen(false);
  };

  const handleClick = async () => {
    try {
      await handleSubmit();
      closeModal();
    } catch (err) {
      console.log("finalAdd click error", err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "60%", // Adjust width as necessary
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center children vertically in the box
            alignItems: "center", // Center children horizontally in the box
            backgroundColor: (theme) => theme.palette.background.default, // Use theme for background color
            padding: 3, // Add padding around the content
            boxShadow: 24, // Optional: adds shadow for better focus
            borderRadius: 1, // Optional: rounds corners of the inner box
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            אנא וודאו כי כל הפרטים שמסרתם נכונים.
            <br /> ע"י לחיצה על "הבא" אתם מאשרים שכל הפרטים שמסרתם נכונים.
          </Typography>
          <Button variant="contained" onClick={handleClick}>
            הבא
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FinalizeModal;
