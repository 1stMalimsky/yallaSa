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
import EditPrivateUserType from "./helpers/EditPrivateUserType.jsx";
import EditCompanyUserType from "./helpers/EditCompanyUserType.jsx";
import getToken from "../../../utils/helpers/getToken.js";
import acc1Validation from "../addCaravanDetails/helpers/acc1Validation.js";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const EditAcc1 = ({ nextBtn, parentData, caravanId, numOfCaravansOwned }) => {
  //console.log("parentData", parentData);
  const [privateUser, setPrivateUser] = useState(parentData.privateUser);
  const [userDetails, setUserDetails] = useState(parentData.userDetails);
  const [paymentType, setPaymentType] = useState(
    parentData.paymentDetails.phone ? 2 : 1 || ""
  );
  const [paymentDetails, setPaymentDetails] = useState(
    parentData.paymentDetails
  );

  const [disabled, setDisabled] = useState(true);
  const userId = getToken().userId;

  useEffect(() => {
    if (parentData) {
      setPrivateUser(parentData.privateUser);
      setUserDetails(parentData.userDetails);
      setPaymentType(parentData.paymentDetails.phone ? 2 : 1);
      setPaymentDetails(parentData.paymentDetails);
      if (numOfCaravansOwned > 1) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [parentData]);

  const resetStates = () => {
    setUserDetails({});
    setPaymentType("");
    setPaymentDetails("");
  };

  //console.log("userDetails", userDetails);

  const handleNextBtn = async () => {
    let acc1Data = {
      ...(privateUser === "false" && { userDetails }),
      ...(privateUser === "true" && {
        ...userDetails,
        companyName: "",
        companyId: "",
        phone: "",
        city: "",
        street: "",
        email: "",
      }),
      privateUser,
      paymentType,
      paymentDetails,
    };
    console.log("paymentDetails", paymentDetails);

    const validationResponse = acc1Validation(acc1Data);
    try {
      if (validationResponse) {
        //console.log("acc1Data", acc1Data);

        console.log("validationResponse", validationResponse);
        toast.error(validationResponse);
        return;
      } else {
        //const dataToUpdate = {}
        handleUpdateUserDetails(acc1Data);
        const newData = {
          ...acc1Data,
          userDetails: { ...acc1Data.userDetails, userId: userId },
        };
        nextBtn(newData, 0);
      }
    } catch (err) {
      console.log("handleNextBtn error", err);
    }
  };
  const handlePaymentTypeChange = (paymentTypeData) => {
    setPaymentDetails({
      bankAccount: "",
      bankBranch: "",
      bankName: "",
      phone: "",
    });
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

  const handleUpdateUserDetails = async (dataToUpdate) => {
    console.log("dataToUpdate", dataToUpdate);

    if (paymentType === 1) {
      dataToUpdate.paymentDetails = {
        //bankAccount: "",
        //bankBranch: "",
        //bankName: "",
        phone: dataToUpdate.paymentDetails.phone,
      };
    }
    if (paymentType === 2) {
      dataToUpdate.paymentDetails = {
        bankAccount: dataToUpdate.paymentDetails.bankAccount,
        bankBranch: dataToUpdate.paymentDetails.bankBranch,
        bankName: dataToUpdate.paymentDetails.bankName,
        //phone: "",
      };
    }
    try {
      //console.log("dataToUpdate", dataToUpdate);
      const paymentDetails1 = dataToUpdate.paymentDetails;
      console.log("paymentDetails in try", paymentDetails1);

      const userResponse = await axios.put(`/users/update/${userId}`, {
        paymentDetails: dataToUpdate.paymentDetails,
      });
      if (!userResponse.data) {
        toast.error("הפרטים לא עודכנו");
        return;
      }

      if (userDetails.companyId) {
        const caravanResponse = await axios.patch(`/caravans/${caravanId}`, {
          "ownerDetails.isBusiness": true,
          "ownerDetails.businessDetails": dataToUpdate.userDetails,
        });
        console.log("business caravan server response", caravanResponse.data);
      }
      if (!userDetails.companyId) {
        console.log("user here");
        const caravanResponse = await axios.patch(`/caravans/${caravanId}`, {
          "ownerDetails.isBusiness": false,
          "ownerDetails.businessDetails": null,
        });
        console.log("private caravan server response", caravanResponse.data);
      }
      console.log("user server response", userResponse.data);
      if (userResponse.data) {
        toast.success("הפרטים עודכנו בהצלחה!");
      } else {
        toast.error("הפרטים לא עודכנו");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (parentData.length === 0) return <CircularProgress />;

  return (
    <Box>
      {/* RADIO */}
      <Box>
        <FormControl component="fieldset" disabled={disabled}>
          <FormLabel component="legend" />
          <RadioGroup
            row
            name="userType"
            value={privateUser}
            onChange={handleUserTypeChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="לקוח פרטי"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="לקוח עסקי"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {privateUser === "true" && (
        <EditPrivateUserType
          parentData={parentData}
          handlePtype={handlePaymentTypeChange}
          handlePdetails={handlePaymentDetailsChange}
        />
      )}
      {privateUser === "false" && (
        <EditCompanyUserType
          handleUserDetails={handleUserDetailsChange}
          handlePaymentTypeChange={handlePaymentTypeChange}
          handlePaymentDetailsChange={handlePaymentDetailsChange}
          parentData={parentData}
        />
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" onClick={handleNextBtn}>
          עדכן
        </Button>
      </Box>
    </Box>
  );
};

export default EditAcc1;
