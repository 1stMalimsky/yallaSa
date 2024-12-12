import { profileSchema } from "./profileValidation";
import { loginSchema } from "./loginValidation";

const validation = (schema, userInput) => {
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
export { validation, profileSchema, loginSchema };
