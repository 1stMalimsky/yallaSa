import { acc9ValidationSchema } from "../../../../validation/addCaravanValidation";
import { validateInputs } from "../../../../validation/validation";
import { toast } from "react-toastify";

const acc9Validation = (data) => {
  //console.log("data", data);

  if (data.premiumAvailable === "" || data.isCancelationPolicy === "") {
    toast.error("אנא ענו על כל השאלות");
    return true;
  }

  if (
    data.insuranceIncluded === "true" &&
    data.premiumAvailable === "true" &&
    data.premiumInsurance === ""
  ) {
    toast.error("אנא מלאו מחיר ביטוח פרמיום");
    return true;
  }
  if (data.insuranceIncluded === "false") {
    if (data.basicInsurance === "") {
      toast.error("אנא מלאו מחיר ביטוח בסיסי");
      return true;
    }
    if (data.premiumInsurance === "") {
      toast.error("אנא מלאו מחיר ביטוח פרמיום");
      return true;
    }
  }

  if (data.isCancelationPolicy === true) {
    if (data.freeCancelationDays === "" || data.cancelationPrice === "") {
      toast.error("אנא מלאו את כל הפרטים על מדיניות ביטולים");
      return true;
    }
  }
  const dataClone = { ...data };
  delete dataClone.isCancelationPolicy;

  return validateInputs(acc9ValidationSchema, dataClone);

  /* const validationResponse = validateInputs(acc9ValidationSchema, data);
  return validationResponse; */
};

export default acc9Validation;
