import { Fragment, useState } from "react";
import {
  Alert,
  Card,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Grid,
  Icon,
  Button,
  Box,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Panel4Dialog from "./helpers/Panel4Dialog";

const Panel4 = ({ setExpanded, onSubmit, caravanDetails }) => {
  const [basicIncl, setBasicIncl] = useState(
    caravanDetails.insuranceDetails.basicIncluded
  );
  const [basicInsurancePrice, setBasicInsurancePrice] = useState(
    caravanDetails.insuranceDetails.basicPricePerNight || ""
  );

  const [premiumAvailable, setPremiumAvailable] = useState(
    caravanDetails.insuranceDetails.premiumAvailable
  );
  const [premiumInsurancePrice, setPremiumInsurancePrice] = useState(
    caravanDetails.insuranceDetails.premiumPricePerNight || 0
  );

  const [inputState, setInputState] = useState({
    insuranceType: "basic",
  });
  const [isChecked, setIsChecked] = useState(true);

  const handlePanel4Submit = () => {
    if (inputState.insuranceType === null) {
      setIsChecked(false);
      return;
    }
    onSubmit({
      insuranceType: inputState.insuranceType,
      basicIncluded: basicIncl,
      basicInsurancePrice: basicInsurancePrice,
      premiumAvailable: premiumAvailable,
      premiumInsurancePrice: premiumInsurancePrice,
    });
    setExpanded("panel5");
    setIsChecked(true);
  };

  const handlePickInsurance = (e) => {
    setInputState((prevState) => ({
      ...prevState,
      insuranceType: e.target.value,
    }));
  };

  //console.log("inputState", premiumAvailable);

  return (
    <div>
      <RadioGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {/* Basic Plan */}
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label="בסיסי"
                onChange={handlePickInsurance}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    display: "none",
                  },
                }}
              />
              <Typography variant="h6">&nbsp;בסיסי&nbsp;</Typography>
              {!basicIncl && basicInsurancePrice && (
                <Typography variant="subtitle">
                  {basicInsurancePrice}\ לילה
                </Typography>
              )}
              {basicIncl && (
                <Typography variant="subtitle">ביטוח כלול במחיר</Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography>השתתפות עצמית</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">&#8362;2500</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>שירותי דרך</Typography>
            </Grid>
            <Grid item xs={6}>
              <Icon component={CheckCircleOutlineIcon} color="success" />
            </Grid>
            <Grid item xs={6}>
              <Typography>רכב חלופי</Typography>
            </Grid>
            <Grid item xs={6}>
              <Icon component={CancelOutlinedIcon} color="error" />
            </Grid>
            <Grid item xs={6}>
              <Typography>נהג נוסף</Typography>
            </Grid>
            <Grid item xs={6}>
              <Icon component={CancelOutlinedIcon} color="error" />
            </Grid>
          </Grid>
          <div align="center">
            <Panel4Dialog insuranceType={"basic"} />
          </div>
        </Card>

        {/* Premium Plan */}
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={1}>
            {premiumAvailable && (
              <Grid item xs={12} display={"flex"} alignItems={"center"}>
                <FormControlLabel
                  value="premium"
                  control={<Radio />}
                  label="פרמיום"
                  onChange={handlePickInsurance}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      display: "none",
                    },
                  }}
                />

                <Typography variant="h6">&nbsp;פרמיום&nbsp;</Typography>
                <Typography variant="subtitle1">
                  {premiumInsurancePrice}/לילה
                </Typography>
              </Grid>
            )}
            {!premiumAvailable && (
              <Grid item xs={12} display={"flex"} alignItems={"center"}>
                <Typography variant="subtitle">
                  אין אפשרות ביטוח פרמיום
                </Typography>
              </Grid>
            )}
            {premiumAvailable && premiumInsurancePrice && (
              <Fragment>
                <Grid item xs={6}>
                  <Typography>השתתפות עצמית</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">&#8362;500</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>שירותי דרך</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Icon component={CheckCircleOutlineIcon} color="success" />
                </Grid>
                <Grid item xs={6}>
                  <Typography>רכב חלופי</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Icon component={CheckCircleOutlineIcon} color="success" />
                </Grid>
                <Grid item xs={6}>
                  <Typography>נהג נוסף</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">+3</Typography>
                </Grid>
              </Fragment>
            )}
          </Grid>
          {premiumAvailable && (
            <div align="center">
              <Panel4Dialog insuranceType={"premium"} />
            </div>
          )}
        </Card>
      </RadioGroup>
      {!isChecked && <Alert severity="error">אנא בחר סוג ביטוח</Alert>}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePanel4Submit}
          sx={{ align: "center" }}
          disabled={inputState.insuranceType === null}
        >
          הבא
        </Button>
      </Box>
    </div>
  );
};
export default Panel4;
