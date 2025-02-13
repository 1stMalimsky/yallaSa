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
    closeModal();
    try {
      await handleSubmit();
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
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: (theme) => theme.palette.background.default,
            padding: 3,
            boxShadow: 24,
            borderRadius: 1,
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
