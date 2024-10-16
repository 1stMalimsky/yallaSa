import { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Alert,
} from "@mui/material";
import DatePickers from "../../DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/he";
import { validatePanel1 } from "../../../validation/checkoutAccordion";
import calculateAge from "../../../utils/ageCalculator";

/* SET HEBREW DATE */
dayjs.locale("he");

const Panel1 = ({ setExpanded, handleNextButton }) => {
  const [inputState, setInputState] = useState({
    fullName: "",
    resident: "",
    phone: "",
    birthDate: undefined,
    age: "",
  });

  const [errorState, setErrorState] = useState({});

  const handleInputChange = (e, inputName) => {
    const value = e.target.value;
    setInputState((prevState) => ({
      ...prevState,
      [inputName]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    let newFromat = dayjs(newDate).format("YYYY-MM-DD");
    let userAge = calculateAge(newFromat);
    setInputState((prevState) => ({
      ...prevState,
      birthDate: newFromat,
      age: userAge,
    }));
  };

  const validateInputs = () => {
    const { error } = validatePanel1(inputState);
    console.log(error.details);

    if (error) {
      const errorMessages = {};
      error.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrorState(errorMessages);
      return;
    } else {
      setExpanded("panel2");
      handleNextButton();
    }
    console.log("joiResponse", errorState);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
      <div>
        <Grid container spacing={2} alignItems="center">
          {/* FULLNAME */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="fullName"
              value={inputState.fullName}
              label="שם מלא"
              variant="outlined"
              fullWidth
              onChange={(e) => handleInputChange(e, "fullName")}
            />
          </Grid>
          {/* RESIDENT STATUS */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth onChange={handleInputChange}>
              <InputLabel>תושב ישראלי</InputLabel>
              <Select
                id="resident"
                value={inputState.resident}
                labelId="resident-label"
                defaultValue="yes"
                onChange={(e) => handleInputChange(e, "resident")}
              >
                <MenuItem value="true">כן</MenuItem>
                <MenuItem value="false">לא</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* PHONE */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              value={inputState.phone}
              label="מספר טלפון נייד"
              variant="outlined"
              fullWidth
              inputProps={{
                type: "number",
                inputMode: "numeric",
                style: { appearance: "textfield" },
              }}
              onChange={(e) => handleInputChange(e, "phone")}
            />
          </Grid>
          {/* DATE PICKER */}
          <Grid item xs={12} sm={6}>
            <DatePickers
              dateText="תאריך לידה"
              value={inputState.birthDate}
              onChange={handleDateChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Button
            id="panel1"
            variant="contained"
            color="primary"
            onClick={validateInputs}
          >
            הבא
          </Button>
        </Box>
      </div>
    </LocalizationProvider>
  );
};

export default Panel1;
