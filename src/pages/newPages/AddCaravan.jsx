import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import AddCaravanAcc from "../../components/newComponents/addCaravanDetails/AddCarvanAccDetails";

const AddCaravan = () => {
  const params = useParams();
  const [inputState, setInputState] = useState({
    location: params.location,
    vehicleType: params.vehicleType,
  });
  const [startBtn, setStartBtn] = useState(true);

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        הוספת קרוואן
      </Typography>
      <AddCaravanAcc />
    </Box>
  );
};

export default AddCaravan;
