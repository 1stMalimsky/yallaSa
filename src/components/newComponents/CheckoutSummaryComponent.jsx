import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Card,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckoutDateComponent from "./CheckoutDateComponent";
import extractDataToArr from "./checkoutAccordion/helpers/extractDataToArr";
import CircularProgress from "@mui/material/CircularProgress";
import ChcekoutDateComponent from "./CheckoutDateComponent";

const CheckoutSummaryComponent = ({
  checkoutCompData,
  totalPrice,
  caravanDetails,
}) => {
  const [extrasDetails, setExtrasDetails] = useState([]);

  //console.log("dateData", dateData);
  //console.log("checkoutdata", checkoutCompData);

  useEffect(() => {
    if (checkoutCompData && checkoutCompData[5] === undefined) return;
    setExtrasDetails(extractDataToArr(checkoutCompData[5]));
  }, [checkoutCompData[5]]);

  //console.log("checkoutCompData", checkoutCompData);
  //console.log("Total price arr", totalPrice);

  if (!totalPrice) {
    return <CircularProgress />;
  }
  return (
    <div>
      <Card sx={{ display: { xs: "none", md: "block" }, padding: 1 }}>
        <Grid container>
          {/* IMAGE */}
          <Grid item xs={12} md={6}>
            <img
              className="checkoutComponentImg"
              src={caravanDetails.imgs[0].thumbnail}
              alt="checkout"
            />
          </Grid>
          {/* CARAVAN DETAILS */}
          <Grid item xs={12} md={6} sx={{ pr: 1 }}>
            <Typography variant="h6">
              שם: {caravanDetails.ownerDetails.name}
            </Typography>
            <Typography variant="h6">דגם: {caravanDetails.title}</Typography>
            <Typography variant="h6">חוות דעת</Typography>
          </Grid>
          {/* PICKED DATES */}
          <Grid item xs={12}>
            <Box>
              <CheckoutDateComponent
                panelData={checkoutCompData}
                details={caravanDetails}
              />
            </Box>
            <Divider
              sx={{
                borderWidth: 1,
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
                  <Typography variant="body1">
                    {totalPrice.totalRentalPrice}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {checkoutCompData?.[0]?.numOfDays || "0"} לילות &#8362;
                {totalPrice.totalRentalPrice /
                  checkoutCompData?.[0]?.numOfDays || "0"}
                X
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="checkoutAccordionExtras"
              >
                <div className="checkoutAccordionSummary">
                  <Typography variant="body1">סה"כ תוספות</Typography>
                  <Typography variant="body1">
                    {totalPrice.totalExtras}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="checkoutAccordionService"
              >
                <div className="checkoutAccordionSummary">
                  <Typography variant="body1">שירותים נוספים</Typography>
                  <Typography variant="body1">
                    {totalPrice.totalInsurance + totalPrice.totalCancellation}
                  </Typography>
                </div>{" "}
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {checkoutCompData &&
                    checkoutCompData[4] &&
                    totalPrice.totalInsurance > 0 && (
                      <Box
                        sx={{
                          width: "93%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body1">
                          ביטוח: {checkoutCompData[4].insuranceType}
                        </Typography>
                        <Typography variant="body1">
                          {totalPrice.totalInsurance}
                        </Typography>
                      </Box>
                    )}
                  {checkoutCompData &&
                    checkoutCompData[6] &&
                    totalPrice.totalCancellation > 0 && (
                      <Box
                        sx={{
                          width: "93%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body1">
                          ביטוח ביטולים: {checkoutCompData[6].policyChoice}
                        </Typography>
                        <Typography variant="body1">
                          {totalPrice.totalCancellation}
                        </Typography>
                      </Box>
                    )}
                </Box>
              </AccordionDetails>
            </Accordion>
            <div className="checkoutAccordionSummary">
              <Typography variant="h6">סה"כ</Typography>
              <Typography variant="h6">{+totalPrice.grandTotal}</Typography>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default CheckoutSummaryComponent;
