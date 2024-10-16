import Joi from "joi";
import validation from "./validation";

const panel1Schema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .max(256)
    .required()
    .regex(/^\S+\s+\S+/)
    .messages({
      "string.empty": "אנא הכנס שם מלא",
      "string.pattern.base": "אנא הכנס שם מלא תקין",
      "any.required": "אנא ודא שמילאת שם מלא",
    }),
  resident: Joi.boolean().required().messages({
    "boolean.base": "אנא עדכן אם אתה תושב ישראל",
    "any.required": "אנא ודא שמילאת את כל הפרטים",
  }),
  phone: Joi.string()
    .pattern(/^05[0-9]{8}$/)
    .messages({
      "string.empty": "אנא הכנס מספר טלפון",
      "string.pattern.base": "אנא הכנס מספר תקין - 10 מספרים, ללא מקווים",
    })
    .required(),
  birthDate: Joi.date().required().messages({
    "any.required": " אנא הכנס תאריך לידה",
    "date.base": "אנא הכנס תאריך לידה תקין",
  }),
  age: Joi.number().integer().min(25).max(70).required().messages({
    "number.base": "age error",
    "number.min": "הנך חייב להיות מעל גיל 25 להזמנה",
    "number.max": "הנך חייב להיות מתחת לגיל 70 להזמנה",
  }),
});

const validatePanel1 = (userInput) => {
  return panel1Schema.validate(userInput, { abortEarly: false });
};

export { validatePanel1 };

const validations = {
  validatePanel1,
};

export default validations;
