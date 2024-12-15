import Joi from "joi";

import { validation } from "./validation";

const profileSchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .pattern(/^[a-zA-Zא-ת]+\s+[a-zA-Zא-ת]+$/)
    .messages({
      "any.required": "אנא הזן שם מלא",
      "string.min": "שם מלא חייב להכיל לפחות 2 תווים",
      "string.max": "שם מלא חייב להכיל לכל היותר 100 תווים",
      "string.pattern.base": "שם מלא חייב לכלול לפחות שני שמות מופרדים ברווח",
    }),
  phone: Joi.string()
    .regex(new RegExp(/^0\d{1,2}[-\s]?\d{3}[-\s]?\d{4}$/))
    .required()
    .messages({
      "string.pattern.base": "מספר טלפון לא תקין",
      "any.required": "אנא הזן מספר טלפון",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "אנא הכנס כתובת מייל תקינה",
      "string.empty": "אנא הכנס כתובת מייל",
      "any.required": "אנא הכנס כתובת מייל",
    }),
  license: Joi.string().min(2).max(100).allow(""),
});

const profileSchemaValidation = (userInput) => {
  return profileSchema.validate(userInput, { abortEarly: true });
};

const validateProfileSchema = (userInput) =>
  validation(profileSchema, userInput);

export { validateProfileSchema, profileSchema, profileSchemaValidation };
