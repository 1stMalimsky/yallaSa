import Joi from "joi";
import { toast } from "react-toastify";

const validation = (schema, userInput) => {
  console.log("in validation function");

  if (!userInput || !schema) {
    return console.log("userInput or schema missing");
  }
  const { error } = schema.validate(userInput, { abortEarly: false });
  if (!error) {
    // no errors
    return null;
  }
  return error.details.reduce((acc, { context, message }) => {
    const key = context.key;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(message);
    return acc;
  }, {});
};

const validateInputs = (schema, input) => {
  const validationResponse = validation(schema, input);
  if (validationResponse) {
    const firstKey = Object.keys(validationResponse)[0];
    const firstMessage = validationResponse[firstKey][0];
    toast.error(firstMessage);
    return true;
  } else {
    return false;
  }
};

export { validation, validateInputs };
