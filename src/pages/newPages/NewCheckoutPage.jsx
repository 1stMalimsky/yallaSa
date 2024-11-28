import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import CheckoutSummaryComponent from "../../components/newComponents/CheckoutSummaryComponent";
import CheckoutUserDetailsComponent from "../../components/newComponents/CheckoutUserDetailsComponent";
import caravanCatalog from "../../components/newComponents/helpers/caravanCatalog";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [currentCaravan, setCurrentCaravan] = useState(null);

  const getCaravanData = async (caravanId) => {
    try {
      const caravanSearchResult = await caravanCatalog.find(
        (item) => item._id === caravanId
      );
      setCurrentCaravan(caravanSearchResult);
    } catch (err) {
      console.log("getCaravanErr", err);
    }
  };

  useEffect(() => {
    getCaravanData(+panelData[0].id);
  }, []);

  const handlePanelDataChange = (dataArr, priceObj) => {
    if (!dataArr || !priceObj) {
      return;
    }
    setPanelData(dataArr);
    setTotalPrice(priceObj);
  };
  //console.log("panelData NewChcekoutPage", panelData);
  //console.log("chekcoutPage totalPrice", totalPrice);
  //console.log("found caravan", currentCaravan);

  if (!currentCaravan || !panelData) {
    return <CircularProgress />;
  }
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
                rentalDates={panelData[0]}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* CHECKOUT DETAILS */}
        <Grid item xs={12} sm={4} sx={{ padding: 1 }}>
          <CheckoutSummaryComponent
            checkoutCompData={panelData}
            totalPrice={totalPrice}
            caravanDetails={currentCaravan}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewCheckoutPage;
