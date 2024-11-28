import { useState } from "react";
import { TextField, Grid, Button, Alert } from "@mui/material";
import { validateCC } from "../../../validation/ccValidation";

const Panel8 = (grandTotal, expandedState, setExpandedState) => {
  const [ccDetails, setccDetails] = useState({
    cardNumber: "",
    cardName: "",
    cardExpDate: "",
    cardCvv: "",
  });
  const [validationErrorArr, setValidationErrorArr] = useState([]);

  const handleChange = (e, key) => {
    //console.log(e.target.value);
    setccDetails({ ...ccDetails, [key]: e.target.value });
  };

  const validateInputs = () => {
    const joiResponse = validateCC(ccDetails);
    //console.log("joiReps", joiResponse);

    if (joiResponse.error) {
      const errors = {};
      joiResponse.error.details.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setValidationErrorArr(errors);
      return true;
    } else {
      setValidationErrorArr(false);
      return false;
    }
  };

  const handleSubmit = () => {
    const inputsValid = validateInputs();
    if (!inputsValid) {
      alert("הזמנה בוצעה בהצלחה");
    } else {
      prompt("אחד או יותר מהפרטים שהוזנו אינם תקינים");
    }
  };
  //console.log("ccDetails", ccDetails);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <TextField
            value={ccDetails.cardName}
            variant="outlined"
            label="שם בעל האשראי"
            className="ccDetails"
            sx={{ width: { lg: "30%" } }}
            onChange={(e) => handleChange(e, "cardName")}
          />
          {validationErrorArr && validationErrorArr.cardName && (
            <Alert severity="error">{validationErrorArr.cardName}</Alert>
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            id="cardNumber"
            value={ccDetails.cardNumber}
            variant="outlined"
            label="מספר אשראי"
            className="ccDetails"
            onChange={(e) => handleChange(e, "cardNumber")}
          />
          {validationErrorArr && validationErrorArr.cardNumber && (
            <Alert severity="error">{validationErrorArr.cardNumber}</Alert>
          )}
        </Grid>

        <Grid item xs={4}>
          <TextField
            value={ccDetails.cardExpDate}
            variant="outlined"
            label="תאריך תפוגה"
            className="ccDetails"
            placeholder="MM/YY"
            onChange={(e) => handleChange(e, "cardExpDate")}
          />
          {validationErrorArr && validationErrorArr.cardExpDate && (
            <Alert severity="error">{validationErrorArr.cardExpDate}</Alert>
          )}
        </Grid>
        <Grid item xs={4}>
          <TextField
            value={ccDetails.cardCvv}
            variant="outlined"
            label="CVV"
            onChange={(e) => handleChange(e, "cardCvv")}
            sx={{
              width: "100%",
              "& .MuiInputLabel-root": {
                left: "unset",
                right: 0,
                marginRight: "3em",
              },
              "& .MuiInputLabel-shrink": {
                marginRight: "0.7em",
                padding: "0 0.5em 0 0.3em",
              },
            }}
          />
          {validationErrorArr && validationErrorArr.cardCvv && (
            <Alert severity="error">{validationErrorArr.cardCvv}</Alert>
          )}
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button onClick={handleSubmit} variant="contained">
            אישר תשלום
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Panel8;
