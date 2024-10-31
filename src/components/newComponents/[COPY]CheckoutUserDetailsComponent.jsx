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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  calculateExtrasTotal,
  calculateTotalPrice,
} from "./checkoutAccordion/helpers/extrasCalculator";

import daysCalculator from "../../utils/daysCalculator";

const CheckoutUserDetailsComponent = ({ rentalDates /*CARAVANDETAILS*/ }) => {
  const [isExpanded, setIsExpanded] = useState("panel5");
  const [panelData, setPanelData] = useState([
    {
      pickupDate: "2024-03-10",
      dropoffDate: "2024-03-15",
      numOfDays: daysCalculator("2024-03-10", "2024-03-15"),
    }, // Initial data for panel 0
    null, // Panel 1
    null, // Panel 2
    null, // Panel 3
    null, // Panel 4
    [], // Panel 5
    null, // Panel 6
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePanelData = (panelNumber, data) => {
    setPanelData((prevData) => {
      const updatedData = [...prevData];
      updatedData[panelNumber] = data;
      return updatedData;
    });
  };

  const handleNextBtn = () => {
    let currentPanel = parseInt(isExpanded.slice(-1));
    setIsExpanded("panel" + (currentPanel + 1));
  };

  const handleChangeBtn = () => {
    let panelToChange = isExpanded.slice(-1);
    setIsExpanded("panel" + (panelToChange - 1));
  };

  const onExpandClick = (e) => {
    setIsExpanded(e.target.id);
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice(100, panelData);
    setTotalPrice(totalPrice);
  }, [panelData]);
  //console.log("panel data:", panelData);

  return (
    <Box>
      {/* PANEL1 */}
      <Accordion defaultExpanded expanded={isExpanded === "panel1"} id="p1">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="panel1" onClick={onExpandClick} />}
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
            handleNextButton={handleNextBtn}
            onSubmit={(data) => handlePanelData(1, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL2 */}
      <Accordion expanded={isExpanded === "panel2"} id="p2">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="panel2" onClick={onExpandClick} />}
        >
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
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            handleNextButton={handleNextBtn}
            onSubmit={(data) => handlePanelData(2, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 3 */}
      <Accordion expanded={isExpanded === "panel3"} id="p3">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="panel3" onClick={onExpandClick} />}
        >
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
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            handleNextButton={handleNextBtn}
            onSubmit={(data) => handlePanelData(3, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 4 */}
      <Accordion expanded={isExpanded === "panel4"} id="p4">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="panel4" onClick={onExpandClick} />}
        >
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
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            handleNextButton={handleNextBtn}
            onSubmit={(data) => handlePanelData(4, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 5 */}
      <Accordion expanded={isExpanded === "panel5"} id="p5">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="panel5" onClick={onExpandClick} />}
        >
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
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            handleNextButton={handleNextBtn}
            onSubmit={(data) => handlePanelData(5, data)}
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL 6 */}
      <Accordion expanded={isExpanded === "panel6"} id="p6">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="panel6" onClick={onExpandClick} />}
        >
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
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            handleNextButton={handleNextBtn}
            onSubmit={(data) => handlePanelData(6, data)}
          />
        </AccordionDetails>
      </Accordion>

      {/* PANEL 7 */}
      <Accordion expanded={isExpanded === "panel7"} id="p7">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon id="panel7" onClick={onExpandClick} />}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            7. תשלום
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Panel7
            expandedState={isExpanded}
            setExpanded={setIsExpanded}
            prevInputData={panelData}
            grandTotal={totalPrice}
            handleNextButton={handleNextBtn}
            onSubmit={(data) => handlePanelData(7, data)}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckoutUserDetailsComponent;
