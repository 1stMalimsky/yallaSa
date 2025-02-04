import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import generateTimeOptions from "../../../utils/generateTimeOptions";
import { validatePanel2 } from "../../../validation/checkoutAccordion";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const Panel3 = ({ setExpanded, onSubmit, locationData }) => {
  const [inputState, setInputState] = useState({
    dropoffTime: "",
    dropoffDate: null,
  });

  const [timeOptions, setTimeOptions] = useState([]);
  const [isError, setIsError] = useState(null);

  const params = useParams();
  useEffect(() => {
    const startDate = dayjs.unix(params.start).format("YYYY-MM-DD");
    const endDate = dayjs.unix(params.end).format("YYYY-MM-DD");
    //console.log("locationData", locationData);

    const pickupTime = locationData.pickupTime;
    const dropoffTime = locationData.dropoffTime;
    const timeOptions = generateTimeOptions(pickupTime, dropoffTime);
    //console.log("timeOptions", pickupTime, dropoffTime);

    setInputState({
      ...inputState,
      pickupDate: startDate,
      dropoffDate: endDate,
    });
    setTimeOptions(timeOptions);
  }, [params]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputState((prevState) => ({
      ...prevState,
      dropoffTime: value,
    }));
  };

  const validateInputs = () => {
    const { error } = validatePanel2(inputState.dropoffTime);
    if (error) {
      setIsError(true);
      return false;
    } else {
      setIsError(false);
      return true;
    }
  };
  const handlePanel3Submit = () => {
    if (validateInputs()) {
      onSubmit(inputState);
      setExpanded("panel4");
    }
  };
  if (timeOptions.length === 0) {
    return <CircularProgress />;
  }
  return (
    <div>
      <Grid container spacing={2}>
        {/* DROPOFF DATE & LOCATION */}
        <Grid item xs={12}>
          <Typography variant="h4">{locationData.city}</Typography>
          <Typography variant="h6">
            {locationData.street} {locationData.houseNumber}
          </Typography>
          <Typography variant="h6">
            תאריך: {inputState.dropoffLocation}
          </Typography>
        </Grid>
        {/* DROPOFF TIME */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel className="dropoffTimeInput">בחר שעת החזרה</InputLabel>
            <Select
              label="dropoffTime"
              value={inputState.dropoffTime}
              onChange={handleInputChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    direction: "rtl",
                  },
                },
              }}
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
            {isError && <Alert severity="error">{isError}</Alert>}
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePanel3Submit}
          disabled={!inputState.dropoffTime}
        >
          הבא
        </Button>
      </Box>
    </div>
  );
};

export default Panel3;
