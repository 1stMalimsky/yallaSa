import { useEffect, useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Panel7 = ({ prevInputData, grandTotal, handleNextButton, onSubmit }) => {
  //console.log("panelData", prevInputData, "Gradn Total", grandTotal);

  const [extrasDetails, setExtrasDetails] = useState(null);

  const extractExtras = (extras) => {
    const extraArr = [];
    for (const [name, details] of Object.entries(extras)) {
      extraArr.push({
        name: name,
        extraSum: details.extraSum,
        extraPrice: details.totalPrice,
      });
    }
    console.log("extraArr", extraArr);

    setExtrasDetails(extraArr);
  };
  useEffect(() => {
    extractExtras(prevInputData[5]);
  }, [prevInputData[5]]);

  return (
    <div>
      {/* TOTAL RENTAL PRICE */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon id="miniPanel1" />}>
          <Box
            id="mp1"
            sx={{
              width: "95%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography id="rentPrice1" variant="h6">
              מחיר השכרה
            </Typography>
            <Typography id="total1" variant="h6">
              {grandTotal.totalRentalPrice}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              width: "95%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle1">סה"כ מחיר השכרה</Typography>
            <Typography variant="subtitle1">
              &#8362;{grandTotal.totalRentalPrice}
            </Typography>
          </Box>
          <Typography variant="body1">
            {prevInputData[0].numOfDays} לילות &#8362;
            {grandTotal.totalRentalPrice / prevInputData[0].numOfDays}X
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* TOTAL EXTRAS PRICE */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon id="miniPanel2" />}>
          <Box
            id="mp2"
            sx={{
              width: "95%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography id="extras2" variant="h6">
              תוספות
            </Typography>
            <Typography id="total2" variant="h6">
              {grandTotal.totalExtras}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {extrasDetails && (
            <Grid container>
              {extrasDetails.map((extra) => (
                <Grid
                  item
                  key={extra.name}
                  xs={11}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography key={extra.name} variant="body1">
                    X {extra.extraSum} {extra.name}
                  </Typography>
                  <Typography key={extra.name + "1"} variant="body1">
                    {extra.extraPrice} &#8362;
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>

      {/* SERVICE FEES */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon id="miniPanel3" />}>
          <Box
            id="mp3"
            sx={{
              width: "95%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography id="services3" variant="h6">
              שירותים נוספים
            </Typography>
            <Typography id="total3" variant="h6">
              Total
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Box
        sx={{
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">סה"כ להזמנה</Typography>
        <Typography variant="h5">&#8362;</Typography>
      </Box>
    </div>
  );
};

export default Panel7;
