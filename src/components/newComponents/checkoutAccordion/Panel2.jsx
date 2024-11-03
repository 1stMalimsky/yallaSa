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

const Panel2 = ({ setExpanded, onSubmit }) => {
  const [inputState, setInputState] = useState({
    pickupLocation: "",
    pickupTime: "",
    pickupDate: null,
  });

  const [isError, setIsError] = useState(false);

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

  return (
    <div>
      <Grid container spacing={2}>
        {/* PICKUP DATE & LOCATION */}
        <Grid item xs={12}>
          <Typography variant="h4">כפר סבא (variant)</Typography>
          <Typography variant="h6">
            תאריך: {inputState.pickupLocation}
          </Typography>
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
              {generateTimeOptions().map((time) => (
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