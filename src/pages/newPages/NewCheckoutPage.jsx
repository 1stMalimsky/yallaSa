import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import CheckoutSummaryComponent from "../../components/newComponents/CheckoutSummaryComponent";
import CheckoutUserDetailsComponent from "../../components/newComponents/CheckoutUserDetailsComponent";

const NewCheckoutPage = () => {
  const params = useParams();

  const [panelData, setPanelData] = useState([
    {
      id: params.id,
      start: params.start,
      end: params.end,
      numOfDays: params.numOfDays,
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePanelDataChange = (newPanelData) => {
    console.log("handlePanelDataChange INIT");

    setPanelData((prevData) => ({
      ...prevData,
      newPanelData,
    }));
    setTotalPrice(newPanelData.totalPrice);
  };

  console.log("panelData NewChcekoutPage", panelData);

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
              <Typography variant="h5" sx={{ textDecoration: "underline" }}>
                פרטים אישיים
              </Typography>

              <CheckoutUserDetailsComponent
                sendDataUp={handlePanelDataChange}
                rentalDates={panelData}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* CHECKOUT DETAILS */}
        <Grid item xs={12} sm={4} sx={{ padding: 1 }}>
          <CheckoutSummaryComponent
            checkoutCompData={panelData}
            totalPrice={totalPrice}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewCheckoutPage;
