import { useState } from "react";
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
  Hidden,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CheckoutUserDetailsComponent = () => {
  const [isExpanded, setIsExpanded] = useState("panel1");

  const [pickupTime, setpickupTime] = useState("בחר שעת איסוף");

  return (
    <Box>
      {/* PANEL1 */}
      <Accordion defaultExpanded id="panel1">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">1. מידע אישי</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Full name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>תושב ישראלי</InputLabel>
                <Select label="Country of residence" defaultValue="yes">
                  <MenuItem value="yes">כן</MenuItem>
                  <MenuItem value="No">לא</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone number"
                variant="outlined"
                fullWidth
                inputProps={{
                  type: "number",
                  inputMode: "numeric",
                  style: { appearance: "textfield" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                variant="outlined"
                fullWidth
                placeholder="YYYY-MM-DD"
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* PANEL2 */}
      <Accordion id="panel2">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">מקום ושעת איסוף</Typography>
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
                <Select label="pickupTime" defaulValue="08:00">
                  <MenuItem value="08:00">08:00</MenuItem>
                  <MenuItem value="09:00">09:00</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button variant="contained" color="primary">
              Next
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
