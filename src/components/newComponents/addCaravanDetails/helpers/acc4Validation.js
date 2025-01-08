import { validateInputs } from "../../../../validation/validation.js";
import {
  companySchema,
  paymentDetailsSchema,
  phoneNumberSchema,
} from "../../../../validation/addCaravanValidation.js";
import { toast } from "react-toastify";

const acc4Validation = (
  privateUser,
  userDetails,
  paymentType,
  paymentDetails
) => {
  if (!privateUser || !paymentType || !paymentDetails || !userDetails) {
    //console.log("data", privateUser, paymentType, paymentDetails, userDetails);
    console.log("acc4 validation error. missing data");
    toast.error("אנא מלאו את כל הפרטים");
    return true;
  }

  if (privateUser === "true" && paymentType === "1") {
    const paymentValidationResponse = validateInputs(
      paymentDetailsSchema,
      paymentDetails
    );
    if (paymentValidationResponse) {
      return true;
    }
  }
  if (privateUser === "true" && paymentType === "2") {
    console.log("paymentdetails", paymentDetails.phoneNumber);

    const phoneValidationResponse = validateInputs(
      phoneNumberSchema,
      paymentDetails.phoneNumber
    );
    if (phoneValidationResponse) {
      return true;
    }
  }

  if (privateUser === "false") {
    const userDetailsValidationResponse = validateInputs(
      companySchema,
      userDetails
    );
    if (userDetailsValidationResponse) {
      return true;
    }
    if (paymentType === "1") {
      const paymentValidationResponse = validateInputs(
        paymentDetailsSchema,
        paymentDetails
      );
      if (paymentValidationResponse) {
        return true;
      }
    }
    if (paymentType === "2") {
      const phoneValidationResponse = validateInputs(
        phoneNumberSchema,
        paymentDetails.phoneNumber
      );
      if (phoneValidationResponse) {
        return true;
      }
    }
  }
  return false;
};

export default acc4Validation;
