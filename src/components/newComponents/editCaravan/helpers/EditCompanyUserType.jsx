import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import EditCompensationDetails from "./EditCompensationDetails";

const EditCompanyUserType = ({
  handleUserDetails,
  handlePaymentDetailsChange,
  handlePaymentTypeChange,
  parentData,
}) => {
  const [userDetails, setUserDetails] = useState(parentData.userDetails);
  const [paymentType, setPaymentType] = useState(parentData.paymentType);
  const [paymentDetails, setPaymentDetails] = useState(
    parentData.paymentDetails
  );

  //console.log("userDetails", userDetails);

  useEffect(() => {
    if (parentData) {
      if (parentData && parentData.userDetails.userId) {
        delete parentData.userDetails.userId;
      }
      setUserDetails(parentData.userDetails);
      setPaymentType(parentData.paymentType);
      setPaymentDetails(parentData.paymentDetails);
    }
  }, [parentData]);

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
          id="phone"
          value={userDetails.phone || ""}
          label="טלפון משרד"
          onChange={handleUserDetailsChange}
        />
      </Box>
      <Box>
        <Typography variant="h6">כתובת</Typography>
        <TextField
          className="addCarTextFiled"
          id="street"
          value={userDetails.street || ""}
          label="רחוב"
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="city"
          value={userDetails.city || ""}
          label="עיר"
          onChange={handleUserDetailsChange}
        />
        <TextField
          className="addCarTextFiled"
          id="email"
          value={userDetails.email || ""}
          label="מייל משרד"
          onChange={handleUserDetailsChange}
        />
      </Box>
      <Box>
        <EditCompensationDetails
          handlePaymentDetailsChange={handlePaymentDetailsChange}
          handlePaymentTypeChange={handlePaymentTypeChange}
          parentData={parentData}
        />
      </Box>
    </div>
  );
};

export default EditCompanyUserType;
