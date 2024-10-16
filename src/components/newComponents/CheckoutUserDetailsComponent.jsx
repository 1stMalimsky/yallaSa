import React, { useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Box,
  Grid,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  ButtonBase,
} from "@mui/material";
import Panel1 from "./checkoutAccordion/Panel1";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CheckoutUserDetailsComponent = () => {
  const [isExpanded, setIsExpanded] = useState("panel1");

  const [pickupTime, setpickupTime] = useState("");

  const handleNextBtn = () => {
    let currentPanel = parseInt(isExpanded.slice(-1));
    setIsExpanded("panel" + (currentPanel + 1));
  };

  const handleChangeBtn = () => {
    let panelToChange = isExpanded.slice(-1);
    console.log(panelToChange);

    setIsExpanded("panel" + (panelToChange - 1));
  };

  return (
    <Box>
      {/* PANEL1 */}
      <Accordion defaultExpanded expanded={isExpanded === "panel1"} id="panel1">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
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
          />
        </AccordionDetails>
      </Accordion>
      {/* PANEL2 */}
      <Accordion expanded={isExpanded === "panel2"} id="panel2">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">מקום ושעת איסוף</Typography>
          {isExpanded === "panel3" ? (
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">כפר סבא</Typography>
              <Typography variant="h6">תאריך</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>בחר שעת איסוף</InputLabel>
                <Select label="pickupTime" defaultValue="08:00">
                  <MenuItem value="08:00">08:00</MenuItem>
                  <MenuItem value="09:00">09:00</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleNextBtn}>
              הבא
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      {[
        "Pick-up Information",
        "Drop-off Information",
        "Protection Plan",
        "Extras",
      ].map((section, index) => (
        <Accordion key={index} disabled={index > 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {index + 2}. {section}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Details for {section} go here.</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CheckoutUserDetailsComponent;
