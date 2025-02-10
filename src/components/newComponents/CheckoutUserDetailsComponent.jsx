import React, { useEffect, useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  ButtonBase,
} from "@mui/material";
import Panel1 from "./checkoutAccordion/Panel1";
import Panel2 from "./checkoutAccordion/Panel2";
import Panel3 from "./checkoutAccordion/Panel3";
import Panel4 from "./checkoutAccordion/Panel4";
import Panel5 from "./checkoutAccordion/Panel5";
import Panel6 from "./checkoutAccordion/Panel6";
import Panel7 from "./checkoutAccordion/Panel7";
import Panel8 from "./checkoutAccordion/Panel8";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { calculateTotalPrice } from "./checkoutAccordion/helpers/priceCalculator";
import CircularProgress from "@mui/material/CircularProgress";

const CheckoutUserDetailsComponent = ({
  sendDataUp,
  parnetData,
  caravanDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState("panel1");
  const [panelData, setPanelData] = useState(parnetData);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    sendDataUp(panelData, totalPrice);
  }, [panelData, totalPrice]);

  const handlePanelData = (panelNumber, data) => {
    setPanelData((prevData) => {
      const updatedData = [...prevData];
      updatedData[panelNumber] = data;
      console.log("updatedData", updatedData);

      return updatedData;
    });
  };

  const handleChangeBtn = () => {
    let panelToChange = isExpanded.slice(-1);
    setIsExpanded("panel" + (panelToChange - 1));
  };

  const getTotalPrice = async () => {
    if (!caravanDetails) {
      console.log("no caravanDetails in cehckoutDetalisComp");
      return;
    }
    if (caravanDetails && panelData && panelData[4] != null) {
      try {
        const rentalPrice = await calculateTotalPrice(
          panelData,
          caravanDetails
        );
        setTotalPrice(rentalPrice);
      } catch (err) {
        console.log("useEffect err", err);
      }
    }
  };

  useEffect(() => {
    if (!panelData) return console.log("useEffect no panelData");
    if (panelData) {
      //console.log("in the IF panelData", panelData);
      getTotalPrice();
    }
  }, [panelData[5]]);

  //console.log("totalPrice", totalPrice);
  //console.log("caravanDetails", caravanDetails);

  if (!totalPrice) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {/* PANEL1 */}
      <Accordion defaultExpanded expanded={isExpanded === "panel1"} id="p1">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="panel1" />}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            1. מידע אישי
          </Typography>
          {isExpanded === "panel2" ? (
            <ButtonBase onClick={handleChangeBtn}>
              <Typography variant="h6" id="changePanel1">
                שינוי
              </Typography>
            </ButtonBase>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Panel1
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            onSubmit={(data) => handlePanelData(1, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL2 */}
      <Accordion expanded={isExpanded === "panel2"} id="p2">
        <AccordionSummary expandIcon={<ExpandMoreIcon id="panel2" />}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            2. פרטי איסוף
          </Typography>
          {isExpanded === "panel3" ? (
            <ButtonBase onClick={handleChangeBtn}>
              <Typography variant="h6" id="changePanel2">
                שינוי
              </Typography>
            </ButtonBase>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Panel2
            locationData={caravanDetails.locationDetails}
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            onSubmit={(data) => handlePanelData(2, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 3 */}
      <Accordion expanded={isExpanded === "panel3"} id="p3">
        <AccordionSummary expandIcon={<ExpandMoreIcon id="panel3" />}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            3. פרטי החזרה
          </Typography>
          {isExpanded === "panel4" ? (
            <ButtonBase onClick={handleChangeBtn}>
              <Typography variant="h6" id="changePanel3">
                שינוי
              </Typography>
            </ButtonBase>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Panel3
            locationData={caravanDetails.locationDetails}
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            onSubmit={(data) => handlePanelData(3, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 4 */}
      <Accordion expanded={isExpanded === "panel4"} id="p4">
        <AccordionSummary expandIcon={<ExpandMoreIcon id="panel4" />}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            4. ביטוח
          </Typography>
          {isExpanded === "panel5" ? (
            <ButtonBase onClick={handleChangeBtn}>
              <Typography variant="h6" id="changePanel4">
                שינוי
              </Typography>
            </ButtonBase>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Panel4
            caravanDetails={caravanDetails}
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            onSubmit={(data) => handlePanelData(4, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 5 */}
      <Accordion expanded={isExpanded === "panel5"} id="p5">
        <AccordionSummary expandIcon={<ExpandMoreIcon id="panel5" />}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            5. בחירת תוספות
          </Typography>
          {isExpanded === "panel6" ? (
            <ButtonBase onClick={handleChangeBtn}>
              <Typography variant="h6" id="changePanel5">
                שינוי
              </Typography>
            </ButtonBase>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Panel5
            extraPrices={caravanDetails.extras}
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            onSubmit={(data) => handlePanelData(5, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 6 */}
      <Accordion expanded={isExpanded === "panel6"} id="p6">
        <AccordionSummary expandIcon={<ExpandMoreIcon id="panel6" />}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            6. אפשרויות ביטול
          </Typography>
          {isExpanded === "panel7" ? (
            <ButtonBase onClick={handleChangeBtn}>
              <Typography variant="h6" id="changePanel5">
                שינוי
              </Typography>
            </ButtonBase>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Panel6
            caravanDetails={caravanDetails}
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            onSubmit={(data) => handlePanelData(6, data)}
          />
        </AccordionDetails>
      </Accordion>

      {/* PANEL 7 */}
      <Accordion expanded={isExpanded === "panel7"} id="p7">
        <AccordionSummary expandIcon={<ExpandMoreIcon id="panel7" />}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            7. סיכום
          </Typography>
          {isExpanded === "panel8" ? (
            <ButtonBase onClick={handleChangeBtn}>
              <Typography variant="h6" id="changePanel5">
                שינוי
              </Typography>
            </ButtonBase>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Panel7
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            prevInputData={panelData}
            grandTotal={totalPrice}
            onSubmit={(data) => handlePanelData(7, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 8 */}
      <Accordion expanded={isExpanded === "panel8"} id="p8">
        <AccordionSummary expandIcon={<ExpandMoreIcon id="panel8" />}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            8. תשלום
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Panel8
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            grandTotal={totalPrice}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckoutUserDetailsComponent;
