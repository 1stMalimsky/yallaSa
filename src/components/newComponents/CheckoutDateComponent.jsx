import { useState, useEffect } from "react";
import { Typography, Box, Grid, Divider } from "@mui/material";
import dateModifier from "./helpers/dateModifier";

const ChcekoutDateComponent = ({ dates }) => {
  const [modifiedDates, setModifiedDates] = useState({
    pickupDate: "",
    dropoffDate: "",
    location: "",
  });

  useEffect(() => {
    if (!dates || !dates[0]) return;
    setModifiedDates({
      pickupDate: dateModifier(dates[0].pickupDate),
      dropoffDate: dateModifier(dates[0].dropoffDate),
    });
  }, [dates]);

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
          <Typography variant="subtitle1">שם העסק ומקום איסוף</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            {modifiedDates.dropoffDate[0]}, &nbsp;
            {modifiedDates.dropoffDate[1]} &nbsp;ב
            {modifiedDates.dropoffDate[2]}
          </Typography>
          <Typography variant="subtitle1">שם העסק ומקום איסוף</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChcekoutDateComponent;
