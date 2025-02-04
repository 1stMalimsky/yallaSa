import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import CheckoutSummaryComponent from "../../components/newComponents/CheckoutSummaryComponent";
import CheckoutUserDetailsComponent from "../../components/newComponents/CheckoutUserDetailsComponent";
import CircularProgress from "@mui/material/CircularProgress";
import getCaravanData from "../../utils/helpers/getCaravanData";

const NewCheckoutPage = () => {
  const params = useParams();
  const [isExpanded, setIsExpanded] = useState("panel8");
  const [paramData, setParamData] = useState({
    id: params.id,
    start: params.start,
    end: params.end,
    numOfDays: params.numOfDays,
  });
  const [panelData, setPanelData] = useState([
    paramData, // Initial data for panel 0
    [null], // Panel 1
    [null], // Panel 2
    [null], // Panel 3
    [null], // Panel 4
    [], // Panel 5
    [null], // Panel 6
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentCaravan, setCurrentCaravan] = useState(null);

  //console.log("currentCaravan", currentCaravan);

  useEffect(() => {
    (async () => {
      try {
        const caravan = await getCaravanData(panelData[0].id);
        console.log("caravan ", caravan);

        setCurrentCaravan(caravan.found_caravan);
      } catch (err) {
        console.log(" async useEffect NewCheckoutpage", err);
      }
    })();
  }, []);

  const handlePanelDataChange = (dataArr, priceObj) => {
    if (!dataArr || !priceObj) {
      return;
    }
    setPanelData(dataArr);
    setTotalPrice(priceObj);
  };
  //console.log("new checkoue panel data", panelData);

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
                parnetData={panelData}
                caravanDetails={currentCaravan}
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
