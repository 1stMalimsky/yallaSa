import { useEffect, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";

import SimplePopover from "../checkoutAccordion/helpers/SimplePopover";
import generateTimeOptions from "../../../utils/generateTimeOptions";
import { acc7ValidationSchema } from "../../../validation/addCaravanValidation";
import { validateInputs } from "../../../validation/validation";
import { toast } from "react-toastify";
import axios from "axios";

const EditAcc7 = ({ nextBtn, parentData, caravanId }) => {
  const [acc7Data, setAcc7Data] = useState({
    city: "",
    street: "",
    houseNumber: "",
    mapsLocation: "",
    pickupTime: "",
    dropoffTime: "",
  });

  useEffect(() => {
    setAcc7Data(parentData);
  }, []);

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setAcc7Data((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleNextBtnClick = async () => {
    const pickup = acc7Data.pickupTime.slice(0, -3);
    const dropoff = acc7Data.dropoffTime.slice(0, -3);
    if (pickup > dropoff) {
      toast.error("על שעת האיסוף להיות קודמת לשעת ההחזרה");
      return;
    }
    const joiResponse = validateInputs(acc7ValidationSchema, acc7Data);
    if (joiResponse) {
      return;
    }

    try {
      const locationDetails = {
        ...acc7Data,
        gpsData: acc7Data.mapsLocation,
      };
      delete locationDetails.mapsLocation;
      console.log("beforeUpdate", locationDetails);

      const updatedData = await axios.patch(`/caravans/${caravanId}`, {
        locationDetails,
      });
      if (updatedData.status === 200) {
        toast.success("הקרוואן עודכן בהצלחה");
      }
    } catch (err) {
      console.error("Error:", err);
    }

    nextBtn(acc7Data, 6);
  };
  //console.log("acc7Data", acc7Data);

  //console.log("acc7 parantData", parentData);
  if (!parentData) return <CircularProgress />;

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
              value={acc7Data.pickupTime}
              onChange={(e) => handleInputChange(e, "pickupTime")}
              MenuProps={{
                PaperProps: {
                  sx: {
                    direction: "rtl",
                  },
                },
              }}
            >
              {generateTimeOptions("08:00", "22:00").map((time) => (
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
              value={acc7Data.dropoffTime}
              onChange={(e) => handleInputChange(e, "dropoffTime")}
              MenuProps={{
                PaperProps: {
                  sx: {
                    direction: "rtl",
                  },
                },
              }}
            >
              {generateTimeOptions("08:00", "22:00").map((time) => (
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
          עדכן
        </Button>
      </Box>
    </Box>
  );
};

export default EditAcc7;
