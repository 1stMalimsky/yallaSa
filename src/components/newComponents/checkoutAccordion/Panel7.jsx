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
import extractDataToArr from "./helpers/extractDataToArr";

const Panel7 = ({ prevInputData, grandTotal, onSubmit }) => {
  //console.log("panelData", prevInputData, "Gradn Total", grandTotal);

  const [extrasDetails, setExtrasDetails] = useState(null);

  useEffect(() => {
    if (prevInputData[5] === undefined) return;
    else setExtrasDetails(extractDataToArr(prevInputData[5]));
  }, [prevInputData]);

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
                    {extra.totalPrice} &#8362;
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
              {grandTotal.totalInsurance + grandTotal.totalCancellation}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {prevInputData[4] && grandTotal.totalInsurance > 0 && (
              <Box
                sx={{
                  width: "93%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                  ביטוח <br />
                  {prevInputData[4].insuranceType}
                </Typography>
                <Typography variant="body1">
                  {grandTotal.totalInsurance}
                </Typography>
              </Box>
            )}
            {prevInputData[6] && grandTotal.totalCancellation > 0 && (
              <Box
                sx={{
                  width: "93%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">
                  מדיניות ביטולים <br />
                  {prevInputData[6].policyChoice}
                </Typography>
                <Typography variant="body1">
                  {grandTotal.totalCancellation}
                </Typography>
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* GRAND TOTAL */}
      <Box
        sx={{
          mt: 3,
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">סה"כ להזמנה</Typography>
        <Typography variant="h5">&#8362;{grandTotal.grandTotal}</Typography>
      </Box>
    </div>
  );
};

export default Panel7;
