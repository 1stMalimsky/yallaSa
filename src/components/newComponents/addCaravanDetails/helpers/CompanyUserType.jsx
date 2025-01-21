import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import CompensationDetails from "./CompensationDetails";

const CompanyUserType = ({
  handleUserDetails,
  handlePaymentDetailsChange,
  handlePaymentTypeChange,
  sessionDetails,
}) => {
  const [userDetails, setUserDetails] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  useEffect(() => {
    if (sessionDetails) {
      setUserDetails(sessionDetails.userDetails);
      setPaymentType(sessionDetails.paymentType);
      setPaymentDetails(sessionDetails.paymentDetails);
    }
  }, [sessionDetails]);

  const handleUserDetailsChange = (e) => {
    const updatedDetails = {
      ...userDetails,
      [e.target.id]: e.target.value,
    };
    setUserDetails(updatedDetails);
    handleUserDetails(updatedDetails);
  };

  //console.log("companyUserType", paymentDetails);

  return (
    <div>
      <Box>
        <TextField
          className="addCarTextFiled"
          id="companyName"
          label="שם החברה"
          value={userDetails.companyName || ""}
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="companyId"
          value={userDetails.companyId || ""}
          label="ח.פ."
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="companyPhone"
          value={userDetails.companyPhone || ""}
          label="טלפון משרד"
          onChange={handleUserDetailsChange}
        />
      </Box>
      <Box>
        <Typography variant="h6">כתובת</Typography>
        <TextField
          className="addCarTextFiled"
          id="companyStreet"
          value={userDetails.companyStreet || ""}
          label="רחוב"
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="companyCity"
          value={userDetails.companyCity || ""}
          label="עיר"
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="companyEmail"
          label="מייל משרד"
          onChange={handleUserDetailsChange}
        />
      </Box>
      <Box>
        <CompensationDetails
          handlePaymentDetailsChange={handlePaymentDetailsChange}
          handlePaymentTypeChange={handlePaymentTypeChange}
          sessionDetails={{
            paymentDetails: paymentDetails,
            paymentType: paymentType,
          }}
        />
      </Box>
    </div>
  );
};

export default CompanyUserType;
