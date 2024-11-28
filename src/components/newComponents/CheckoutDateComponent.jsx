import { useState, useEffect } from "react";
import { Typography, Box, Grid, Divider, Link } from "@mui/material";
import dateModifier from "./helpers/dateModifier";

const ChcekoutDateComponent = ({ panelData, details }) => {
  const [modifiedDates, setModifiedDates] = useState({
    pickupDate: [],
    dropoffDate: [],
    pickupTime: "",
    dropoffTime: "",
  });

  useEffect(() => {
    if (!panelData) return;
    setModifiedDates({
      pickupDate: dateModifier(panelData[0].start),
      dropoffDate: dateModifier(panelData[0].end),
      pickupTime: panelData[2].pickupTime,
      dropoffTime: panelData[3].dropoffTime,
    });
  }, [panelData]);
  // console.log("dates", Pan);

  if (!details || !panelData) {
    return;
  }
  //console.log("modifiedDates", modifiedDates);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Divider
            sx={{
              borderColor: "rgb(0, 0, 0, 0.5)",
              borderWidth: 1,
              width: "90%",
              mx: "auto",
            }}
          />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">איסוף:</Typography>
          <Typography variant="h6">החזרה:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            {modifiedDates.pickupDate[0]}, &nbsp;
            {modifiedDates.pickupDate[1]} &nbsp;ב
            {modifiedDates.pickupDate[2]}
          </Typography>
          <Typography variant="h6">בשעה: {modifiedDates.pickupTime}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            {modifiedDates.dropoffDate[0]}, &nbsp;
            {modifiedDates.dropoffDate[1]} &nbsp;ב
            {modifiedDates.dropoffDate[2]}
          </Typography>
          <Typography variant="h6">
            בשעה: {modifiedDates.dropoffTime}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link
            href={details.locationDetails.mapsLocation}
            target="_blank"
            rel="noopener noreferrer"
          >
            מקום איסוף
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChcekoutDateComponent;
