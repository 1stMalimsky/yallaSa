import { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { validateInputs } from "../../../validation/validation";
import { acc2ValidationSchema } from "../../../validation/addCaravanValidation";
import checkSessionStorage from "../../../utils/helpers/checkSessionStorage.js";

const AddAcc2 = ({ nextBtn, sessionData }) => {
  const [acc2Data, setAcc2Data] = useState({
    listingName: "",
    description: "",
  });

  useEffect(() => {
    const sessionData = JSON.parse(checkSessionStorage(2));
    if (sessionData) {
      setAcc2Data(sessionData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcc2Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextButton = () => {
    const validationResult = validateInputs(acc2ValidationSchema, acc2Data);
    if (validationResult) {
      return;
    }
    sessionStorage.setItem("acc2Data", JSON.stringify(acc2Data));
    nextBtn(acc2Data, 1);
  };
  //console.log("accdata", acc2Data);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">כיצד תרצו שהקרוואן יקרא:</Typography>
          <TextField
            name="listingName"
            value={acc2Data.listingName}
            onChange={handleChange}
            sx={{ width: { xs: "100%", md: "70%", lg: "50%" }, marginTop: 1 }}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            רשמו תיאור קצר של הקרוואן:
          </Typography>
          <TextField
            name="description"
            multiline
            rows={5}
            value={acc2Data.description}
            onChange={handleChange}
            sx={{ width: { xs: "100%", md: "70%", lg: "50%" } }}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button variant="contained" onClick={handleNextButton}>
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default AddAcc2;
