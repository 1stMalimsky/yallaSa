import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { validateInputs } from "../../../validation/validation";
import { acc8ValidationSchema } from "../../../validation/addCaravanValidation";

const AddAcc8 = ({ nextBtn }) => {
  const [acc8Data, setAcc8Data] = useState({
    listingName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcc8Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextButton = () => {
    const validationResult = validateInputs(acc8ValidationSchema, acc8Data);
    if (validationResult) {
      return;
    }
    nextBtn(acc8Data, 7);
  };
  console.log("accdata", acc8Data);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">כיצד תרצו שהקרוואן יקרא:</Typography>
          <TextField
            name="listingName"
            value={acc8Data.listingName}
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
            value={acc8Data.description}
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

export default AddAcc8;
