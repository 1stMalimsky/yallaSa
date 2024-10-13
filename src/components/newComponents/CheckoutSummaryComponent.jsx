import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CheckoutSummaryComponent = () => {
  return (
    <div>
      <Grid container>
        {/* IMAGE */}
        <Grid item xs={12} lg={6}>
          <img
            className="checkoutComponentImg"
            src="../imgs/caravanPhotos/caravanJapan01.jpg"
            alt="checkout"
          />
        </Grid>
        {/* CARAVAN DETAILS */}
        <Grid item xs={12} lg={6} sx={{ padding: 1 }}>
          <Typography variant="h6">מלך הקרוואנים</Typography>
          <Typography variant="h6">דגם</Typography>
          <Typography variant="h6">חוות דעת</Typography>
        </Grid>
        {/* PICKED DATES */}
        <Grid item xs={12}>
          PICKED DATES COMPONENT
          <Divider
            sx={{
              borderBottomWidth: 2,
              borderColor: "rgb(0, 0, 0, 0.5)",
              my: 2,
              width: "90%",
              mx: "auto",
            }}
          />
        </Grid>
        {/* PRICE DETAILS */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="checkoutAccordionPrice"
            >
              <div className="checkoutAccordionSummary">
                <Typography variant="body1">מחיר השכרה</Typography>
                <Typography variant="body1">מחיר</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>השכרת קרוואן..............מחיר</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="checkoutAccordionExtras"
            >
              <div className="checkoutAccordionSummary">
                <Typography variant="body1">מחיר השכרה</Typography>
                <Typography variant="body1">מחיר</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              תוספות, ביטוחים, מיסים..............מחיר
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="checkoutAccordionService"
            >
              <div className="checkoutAccordionSummary">
                <Typography variant="body1">מחיר השכרה</Typography>
                <Typography variant="body1">מחיר</Typography>
              </div>{" "}
            </AccordionSummary>
            <AccordionDetails>
              שירות........................מחיר
            </AccordionDetails>
          </Accordion>
          <div className="checkoutAccordionSummary">
            <Typography variant="h6">סה"כ</Typography>
            <Typography variant="h6">מחיר</Typography>
          </div>
          <div className="checkoutAccordionSummary">
            <Typography variant="body1">מדיניות ביטולים</Typography>
            <Typography variant="body1">גמיש</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutSummaryComponent;
