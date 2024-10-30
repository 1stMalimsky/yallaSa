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
import { DatePicker } from "@mui/x-date-pickers";
import { heIL } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/he";
import { validatePanel1 } from "../../../validation/checkoutAccordion";
import calculateAge from "../../../utils/ageCalculator";

/* SET HEBREW DATE */
dayjs.locale("he");

const Panel1 = ({ setExpanded, handleNextButton, onSubmit }) => {
  const [inputState, setInputState] = useState({
    fullName: "",
    resident: "",
    phone: "",
    birthDate: null,
    age: "",
  });

  const [errorState, setErrorState] = useState("");
  const [isError, setIsError] = useState(false);

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

  /* PANEL1 VALIDATION */
  const validateInputs = () => {
    const { error } = validatePanel1(inputState);

    if (error) {
      const errorMessages = {};
      error.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message;
      });
      // console.log(errorMessages);
      setIsError(true);
      setErrorState(errorMessages);
      return;
    } else {
      setIsError(false);
      setExpanded("panel2");
      onSubmit(inputState);
      handleNextButton();
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="he"
      localeText={
        heIL.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <div>
        <Grid container spacing={2} alignItems="center">
          {/* FULLNAME */}
          <Grid item xs={12} sm={6}>
            <TextField
              className="textFieldInputsFullName"
              id="fullName"
              value={inputState.fullName}
              label="שם מלא"
              variant="outlined"
              fullWidth
              onChange={(e) => handleInputChange(e, "fullName")}
            />
            {isError ? (
              errorState.fullName ? (
                <Alert severity="error">{errorState.fullName}</Alert>
              ) : (
                <Alert
                  severity="error"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    visibility: "hidden",
                  }}
                ></Alert>
              )
            ) : null}
          </Grid>
          {/* RESIDENT STATUS */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth onChange={handleInputChange}>
              <InputLabel className="selectInputField">תושב ישראלי</InputLabel>
              <Select
                id="resident"
                value={inputState.resident}
                labelId="resident-label"
                defaultValue="yes"
                onChange={(e) => handleInputChange(e, "resident")}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      direction: "rtl",
                    },
                  },
                }}
              >
                <MenuItem value="true">כן</MenuItem>
                <MenuItem value="false">לא</MenuItem>
              </Select>
            </FormControl>
            {isError ? (
              errorState.resident ? (
                <Alert severity="error">{errorState.resident}</Alert>
              ) : (
                <Alert
                  severity="error"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    visibility: "hidden",
                  }}
                ></Alert>
              )
            ) : null}
          </Grid>
          {/* PHONE */}
          <Grid item xs={12} sm={6}>
            <TextField
              className="textFieldInputsPhone"
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
            {isError ? (
              errorState.phone ? (
                <Alert severity="error">{errorState.phone}</Alert>
              ) : (
                <Alert
                  severity="error"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    visibility: "hidden",
                  }}
                ></Alert>
              )
            ) : null}
          </Grid>
          {/* DATE PICKER */}
          <Grid item xs={12} sm={6}>
            <DatePicker
              className="datePickerInput"
              label="תאריך לידה"
              variant="outlined"
              value={dayjs(inputState.birthDate)}
              onChange={handleDateChange}
            />
            {isError ? (
              errorState.birthDate ? (
                <Alert severity="error">{errorState.birthDate}</Alert>
              ) : (
                <Alert
                  severity="error"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    visibility: "hidden",
                  }}
                ></Alert>
              )
            ) : null}
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
