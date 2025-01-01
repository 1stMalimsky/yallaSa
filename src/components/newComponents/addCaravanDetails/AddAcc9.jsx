import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";

const AddAcc9 = ({ nextBtn }) => {
  const [acc9Data, setAcc9Data] = useState({
    pricePerNight: "",
    minimumNights: "",
    cancellationPolicy: [],
    insuranceIncluded: "",
    extraInsurance: "",
  });
  const [extraInsuranceAvailable, setExtraInsuranceAvailable] = useState("");

  const handleNextBtn = () => {
    nextBtn(acc9Data, 9);
  };

  const handleTick = (e) => {
    setAcc9Data((prevData) => {
      const newData = { ...prevData };
      newData[e.target.name] = e.target.value;
      return newData;
    });
  };

  console.log("insurance", acc9Data.extraInsurance);

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            value={acc9Data.pricePerNight}
            className="inputFixLong"
            label="מחיר ללילה"
            sx={{ marginLeft: 1 }}
          />
          <Typography variant="subtitle1">ש"ח</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            value={acc9Data.minimumNights}
            className="inputFixExtraLong"
            label="מינימום לילות"
            sx={{ marginLeft: 1 }}
          />
          <Typography variant="subtitle1">לילות</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">ביטוח כלול במחיר?</Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend" />
            <RadioGroup
              row
              name="insuranceIncluded"
              value={acc9Data.insuranceIncluded}
              onChange={handleTick}
            >
              <FormControlLabel value={true} control={<Radio />} label="כן" />
              <FormControlLabel value={false} control={<Radio />} label="לא" />
            </RadioGroup>
          </FormControl>
          {acc9Data.insuranceIncluded === "true" && (
            <Box>
              <Typography variant="subtitle1">
                האם יש אפשרות לרכוש ביטוח פרמיום?
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend" />
                <RadioGroup
                  row
                  name="extraInsuranceAvailable"
                  value={extraInsuranceAvailable}
                  onChange={handleTick}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="כן"
                    onClick={() => setExtraInsuranceAvailable(true)}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="לא"
                    onClick={() => setExtraInsuranceAvailable(false)}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}
          {acc9Data.insuranceIncluded === "true" && extraInsuranceAvailable && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                className="inputFixExtraLong"
                label="מחיר ביטוח פרמיום"
                name="extraInsurance"
                value={acc9Data.extraInsurance}
                sx={{ marginLeft: 1 }}
                onChange={handleTick}
              />
              <Typography variant="subtitle1">ש"ח</Typography>
            </Box>
          )}
          {acc9Data.insuranceIncluded === "false" && (
            <Box>
              <TextField
                className="inputFixLong"
                label="עלות ביטוח בסיסי"
                sx={{ marginRight: 1, marginTop: 1 }}
              />
              <TextField
                className="inputFixLong"
                label="עלות ביטוח פרמיום"
                sx={{ marginRight: 1, marginTop: 1 }}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default AddAcc9;
