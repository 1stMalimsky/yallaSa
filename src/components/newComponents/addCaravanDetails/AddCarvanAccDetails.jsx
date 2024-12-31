import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import AddAcc1 from "./AddAcc1";
import AddAcc2 from "./AddAcc2";
import AddAcc3 from "./AddAcc3";
import AddAcc4 from "./AddAcc4";
import AddAcc5 from "./AddAcc5";
const AddCaravanAcc = () => {
  const [accDetails, setAccDetails] = useState([]);
  const [openState, setOpenState] = useState(4);
  //console.log("openState", openState);

  const handleNextBtn = (data, numberOfEntry) => {
    setAccDetails((prevData) => {
      const newData = [...prevData];
      newData[numberOfEntry] = data;
      return newData;
    });
    /* STOPPER */
    if (numberOfEntry === 4) return;
    /* STOPPER */
    setOpenState(numberOfEntry + 1);
  };

  const handleBackBtn = (e) => {
    if (openState === 0) {
      return;
    }

    const currentTarget = e.currentTarget.id;
    const idNumber = +currentTarget.slice(-1);
    if (idNumber < openState || idNumber > openState) return;
    setOpenState(openState - 1);
  };

  const updatePhotoRemoved = (data) => {
    setAccDetails((prevData) => {
      const newData = [...prevData];
      newData[2] = data;
      // console.log("updatePhotoRemoved Data", newData);
      return newData;
    });
  };

  useEffect(() => {
    console.log("accDetails", accDetails);
  }, [accDetails]);

  return (
    <Box>
      {/* ACC1 */}
      <Accordion expanded={openState === 0 ? true : false}>
        <AccordionSummary
          id="acc1"
          expandIcon={
            openState === 1 ? <Typography variant="h5">שינוי</Typography> : null
          }
          onClick={handleBackBtn}
        >
          <Typography variant="h5">סוג הקרוואן</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc1 nextBtn={handleNextBtn} />
        </AccordionDetails>
      </Accordion>
      {/* ACC2 */}
      <Accordion expanded={openState === 1 ? true : false}>
        <AccordionSummary
          id="acc2"
          expandIcon={
            openState === 2 ? <Typography variant="h5">שינוי</Typography> : null
          }
          onClick={handleBackBtn}
        >
          <Typography variant="h5">פרטי הלנה</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc2 nextBtn={handleNextBtn} />
        </AccordionDetails>
      </Accordion>
      {/* ACC3 */}
      <Accordion expanded={openState === 2 ? true : false}>
        <AccordionSummary
          id="acc3"
          expandIcon={
            openState === 3 ? <Typography variant="h5">שינוי</Typography> : null
          }
          onClick={handleBackBtn}
        >
          <Typography variant="h5">ביטוח ורישיון רכב</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc3 nextBtn={handleNextBtn} photoRemoved={updatePhotoRemoved} />
        </AccordionDetails>
      </Accordion>
      {/* ACC4 */}
      <Accordion expanded={openState === 3 ? true : false}>
        <AccordionSummary
          id="acc4"
          onClick={handleBackBtn}
          expandIcon={
            openState === 4 ? <Typography variant="h5">שינוי</Typography> : null
          }
        >
          <Typography variant="h5">פרטים אישיים</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc4 nextBtn={handleNextBtn} />
        </AccordionDetails>
      </Accordion>
      {/* ACC5 */}
      <Accordion expanded={openState === 4 ? true : false}>
        <AccordionSummary
          expandIcon={
            openState === 5 ? <Typography variant="h5">שינוי</Typography> : null
          }
          id="acc5"
          onClick={handleBackBtn}
        >
          <Typography variant="h5">תמונות הקרוואן</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddAcc5 nextBtn={handleNextBtn} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AddCaravanAcc;
