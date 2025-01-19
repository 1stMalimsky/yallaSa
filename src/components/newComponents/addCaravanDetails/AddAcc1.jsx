import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Button,
} from "@mui/material";
import PrivateUserType from "./helpers/PrivateUserType.jsx";
import CompanyUserType from "./helpers/CompanyUserType.jsx";
import getToken from "../../../utils/helpers/getToken.js";
import acc1Validation from "./helpers/acc1Validation.js";
import checkSessionStorage from "../../../utils/helpers/checkSessionStorage.js";

const AddAcc1 = ({ nextBtn }) => {
  const [privateUser, setPrivateUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [paymentType, setPaymentType] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const userId = getToken().userId;

  useEffect(() => {
    const sessionData = JSON.parse(checkSessionStorage(1));
    console.log("session1", sessionData);

    if (sessionData) {
      setPrivateUser(sessionData.privateUser);
      setUserDetails(sessionData.userDetails);
      setPaymentType(sessionData.paymentType);
      setPaymentDetails(sessionData.paymentDetails);
    }
  }, []);

  const resetStates = () => {
    setUserDetails({});
    setPaymentType(null);
    setPaymentDetails(null);
  };

  const handleNextBtn = () => {
    let acc1Data = {
      privateUser,
      userDetails,
      paymentType,
      paymentDetails,
    };
    if (privateUser === "true") {
      acc1Data.userDetails = userId;
    }
    const validationResponse = acc1Validation(
      privateUser,
      userDetails,
      paymentType,
      paymentDetails
    );
    if (validationResponse) {
      return;
    } else sessionStorage.setItem("acc1Data", JSON.stringify(acc1Data));
    nextBtn(acc1Data, 0);
  };

  const handlePaymentTypeChange = (paymentTypeData) => {
    setPaymentDetails({});
    setPaymentType(paymentTypeData);
  };

  const handleUserTypeChange = (e) => {
    resetStates();
    setPrivateUser(e.target.value);
  };

  const handleUserDetailsChange = (details) => {
    setUserDetails(details);
  };

  const handlePaymentDetailsChange = (paymentDetails) => {
    setPaymentDetails(paymentDetails);
  };
  return (
    <Box>
      {/* RADIO */}
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend" />
          <RadioGroup
            row
            name="userType"
            value={privateUser}
            onChange={handleUserTypeChange}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="לקוח פרטי"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="לקוח עסקי"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {privateUser === "true" && (
        <PrivateUserType
          handlePtype={handlePaymentTypeChange}
          handlePdetails={handlePaymentDetailsChange}
        />
      )}
      {privateUser === "false" && (
        <CompanyUserType
          handleUserDetails={handleUserDetailsChange}
          handlePaymentTypeChange={handlePaymentTypeChange}
          handlePaymentDetailsChange={handlePaymentDetailsChange}
          sessionDetails={{
            userDetails: userDetails,
            paymentType: paymentType,
            paymentDetails: paymentDetails,
          }}
        />
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" onClick={handleNextBtn}>
          הבא
        </Button>
      </Box>
    </Box>
  );
};

export default AddAcc1;
