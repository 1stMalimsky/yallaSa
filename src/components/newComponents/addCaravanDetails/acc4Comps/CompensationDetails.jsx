import { useState } from "react";
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
}) => {
  const [paymentType, setPaymentType] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

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
            label="שם הבנק"
            onChange={(e) =>
              handleLocalPaymentDetailsChange(e.target.id, e.target.value)
            }
          />
          <TextField
            className="addCarTextFiled"
            id="bankBranch"
            label="מספר סניף"
            onChange={(e) =>
              handleLocalPaymentDetailsChange(e.target.id, e.target.value)
            }
          />
          <TextField
            className="addCarTextFiled"
            id="bankAccount"
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
