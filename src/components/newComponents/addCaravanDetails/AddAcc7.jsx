import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import SimplePopover from "../checkoutAccordion/helpers/SimplePopover";
import generateTimeOptions from "../../../utils/generateTimeOptions";
import { acc7ValidationSchema } from "../../../validation/addCaravanValidation";
import { validateInputs } from "../../../validation/validation";
import { toast } from "react-toastify";

const AddAcc7 = ({ nextBtn }) => {
  const [acc7Data, setAcc7Data] = useState({
    city: "",
    street: "",
    houseNumber: "",
    mapsLocation: "",
    pickupFrom: "",
    dropoffUntil: "",
  });

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setAcc7Data((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleNextBtnClick = () => {
    const pickup = acc7Data.pickupFrom.slice(0, -3);
    const dropoff = acc7Data.dropoffUntil.slice(0, -3);
    if (pickup > dropoff) {
      toast.error("על שעת האיסוף להיות קודמת לשעת ההחזרה");
      return;
    }
    const joiResponse = validateInputs(acc7ValidationSchema, acc7Data);
    if (joiResponse) {
      return;
    }
    sessionStorage.setItem("acc7Data", JSON.stringify(acc7Data));
    nextBtn(acc7Data, 6);
  };
  //console.log("acc7Data", acc7Data);

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        מיקום:
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            className="inputFixShort"
            id="city"
            label="עיר"
            value={acc7Data.city}
            onChange={(e) => handleInputChange(e, "city")}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            className="inputFixShort"
            id="street"
            label="רחוב"
            value={acc7Data.street}
            onChange={(e) => handleInputChange(e, "street")}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            className="inputFixLong"
            id="houseNumber"
            label="מספר בית"
            value={acc7Data.houseNumber}
            onChange={(e) => handleInputChange(e, "houseNumber")}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2} sx={{ display: "flex" }}>
          <TextField
            className="inputFixLong"
            id="mapsLocation"
            label="מיקום בגוגל"
            value={acc7Data.mapsLocation}
            onChange={(e) => handleInputChange(e, "mapsLocation")}
          />
          <SimplePopover
            title="שיתוף מיקום בגוגל מפות"
            description={
              "כדי לשתף מיקום, יש לחפש את הכתובת בחיפוש, לחץ על הכתובת ולאחר מכן לחץ על שתף מיקום ולאחר מכן לחץ על העתקת הקישור"
            }
          />
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
        שעות פעילות:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={2}>
          <Typography variant="subtitle1">זמין לאיסוף משעה: </Typography>
          <FormControl fullWidth>
            <Select
              value={acc7Data.pickupFrom}
              onChange={(e) => handleInputChange(e, "pickupFrom")}
              MenuProps={{
                PaperProps: {
                  sx: {
                    direction: "rtl",
                  },
                },
              }}
            >
              {generateTimeOptions().map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Typography variant="subtitle1">החזרה עד השעה: </Typography>
          <FormControl fullWidth>
            <Select
              value={acc7Data.dropoffUntil}
              onChange={(e) => handleInputChange(e, "dropoffUntil")}
              MenuProps={{
                PaperProps: {
                  sx: {
                    direction: "rtl",
                  },
                },
              }}
            >
              {generateTimeOptions().map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextBtnClick}
        >
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default AddAcc7;
