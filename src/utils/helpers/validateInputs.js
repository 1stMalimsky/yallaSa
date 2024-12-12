import { validation } from "../../validation/validation";
import { toast } from "react-toastify";

const validateInputs = (schema, input) => {
  const validationResponse = validation(schema, input);
  if (validationResponse) {
    const firstKey = Object.keys(validationResponse)[0];
    const firstMessage = validationResponse[firstKey][0];
    toast.error(firstMessage);
    return false;
  } else {
    return true;
  }
};

export default validateInputs;
