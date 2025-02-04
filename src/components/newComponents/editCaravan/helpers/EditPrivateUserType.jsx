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

const EditPrivateUserType = ({ parentData, handlePtype, handlePdetails }) => {
  const [paymentType, setPaymentType] = useState(parentData.paymentType);
  const [paymentDetails, setPaymentDetails] = useState(
    parentData.paymentDetails
  );
  console.log("parentData in editPrivateUser", parentData);

  useEffect(() => {
    if (parentData) {
      setPaymentType(parentData.paymentType);
      setPaymentDetails(parentData.paymentDetails);
    }
  }, [parentData]);

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

  //console.log("paymentType", paymentType);
  console.log("paymentType", paymentType);

  return (
    <div>
      <Typography variant="h6">איך תרצה לקבל את הכסף שלך?</Typography>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend" />
          <RadioGroup
            row
            value={paymentType}
            onChange={handlePaymentTypeChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="העברה בנקאית"
            />
            <FormControlLabel value="2" control={<Radio />} label="ביט" />
          </RadioGroup>
        </FormControl>
      </Box>
      {paymentType === "1" && (
        <div>
          <TextField
            className="addCarTextFiled"
            id="bankName"
            label="שם הבנק"
            value={paymentDetails.bankName}
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
          <TextField
            className="addCarTextFiled"
            id="bankBranch"
            label="מספר סניף"
            value={paymentDetails.bankBranch}
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
          <TextField
            className="addCarTextFiled"
            id="bankAccount"
            label="מספר חשבון"
            value={paymentDetails.bankAccount}
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
        </div>
      )}
      {paymentType === "2" && (
        <div>
          <TextField
            className="addCarTextFiled"
            id="phone"
            label="מספר טלפון"
            value={paymentDetails.phone || ""}
            onChange={(e) => handlePaymentDetailsChange(e, 2)}
          />
        </div>
      )}
    </div>
  );
};

export default EditPrivateUserType;
