import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
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

const Panel2 = ({ setExpanded, onSubmit, locationData }) => {
  const [inputState, setInputState] = useState({
    pickupTime: "",
    pickupDate: null,
  });

  const [timeOptions, setTimeOptions] = useState([]);

  const [isError, setIsError] = useState(false);

  const params = useParams();
  useEffect(() => {
    console.log("locationData", locationData);

    const startDate = dayjs.unix(params.start).format("YYYY-MM-DD");
    const endDate = dayjs.unix(params.end).format("YYYY-MM-DD");
    const pickupTime = locationData.pickupTime;
    const dropoffTime = locationData.dropoffTime;
    const timeOptions = generateTimeOptions(pickupTime, dropoffTime);
    console.log("timeOptions", pickupTime, dropoffTime);

    setInputState({ ...inputState, pickupDate: startDate });
    setTimeOptions(timeOptions);
  }, [params]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputState((prevState) => ({
      ...prevState,
      pickupTime: value,
    }));
  };

  const validateInputs = () => {
    const { error } = validatePanel2(inputState.pickupTime);
    if (error) {
      //setIsError(error.message);
      setIsError(true);
      return false;
    } else {
      setIsError(false);
      return true;
    }
  };
  const handlePanel2Submit = () => {
    if (validateInputs()) {
      onSubmit(inputState);
      setExpanded("panel3");
    }
  };
  if (timeOptions.length === 0) {
    return <CircularProgress />;
  }
  return (
    <div>
      <Grid container spacing={2}>
        {/* PICKUP DATE & LOCATION */}
        <Grid item xs={12}>
          <Typography variant="h4">{locationData.city}</Typography>
          <Typography variant="h6">
            {locationData.street} {locationData.houseNumber}
          </Typography>
          <Typography variant="h6">תאריך: {inputState.pickupDate}</Typography>
        </Grid>
        {/* PICKUP TIME */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel className="pickupTimeInput">בחר שעת איסוף</InputLabel>
            <Select
              label="pickupTime"
              value={inputState.pickupTime}
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
            {isError && <Alert severity="error">אנא בחרו שעת איסוף</Alert>}
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePanel2Submit}
          disabled={!inputState.pickupTime}
        >
          הבא
        </Button>
      </Box>
    </div>
  );
};

export default Panel2;
