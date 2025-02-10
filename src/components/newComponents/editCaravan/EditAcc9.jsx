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
import CircularProgress from "@mui/material/CircularProgress";
import acc9Validation from "../addCaravanDetails/helpers/acc9Validation";
import axios from "axios";
import { toast } from "react-toastify";

const EditAcc9 = ({ nextBtn, parentData, caravanId }) => {
  const [acc9Data, setAcc9Data] = useState(parentData);
  useEffect(() => {
    if (!parentData) {
      return console.log("no ParentData");
    }

    //setAcc9Data(parentData);
    setAcc9Data((prevData) => ({
      ...prevData,
      isCancelationPolicy: prevData.isCancelationPolicy.toString(),
      insuranceIncluded: prevData.insuranceIncluded.toString(),
      premiumAvailable: prevData.premiumAvailable.toString(),
    }));
  }, []);

  useEffect(() => {
    if (acc9Data.insuranceIncluded === "true") {
      setAcc9Data((prevData) => {
        return { ...prevData, basicInsurance: "", premiumInsurance: "" };
      });
    }
    if (acc9Data.insuranceIncluded === "false")
      setAcc9Data((prevData) => {
        return { ...prevData, insuranceIncluded: "false" };
      });
  }, [acc9Data.insuranceIncluded]);

  useEffect(() => {
    if (acc9Data.isCancelationPolicy === "true") {
      //console.log("cancel true");

      setAcc9Data((prevData) => {
        return { ...prevData, isCancelationPolicy: "true" };
      });
    }

    if (acc9Data.isCancelationPolicy === "false") {
      console.log("cancel false");
      setAcc9Data((prevData) => {
        return { ...prevData, isCancelationPolicy: "false" };
      });
    }
  }, [acc9Data.isCancelationPolicy]);

  const handleNextBtn = async () => {
    const dataToValidate = {
      ...acc9Data,
      premiumAvailable: acc9Data.premiumAvailable === "true" ? true : false,
    };
    const validateResponse = acc9Validation(dataToValidate);
    if (validateResponse === true) return;
    const normalizedDataForServer = {
      insuranceDetails: {
        basicIncluded: acc9Data.insuranceIncluded,
        premiumAvailable: acc9Data.premiumAvailable,
        basicPricePerNight: acc9Data.basicInsurance,
        premiumPricePerNight: acc9Data.premiumInsurance,
      },
      cancelationPolicy: {
        isCancelationPolicy: acc9Data.isCancelationPolicy,
        freeCancelationWindow: acc9Data.freeCancelationDays,
        cancelationFeePercent: acc9Data.cancelationPrice,
      },
      priceDetails: {
        pricePerNight: acc9Data.pricePerNight,
        minimumNights: acc9Data.minimumNights,
      },
    };
    try {
      const updatedData = await axios.patch(
        `/caravans/${caravanId}`,
        normalizedDataForServer
      );
      if (updatedData.status === 200) {
        return toast.success("הקרוואן עודכן בהצלחה");
      } else {
        return toast.error("אירעה שגיאה בעדכון הקרוואן");
      }
    } catch (err) {
      console.error("Error:", err);
    }

    nextBtn(
      {
        acc9Data,
      },
      8
    );
  };

  const handleChange = (e) => {
    console.log("e", e.target.name, e.target.value);

    setAcc9Data((prevAcc9Data) => ({
      ...prevAcc9Data,
      [e.target.name]: e.target.value,
    }));
  };

  if (!parentData) return <CircularProgress />;
  //console.log("acc9Data", acc9Data);

  //console.log("cancelationPolicy", typeof acc9Data.isCancelationPolicy);
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
            onChange={(e) => handleChange(e)}
            value={acc9Data.pricePerNight}
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
            onChange={(e) => handleChange(e)}
            value={acc9Data.minimumNights}
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
              value={acc9Data.insuranceIncluded}
              onChange={(e) => {
                console.log(
                  "insuranceDetails.insuranceIncluded e",
                  e.target.value
                );
                setAcc9Data((prevState) => ({
                  ...prevState,
                  insuranceIncluded: e.target.value,
                }));
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="כן" />
              <FormControlLabel value="false" control={<Radio />} label="לא" />
            </RadioGroup>
          </FormControl>
          {acc9Data.insuranceIncluded === "true" && (
            <Box>
              <Typography variant="subtitle1">
                האם יש אפשרות לרכוש ביטוח פרמיום?
              </Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend" />
                <RadioGroup
                  row
                  name="premiumAvailable"
                  value={acc9Data.premiumAvailable}
                  onChange={(e) => {
                    console.log(
                      "premiumAvailable",
                      typeof acc9Data.premiumAvailable
                    );
                    setAcc9Data((prevData) => ({
                      ...prevData,
                      premiumAvailable: e.target.value,
                    }));
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
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}
          {acc9Data.insuranceIncluded === "true" &&
            acc9Data.premiumAvailable === "true" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  className="inputFixExtraLong"
                  label="מחיר ביטוח פרמיום"
                  name="premiumInsurance"
                  value={acc9Data.premiumInsurance}
                  sx={{ marginLeft: 1 }}
                  onChange={(e) => handleChange(e)}
                />
                <Typography variant="subtitle1">ש"ח\לילה</Typography>
              </Box>
            )}
          {acc9Data.insuranceIncluded === "false" && (
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
                  value={acc9Data.basicInsurance}
                  onChange={(e) => handleChange(e)}
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
                  value={acc9Data.premiumInsurance}
                  onChange={(e) => handleChange(e)}
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
              value={acc9Data.isCancelationPolicy}
              onChange={(e) => {
                setAcc9Data((prevData) => ({
                  ...prevData,
                  isCancelationPolicy: e.target.value,
                }));
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="כן" />
              <FormControlLabel value="false" control={<Radio />} label="לא" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {acc9Data.isCancelationPolicy === "true" && (
          <Box>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                כמה ימים לפני תאריך ההזמנה ניתן לבטל בחינם?
              </Typography>
              <TextField
                value={acc9Data.freeCancelationDays}
                name="freeCancelationDays"
                className="inputFixLong"
                label="מספר ימים"
                sx={{ marginLeft: 1 }}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                מה עלות ביטול הזמנה לאחר מכן?
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  value={acc9Data.cancelationPrice}
                  name="cancelationPrice"
                  className="inputFixLong"
                  label="עלות ביטול"
                  sx={{ marginLeft: 1 }}
                  onChange={(e) => handleChange(e)}
                />
                <Typography variant="subtitle1">% (אחוז מסך ההזמנה)</Typography>
              </Box>
            </Grid>
          </Box>
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleNextBtn}>
          עדכן
        </Button>
      </Box>
    </Box>
  );
};
export default EditAcc9;
