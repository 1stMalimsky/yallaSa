import Joi from "joi";
import validUrl from 'valid-url';
import validation from "./validation";

const validateURL = (value) => {
  if (validUrl.isWebUri(value)) {
    return value;
  } else {
    return null;
  }
};
const profileSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(0).max(100),
  phone: Joi.number().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  url: Joi.string().custom(validateURL).required(),
  alt: Joi.string().min(0).max(55),
  state: Joi.string().min(0).max(15),
  country: Joi.string().min(2).max(20).required(),
  city: Joi.string().min(2).max(30).required(),
  street: Joi.string().min(2).max(30).required(),
  houseNumber: Joi.number().required(),
  zip: Joi.number().required(),
});

const validateProfileSchema = (userInput) =>
  validation(profileSchema, userInput);

export default validateProfileSchema;
