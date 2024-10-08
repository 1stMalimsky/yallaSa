import React, { useState } from "react";
import { Modal, Button, Typography, Box, Grid, Divider } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const BookedDatesExpand = ({ arr, isDarkMode }) => {
  const [open, setOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };

    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="cardBtn"
        disabled={arr.length === 0 ? true : false}
        onClick={handleOpen}
        startIcon={<CalendarTodayIcon />}
      >
        Booked Dates
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: "50%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            className={isDarkMode ? "modalHeaderBoxDark" : "modalHeaderBox"}
          >
            <Grid item xs={12}>
              <Typography variant="h5">Booked Dates</Typography>
              {arr.map((date) => (
                <Grid itex={2} key={date.start}>
                  <Typography variant="body1">
                    Pickup Date: {formatDate(date.start)}
                    <br />
                    Dropoff Date: {formatDate(date.end)}
                  </Typography>
                  <Divider />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BookedDatesExpand;
