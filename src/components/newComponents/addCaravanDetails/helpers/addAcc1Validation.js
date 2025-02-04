import { validateInputs } from "../../../../validation/validation.js";
import {
  companySchema,
  paymentDetailsSchema,
  phoneNumberSchema,
} from "../../../../validation/addCaravanValidation.js";
import { toast } from "react-toastify";

const acc1Validation = (acc1Details) => {
  console.log("acc1 validation", acc1Details);

  let { privateUser, userDetails, paymentType, paymentDetails } = acc1Details;
  if (paymentDetails && paymentDetails.bankAccount) {
    paymentType = "1";
  }
  if (paymentDetails && paymentDetails.phone) {
    paymentType = "2";
  }
  if (!privateUser || !paymentType || !paymentDetails) {
    console.log("first condition", privateUser, paymentType, paymentDetails);

    if (privateUser === "false" && !userDetails)
      console.log(
        "acc1 validation error. missing data1",
        privateUser,
        userDetails
      );
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
    console.log("paymentdetails", paymentDetails.phone);

    const phoneValidationResponse = validateInputs(
      phoneNumberSchema,
      paymentDetails.phone
    );
    if (phoneValidationResponse) {
      return true;
    }
  }

  if (privateUser === "false") {
    console.log("userDetails", userDetails);

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
        paymentDetails.phone
      );
      if (phoneValidationResponse) {
        return true;
      }
    }
  }
  return false;
};

export default acc1Validation;
