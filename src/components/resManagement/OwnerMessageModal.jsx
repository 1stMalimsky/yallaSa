import { useEffect, useState, useRef } from "react";
import { Modal, TextField, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const OwnerMessageModal = ({
  modalState,
  closeModal,
  ownerDetails,
  userEmail,
}) => {
  const messageRef = useRef();
  const [openState, setOpenState] = useState(modalState);

  useEffect(() => {
    setOpenState(modalState);
  }, [modalState]);

  const onCloseModal = () => {
    setOpenState(false);
    closeModal();
  };

  const onSend = async () => {
    if (!messageRef.current.value) return console.log("no message");
    try {
      closeModal();
      await axios.post(`/reservations/messageclient/${ownerDetails._id}`, {
        email: "alonmalichi@gmail.com",
        message: messageRef.current.value,
      });
      toast.success("ההודעה נשלחה בהצלחה");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Modal
      open={openState}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ direction: "rtl", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "60%",
            backgroundColor: (theme) => theme.palette.background.paper,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            כתבו את ההודעה שתרצו לשלוח למזמין
          </Typography>
          <TextField
            inputRef={messageRef}
            className="inputFixMed"
            label="הודעה"
            variant="outlined"
            multiline
            rows={10}
            fullWidth
            sx={{ width: "90%" }}
          />
          <Button
            variant="contained"
            onClick={onSend}
            sx={{ mt: 2, width: "5em" }}
          >
            שלח
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OwnerMessageModal;
