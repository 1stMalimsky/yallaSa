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
import addAcc1Validation from "./helpers/addAcc1Validation.js";
import checkSessionStorage from "../../../utils/helpers/checkSessionStorage.js";

const AddAcc1 = ({ nextBtn, user }) => {
  const [privateUser, setPrivateUser] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(
    user.paymentDetails || ""
  );
  const [userTypeDisabled, setUserTypeDisabled] = useState(true);
  const userId = getToken().userId;

  useEffect(() => {
    if (user) {
      if (user.caravanIds.length > 0) {
        setUserTypeDisabled(true);
        if (user.isBusiness) setPrivateUser("false");
        if (!user.isBusiness) setPrivateUser("true");
        setPaymentDetails(user.paymentDetails);
        if (user.paymentDetails.phone) {
          setPaymentType(2);
        }
        if (user.paymentDetails.bankAccount) {
          setPaymentType(1);
        }
        if (user.isBusiness) {
          setUserDetails(user.businessDetails);
        }
        if (!user.isBusiness) {
          setUserDetails(userId);
        }
      } else setUserTypeDisabled(false);
    }
    if (!user) {
      const sessionData = JSON.parse(checkSessionStorage(1));
      if (sessionData) {
        setPrivateUser(sessionData.privateUser);
        setUserDetails(sessionData.userDetails);
        setPaymentType(sessionData.paymentType);
        setPaymentDetails(sessionData.paymentDetails);
      }
    }
  }, [user]);

  const resetStates = () => {
    setUserDetails({});
    setPaymentType("");
    setPaymentDetails("");
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
    console.log("acc1Data", acc1Data);

    const validationResponse = addAcc1Validation({
      privateUser,
      userDetails,
      paymentType,
      paymentDetails,
    });
    if (validationResponse) {
      return;
    } else {
      sessionStorage.setItem("acc1Data", JSON.stringify(acc1Data));
      const newData = {
        ...acc1Data,
        userDetails: { ...acc1Data.userDetails, userId: userId },
      };
      nextBtn(newData, 0);
    }
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

  console.log("user", user);
  console.log("privateUser", privateUser);
  console.log("userDisableType", typeof userTypeDisabled);

  return (
    <Box>
      {/* RADIO */}
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend" />
          <RadioGroup
            row
            name="privateUser"
            value={privateUser}
            onChange={handleUserTypeChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio disabled={userTypeDisabled} />}
              label="לקוח פרטי"
            />
            <FormControlLabel
              value="false"
              control={<Radio disabled={userTypeDisabled} />}
              label="לקוח עסקי"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {privateUser === "true" && (
        <PrivateUserType
          parentData={{
            paymentType,
            paymentDetails,
            caravanIds: user.caravanIds.length > 0 ? user.caravanIds : [],
          }}
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
