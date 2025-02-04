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

const EditCompensationDetails = ({
  handlePaymentTypeChange,
  handlePaymentDetailsChange,
  parentData,
}) => {
  const [paymentType, setPaymentType] = useState(parentData.paymentType || "");
  const [paymentDetails, setPaymentDetails] = useState(
    parentData.paymentDetails
  );

  //console.log("paymentType", paymentType);
  // console.log("paymentDetails", paymentDetails);

  useEffect(() => {
    if (parentData) {
      setPaymentType(parentData.paymentType);
      setPaymentDetails(parentData.paymentDetails);
    }
  }, [parentData]);
  const handleLocalPaymentTypeChange = (e) => {
    const { value } = e.target;
    setPaymentType(value);
    handlePaymentTypeChange(value);
    setPaymentDetails({
      bankName: "",
      bankBranch: "",
      bankAccount: "",
      phone: "",
    });
  };

  const handleLocalPaymentDetailsChange = (id, value) => {
    const newDetails = { ...paymentDetails, [id]: value };
    console.log("paymentDetails", newDetails);
    setPaymentDetails(newDetails);
    handlePaymentDetailsChange(newDetails);
  };
  //console.log("paymentDetails", paymentDetails);

  return (
    <div>
      <Typography variant="h6">איך תרצה לקבל את הכסף שלך?</Typography>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend" />
          <RadioGroup
            row
            value={paymentType}
            onChange={handleLocalPaymentTypeChange}
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
            id="phone"
            value={paymentDetails.phone || ""}
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

export default EditCompensationDetails;
