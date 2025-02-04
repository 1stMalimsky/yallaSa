import { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { validateInputs } from "../../../validation/validation.js";
import { acc2ValidationSchema } from "../../../validation/addCaravanValidation.js";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast } from "react-toastify";

const EditAcc2 = ({ nextBtn, parentData, caravanId }) => {
  const [acc2Data, setAcc2Data] = useState({
    parentData,
  });

  useEffect(() => {
    setAcc2Data(parentData);
  }, [parentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcc2Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextButton = async () => {
    const validationResult = validateInputs(acc2ValidationSchema, acc2Data);
    if (validationResult) {
      return console.log("acc2 validation error", validationResult);
    }
    try {
      const updateData = await axios.patch(`/caravans/${caravanId}`, {
        listingName: acc2Data.listingName,
        description: acc2Data.description,
      });
      if (updateData) {
        console.log("updateData", updateData);
        toast.success("הקרוואן עודכן בהצלחה");
        nextBtn(acc2Data, 1);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!acc2Data) return <CircularProgress />;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">כיצד תרצו שהקרוואן יקרא:</Typography>
          <TextField
            name="listingName"
            value={acc2Data.listingName || ""}
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
          עדכן
        </Button>
      </Box>
    </Box>
  );
};

export default EditAcc2;
