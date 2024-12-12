import Joi from "joi";
import { validation } from "./validation";

const registerSchema = Joi.object({
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
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required()
    .messages({
      "string.pattern.base": "מספר טלפון לא תקין",
      "any.required": "אנא הזן מספר טלפון",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "אנא הזן כתובת מייל תקינה",
      "any.required": "אנא הזן כתובת מייל",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=(?:[^A-Z]*[A-Z]))(?=(?:[^0-9]*[0-9]){4})(?=.*[-!@#$%^&*_]).{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "הסיסמא חייבת להכיל לפחות 8 תווים, ספרה אחת, אות גדולה אחת וסימן מיוחד אחד",
      "any.required": "אנא בחר סיסמא",
    }),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export { validateRegisterSchema, registerSchema };
