import { useState } from "react";
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
} from "@mui/material";
import generateTimeOptions from "../../../utils/generateTimeOptions";
import { validatePanel2 } from "../../../validation/checkoutAccordion";

const Panel3 = ({ setExpanded, onSubmit }) => {
  const [inputState, setInputState] = useState({
    dropoffLocation: "",
    dropoffTime: "",
    dropoffDate: null,
  });

  const [isError, setIsError] = useState(null);

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

  return (
    <div>
      <Grid container spacing={2}>
        {/* DROPOFF DATE & LOCATION */}
        <Grid item xs={12}>
          <Typography variant="h4">כפר סבא (variant)</Typography>
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
              {generateTimeOptions().map((time) => (
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
