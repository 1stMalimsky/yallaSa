import Joi from "joi";

import generateTimeOptions from "../utils/generateTimeOptions";

/* SCHEMA FOR PANEL 1 */
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
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "אנא הכנס מייל",
      "string.email": "אנא הכנס מייל תקין",
      "any.required": "אנא ודא שמילאת את כל הפרטים",
    }),
});

const validatePanel1 = (userInput) => {
  return panel1Schema.validate(userInput, { abortEarly: false });
};

/* SCHEMA FOR PANEL 2  & PANEL 3*/

const earliestTime = "08:00";
const latestTime = "20:00";
const validTimeOptions = generateTimeOptions(earliestTime, latestTime);

const panel2Schema = Joi.string()
  .valid(...validTimeOptions)
  .custom((value, helpers) => {
    if (value < earliestTime || value > latestTime) {
      return helpers.message(
        `The time must be between ${earliestTime} and ${latestTime}`
      );
    }
    return value;
  })
  .empty("")
  .messages({
    "any.only": "אנא הכנס שעת איסוף תקינה",
    "string.base": "שעת האיסוף חייבת להיות מחרוזת תקינה",
    "string.empty": "אנא הכנס שעת איסוף",
    "any.required": "אנא ודא שמילאת את הפרטים",
  })
  .required();

const validatePanel2 = (userInput) => {
  return panel2Schema.validate(userInput, { abortEarly: false });
};

export { validatePanel1, validatePanel2 };

const validations = {
  validatePanel1,
  validatePanel2,
};

export default validations;
