import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import CompensationDetails from "./CompensationDetails";

const CompanyUserType = ({
  handleUserDetails,
  handlePaymentDetailsChange,
  handlePaymentTypeChange,
}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleUserDetailsChange = (e) => {
    const updatedDetails = {
      ...userDetails,
      [e.target.id]: e.target.value,
    };
    setUserDetails(updatedDetails);
    handleUserDetails(updatedDetails);
  };

  return (
    <div>
      <Box>
        <TextField
          className="addCarTextFiled"
          id="companyName"
          label="שם החברה"
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="companyId"
          label="ח.פ."
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="companyPhone"
          label="טלפון משרד"
          onChange={handleUserDetailsChange}
        />
      </Box>
      <Box>
        <Typography variant="h6">כתובת</Typography>
        <TextField
          className="addCarTextFiled"
          id="companyStreet"
          label="רחוב"
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="companyCity"
          label="עיר"
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="companyMaps"
          label="מיקום בגוגל"
          onChange={handleUserDetailsChange}
        />
      </Box>
      <Box>
        <CompensationDetails
          handlePaymentDetailsChange={handlePaymentDetailsChange}
          handlePaymentTypeChange={handlePaymentTypeChange}
        />
      </Box>
    </div>
  );
};

export default CompanyUserType;
