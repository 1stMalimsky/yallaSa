import Joi from "joi";
import { toast } from "react-toastify";

const validation = (schema, userInput) => {
  if (!userInput || !schema) {
    return false;
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
  if (!input || !schema) {
    toast.error("חסרים נתונים להמשך");
    return true;
  }
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
