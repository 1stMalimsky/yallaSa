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

const PrivateUserType = ({ parentData, handlePtype, handlePdetails }) => {
  const [paymentType, setPaymentType] = useState(
    parentData?.paymentType.toString() || "3"
  );
  const [paymentDetails, setPaymentDetails] = useState({
    phone: "",
    bankAccount: "",
    bankBranch: "",
    bankName: "",
  });
  const [disableRadio, setDisableRadio] = useState(true);

  useEffect(() => {
    if (parentData) {
      setPaymentType(parentData.paymentType.toString());
      setPaymentDetails(parentData.paymentDetails);
      setDisableRadio(Boolean(parentData.caravanIds.length > 0));
    }
  }, [parentData]);

  const handlePaymentTypeChange = (e) => {
    const newPaymentType = e.target.value;
    setPaymentType(newPaymentType);
    handlePtype(newPaymentType);
    const resetDetails =
      newPaymentType === "1"
        ? { bankName: "", bankBranch: "", bankAccount: "" }
        : { phone: "" };

    setPaymentDetails(resetDetails);
    handlePdetails(resetDetails);
  };
  const handlePaymentDetailsChange = (e, paymentType) => {
    const prevState = { ...paymentDetails };
    if (paymentType === 1) {
      delete prevState.phone;
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
  console.log("parentData", parentData);
  //console.log("disabaled", disableRadio);
  //console.log("paymentType");

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
              value="1"
              control={<Radio disabled={disableRadio} />}
              label="העברה בנקאית"
              onChange={handlePaymentTypeChange}
            />
            <FormControlLabel
              value="2"
              control={<Radio disabled={disableRadio} />}
              label="ביט"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {paymentType === "1" && !disableRadio && (
        <div>
          <TextField
            className="addCarTextFiled"
            id="bankName"
            value={paymentDetails.bankName}
            label="שם הבנק"
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
          <TextField
            className="addCarTextFiled"
            id="bankBranch"
            value={paymentDetails.bankBranch}
            label="מספר סניף"
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
          <TextField
            className="addCarTextFiled"
            id="bankAccount"
            value={paymentDetails.bankAccount}
            label="מספר חשבון"
            onChange={(e) => handlePaymentDetailsChange(e, 1)}
          />
        </div>
      )}
      {paymentType === "2" && !disableRadio && (
        <div>
          <TextField
            className="addCarTextFiled"
            id="phone"
            value={paymentDetails.phone}
            label="מספר טלפון"
            onChange={(e) => handlePaymentDetailsChange(e, 2)}
          />
        </div>
      )}
    </div>
  );
};

export default PrivateUserType;
