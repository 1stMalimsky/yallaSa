import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Typography,
  Button,
} from "@mui/material";

const PrivateUserType = ({ handlePtype, handlePdetails }) => {
  const [paymentType, setPaymentType] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handlePaymentTypeChange = (e) => {
    handlePtype(e.target.value);
    setPaymentType(e.target.value);
  };
  const handlePaymentDetailsChange = (e, paymentType) => {
    const prevState = { ...paymentDetails };
    if (paymentType === 1) {
      delete prevState.phoneNumber;
      setPaymentDetails(() => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
      handlePdetails({ ...prevState, [e.target.id]: e.target.value });
    }
    if (paymentType === 2) {
      setPaymentDetails({ [e.target.id]: e.target.value });
      handlePdetails({ [e.target.id]: e.target.value });
    }
  };

  return (
    <div>
      <Typography variant="h6">איך תרצה לקבל את הכסף שלך?</Typography>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend" />
          <RadioGroup
            row
            name="paymentType"
            value={paymentType}
            onChange={handlePaymentTypeChange}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="העברה בנקאית"
              onChange={handlePaymentTypeChange}
            />
            <FormControlLabel value={2} control={<Radio />} label="ביט" />
          </RadioGroup>
        </FormControl>
      </Box>
      {paymentType === "1" && (
        <div>
          <TextField
            className="addCarTextFiled"
            id="bankName"
            label="שם הבנק"
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
          <TextField
            className="addCarTextFiled"
            id="bankBranch"
            label="מספר סניף"
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
          <TextField
            className="addCarTextFiled"
            id="bankAccount"
            label="מספר חשבון"
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
        </div>
      )}
      {paymentType === "2" && (
        <div>
          <TextField
            className="addCarTextFiled"
            id="phoneNumber"
            label="מספר טלפון"
            onChange={(e) => handlePaymentDetailsChange(e, 2)}
          />
        </div>
      )}
    </div>
  );
};

export default PrivateUserType;
