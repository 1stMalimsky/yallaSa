import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import CheckoutSummaryComponent from "../../components/newComponents/CheckoutSummaryComponent";
import CheckoutUserDetailsComponent from "../../components/newComponents/CheckoutUserDetailsComponent";

const NewCheckoutPage = () => {
  return (
    <div className="checkoutdivContainer">
      <h1 style={{ textAlign: "center" }}>יאללה! בואו ניסע</h1>
      <Grid
        container
        sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
      >
        <Grid item xs={12} sm={8}>
          <Grid container>
            {/* PROMOTIONAL TEXT */}
            <Grid
              item
              xs={12}
              sx={{ display: { xs: "none", sm: "flex" }, padding: 1 }}
            >
              <Typography variant="h4">Promotional text</Typography>
            </Grid>
            {/* USER DETAILS */}
            <Grid item xs={12} sx={{ padding: 1 }}>
              <Typography variant="h4">User details</Typography>
              <CheckoutUserDetailsComponent />
            </Grid>
          </Grid>
        </Grid>
        {/* CHECKOUT DETAILS */}
        <Grid item xs={12} sm={4} sx={{ padding: 1 }}>
          <CheckoutSummaryComponent />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewCheckoutPage;
