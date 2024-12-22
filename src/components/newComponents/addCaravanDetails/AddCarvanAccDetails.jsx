import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import AddAcc1 from "./AddAcc1";
import AddAcc2 from "./AddAcc2";

const AddCaravanAcc = () => {
  const [AccDetails, setAccDetails] = useState([]);

  const handleNextBtn = (data, numberOfEntry) => {
    console.log("data", data);

    setAccDetails((prevData) => {
      const newData = [...prevData];
      newData[numberOfEntry] = data;
      return newData;
    });
  };
  console.log("AccDetails", AccDetails);

  return (
    <Box>
      <AddAcc1 nextBtn={handleNextBtn} />
      <AddAcc2 nextBtn={handleNextBtn} />
    </Box>
  );
};

export default AddCaravanAcc;
