import { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import axios from "axios";

const ProfileAcc3 = (userDetails) => {
  const [inputState, setInputState] = useState(userDetails);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const getUserCaravans = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/caravan/getCaravansByUserId/${userDetails._id}`
      );
      //console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Accordion
      open={accordionOpen}
      onClick={() => setAccordionOpen(!accordionOpen)}
    >
      <AccordionSummary>ניהול הקרוואנים שלי</AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default ProfileAcc3;
