import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormControlLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import acc9Validation from "./helpers/acc9Validation";
import checkSessionStorage from "../../../utils/helpers/checkSessionStorage";
import FinalizeModal from "./helpers/FinalizeAddModal";

const AddAcc9 = ({ nextBtn, handleSubmit }) => {
  const [priceDetails, setPriceDetails] = useState({
    pricePerNight: "",
    minimumNights: "",
  });
  const [isCancelationPolicy, setIsCancelationPolicy] = useState("");
  const [cancelationPolicy, setCancelationPolicy] = useState({
    freeCancelationDays: "",
    cancelationPrice: "",
    isCancelationPolicy: isCancelationPolicy,
  });
  const [insuranceDetails, setInsuranceDetails] = useState({
    insuranceIncluded: "false",
    basicInsurance: "",
    premiumInsurance: "",
  });
  const [extraInsuranceAvailable, setExtraInsuranceAvailable] =
    useState("false");

  const [modalOpenState, setModalOpenState] = useState(false);

  useEffect(() => {
    const sessionData = JSON.parse(checkSessionStorage(9));

    if (sessionData) {
      //console.log("session9", sessionData);
      setInsuranceDetails({
        insuranceIncluded: sessionData.insuranceIncluded || "false",
        basicInsurance: sessionData.basicInsurance || "",
        premiumInsurance: sessionData.premiumInsurance || "",
      });
      setPriceDetails({
        pricePerNight: sessionData.pricePerNight || "",
        minimumNights: sessionData.minimumNights || "",
      });
      setCancelationPolicy({
        isCancelationPolicy: sessionData.isCancelationPolicy || "false",
        freeCancelationDays: sessionData.freeCancelationDays || "",
        cancelationPrice: sessionData.cancelationPrice || "",
      });
      setIsCancelationPolicy(sessionData.isCancelationPolicy || "false");
      setExtraInsuranceAvailable(sessionData.extraInsuranceAvailable || "");
    }
  }, []);

  useEffect(() => {
    if (insuranceDetails.insuranceIncluded === "true") {
      setInsuranceDetails((prevData) => {
        return { ...prevData, basicInsurance: "", premiumInsurance: "" };
      });
    }
    if (insuranceDetails.insuranceIncluded === "false")
      setExtraInsuranceAvailable("false");
  }, [insuranceDetails.insuranceIncluded]);

  useEffect(() => {
    if (isCancelationPolicy === "true") {
      console.log("cancel true");

      setCancelationPolicy((prevData) => {
        return { ...prevData, isCancelationPolicy: "true" };
      });
    }

    if (isCancelationPolicy === "false") {
      console.log("cancel false");
      setCancelationPolicy((prevData) => {
        return { ...prevData, isCancelationPolicy: "false" };
      });
    }
  }, [isCancelationPolicy]);

  const handleNextBtn = async () => {
    const validateResponse = acc9Validation({
      ...priceDetails,
      ...cancelationPolicy,
      ...insuranceDetails,
      isCancelationPolicy,
      extraInsuranceAvailable,
    });
    if (validateResponse === true) return;
    sessionStorage.setItem(
      "acc9Data",
      JSON.stringify({
        ...priceDetails,
        ...cancelationPolicy,
        ...insuranceDetails,
        ...isCancelationPolicy,
        ...extraInsuranceAvailable,
      })
    );
    nextBtn(
      {
        ...priceDetails,
        ...cancelationPolicy,
        ...insuranceDetails,
        ...isCancelationPolicy,
        ...extraInsuranceAvailable,
      },
      8
    );
    setModalOpenState(true);
  };

  const handleChange = (e, setState) => {
    setState((prevData) => {
      const newData = { ...prevData };
      newData[e.target.name] = e.target.value;
      return newData;
    });
  };

  const handleCloseModal = () => {
    setModalOpenState(false);
  };

  //console.log("canacelationPolicy", cancelationPolicy);
  //console.log("insuraneceIncluded", insuranceDetails.insuranceIncluded);

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">מחיר:</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            name="pricePerNight"
            onChange={(e) => handleChange(e, setPriceDetails)}
            value={priceDetails.pricePerNight}
            className="inputFixLong"
            label="מחיר ללילה"
            sx={{ marginLeft: 1 }}
          />
          <Typography variant="subtitle1">ש"ח</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            name="minimumNights"
            onChange={(e) => handleChange(e, setPriceDetails)}
            value={priceDetails.minimumNights}
            className="inputFixExtraLong"
            label="מינימום לילות"
            sx={{ marginLeft: 1 }}
          />
          <Typography variant="subtitle1">לילות</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">ביטוח:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">ביטוח כלול במחיר?</Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend" />
            <RadioGroup
              row
              name="insuranceIncluded"
              value={insuranceDetails.insuranceIncluded}
              onChange={(e) => {
                console.log(
                  "insuranceDetails.insuranceIncluded",
                  insuranceDetails.insuranceIncluded
                );
                setInsuranceDetails((prevState) => ({
                  ...prevState,
                  insuranceIncluded: e.target.value,
                }));
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="כן" />
              <FormControlLabel value="false" control={<Radio />} label="לא" />
            </RadioGroup>
          </FormControl>
          {insuranceDetails.insuranceIncluded === "true" && (
            <Box>
              <Typography variant="subtitle1">
                האם יש אפשרות לרכוש ביטוח פרמיום?
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend" />
                <RadioGroup
                  row
                  name="extraInsuranceAvailable"
                  value={extraInsuranceAvailable}
                  onChange={(e) => {
                    console.log(
                      "extraInsuranceavailable",
                      extraInsuranceAvailable
                    );
                    setExtraInsuranceAvailable(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="כן"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="לא"
                    o
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}
          {insuranceDetails.insuranceIncluded === "true" &&
            extraInsuranceAvailable === "true" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  className="inputFixExtraLong"
                  label="מחיר ביטוח פרמיום"
                  name="premiumInsurance"
                  value={insuranceDetails.premiumInsurance}
                  sx={{ marginLeft: 1 }}
                  onChange={(e) => handleChange(e, setInsuranceDetails)}
                />
                <Typography variant="subtitle1">ש"ח\לילה</Typography>
              </Box>
            )}
          {insuranceDetails.insuranceIncluded === "false" && (
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  className="inputFixExtraLong"
                  name="basicInsurance"
                  value={insuranceDetails.basicInsurance}
                  onChange={(e) => handleChange(e, setInsuranceDetails)}
                  label="עלות ביטוח בסיסי"
                  sx={{ marginTop: 1, marginLeft: 1 }}
                />
                <Typography variant="subtitle1">ש"ח\לילה</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  className="inputFixExtraLong"
                  name="premiumInsurance"
                  value={insuranceDetails.premiumInsurance}
                  onChange={(e) => handleChange(e, setInsuranceDetails)}
                  label="עלות ביטוח פרמיום"
                  sx={{ marginTop: 1, marginLeft: 1 }}
                />
                <Typography variant="subtitle1">ש"ח\לילה</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">מדיניות ביטולים:</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              האם ניתן לבטל בחינם לפני תאריך ההזמנה?
            </FormLabel>
            <RadioGroup
              row
              name="isCancelationPolicy"
              value={isCancelationPolicy}
              onChange={(e) => {
                setIsCancelationPolicy(e.target.value);
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="כן" />
              <FormControlLabel value="false" control={<Radio />} label="לא" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {isCancelationPolicy === "true" && (
          <Box>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                כמה ימים לפני תאריך ההזמנה ניתן לבטל בחינם?
              </Typography>
              <TextField
                value={cancelationPolicy.freeCancelationDays}
                name="freeCancelationDays"
                className="inputFixLong"
                label="מספר ימים"
                sx={{ marginLeft: 1 }}
                onChange={(e) => handleChange(e, setCancelationPolicy)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                מה עלות ביטול הזמנה לאחר מכן?
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  value={cancelationPolicy.cancelationPrice}
                  name="cancelationPrice"
                  className="inputFixLong"
                  label="עלות ביטול"
                  sx={{ marginLeft: 1 }}
                  onChange={(e) => handleChange(e, setCancelationPolicy)}
                />
                <Typography variant="subtitle1">% (אחוז מסך ההזמנה)</Typography>
              </Box>
            </Grid>
          </Box>
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleNextBtn}>
          הבא
        </Button>

        <FinalizeModal
          modalOpenState={modalOpenState}
          handleClose={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
};
export default AddAcc9;
