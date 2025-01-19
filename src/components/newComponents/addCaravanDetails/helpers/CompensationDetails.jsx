import { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  Typography,
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
  Box,
} from "@mui/material";

const CompensationDetails = ({
  handlePaymentTypeChange,
  handlePaymentDetailsChange,
  sessionDetails,
}) => {
  const [paymentType, setPaymentType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    if (
      sessionDetails &&
      sessionDetails.paymentType &&
      sessionDetails.paymentDetails
    ) {
      setPaymentType(sessionDetails.paymentType);
      setPaymentDetails(sessionDetails.paymentDetails);
    }
  }, [sessionDetails]);

  const handleLocalPaymentTypeChange = (e) => {
    const { value } = e.target;
    setPaymentType(value);
    handlePaymentTypeChange(value);
  };

  const handleLocalPaymentDetailsChange = (id, value) => {
    const newDetails = { ...paymentDetails, [id]: value };
    //console.log("paymentDetails", newDetails);
    setPaymentDetails(newDetails);
    handlePaymentDetailsChange(newDetails);
  };
  console.log("compansationDetails", paymentType);

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
            onChange={handleLocalPaymentTypeChange}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="העברה בנקאית"
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
            value={paymentDetails.bankName}
            label="שם הבנק"
            onChange={(e) =>
              handleLocalPaymentDetailsChange(e.target.id, e.target.value)
            }
          />
          <TextField
            className="addCarTextFiled"
            id="bankBranch"
            value={paymentDetails.bankBranch}
            label="מספר סניף"
            onChange={(e) =>
              handleLocalPaymentDetailsChange(e.target.id, e.target.value)
            }
          />
          <TextField
            className="addCarTextFiled"
            id="bankAccount"
            value={paymentDetails.bankAccount}
            label="מספר חשבון"
            onChange={(e) =>
              handleLocalPaymentDetailsChange(e.target.id, e.target.value)
            }
          />
        </div>
      )}
      {paymentType === "2" && (
        <div>
          <TextField
            className="addCarTextFiled"
            id="phoneNumber"
            value={paymentDetails.phoneNumber}
            label="מספר טלפון"
            onChange={(e) =>
              handleLocalPaymentDetailsChange(e.target.id, e.target.value)
            }
          />
        </div>
      )}
    </div>
  );
};

export default CompensationDetails;
