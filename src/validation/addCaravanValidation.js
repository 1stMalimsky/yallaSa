import Joi from "joi";

const phoneNumberSchema = Joi.string()
  .min(4)
  .max(50)
  .required()
  .label("טלפון")
  .messages({
    "string.base": "מספר הטלפון צריך להיות מורכב מתווים",
    "string.empty": "מספר הטלפון לא יכול להיות ריק",
    "string.min": "מספר הטלפון צריך להכיל לפחות 5 תווים",
    "string.max": "מספר הטלפון יכול להכיל עד 14 תווים",
    "any.required": "מספר הטלפון הינו שדה חובה",
  });

const companySchema = Joi.object({
  companyName: Joi.string()
    .min(1)
    .max(155)
    .required()
    .label("שם החברה")
    .messages({
      "string.empty": "יש למלא שם חברה",
      "string.min": "שם החברה חייב להכיל לפחות תו אחד",
      "string.max": "שם החברה יכול להכיל עד 155 תווים",
      "any.required": "שם החברה הינו שדה חובה",
    }),
  companyId: Joi.string()
    .alphanum()
    .min(2)
    .max(20)
    .required()
    .label("מזהה חברה")
    .messages({
      "string.alphanum": "מזהה החברה יכול להכיל אותיות ומספרים בלבד",
      "string.min": "מזהה החברה חייב להכיל לפחות שני תווים",
      "string.max": "מזהה החברה יכול להכיל עד 20 תווים",
      "any.required": "מזהה החברה הינו שדה חובה",
    }),
  companyPhone: Joi.string()
    .pattern(new RegExp("^0([23489]|5[0123456789])-?\\d{7}$"))
    .required()
    .label("טלפון החברה")
    .messages({
      "string.pattern.base": "מספר הטלפון אינו בפורמט הנכון",
      "any.required": "מספר הטלפון הינו שדה חובה",
    }),
  companyStreet: Joi.string()
    .min(2)
    .max(100)
    .required()
    .label("רחוב החברה")
    .messages({
      "string.min": "שם הרחוב חייב להכיל לפחות שני תווים",
      "string.max": "שם הרחוב יכול להכיל עד 100 תווים",
      "any.required": "שם הרחוב הינו שדה חובה",
    }),
  companyCity: Joi.string()
    .min(2)
    .max(100)
    .required()
    .label("עיר החברה")
    .messages({
      "string.min": "שם העיר חייב להכיל לפחות שני תווים",
      "string.max": "שם העיר יכול להכיל עד 100 תווים",
      "any.required": "שם העיר הינו שדה חובה",
    }),
  companyMaps: Joi.string()
    .uri()
    .max(255)
    .allow("")
    .label("מיקום במפות")
    .messages({
      "string.uri": "הכתובת חייבת להיות URL תקני",
      "string.max": "הכתובת יכולה להכיל עד 255 תווים",
    }),
});

const paymentDetailsSchema = Joi.object({
  bankName: Joi.string().min(1).max(255).required().messages({
    "any.required": "שם הבנק הינו שדה חובה",
    "string.empty": "יש למלא שם הבנק",
  }),
  bankBranch: Joi.string().min(1).max(20).required().messages({
    "string.pattern.base": "סניף הבנק צריך להיות מספרי",
    "string.max": "מספר הסניף יכול להכיל עד 20 תווים",
    "any.required": "מספר הסניף הינו שדה חובה",
    "string.empty": "יש למלא מספר הסניף",
  }),
  bankAccount: Joi.string()
    .regex(/^\d+([\/]\d+)*$/)
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.min": "מספר החשבון חייב להכיל לפחות שני תווים",
      "string.max": "מספר החשבון יכול להכיל עד 20 תווים",
      "any.required": "מספר החשבון הינו שדה חובה",
      "string.empty": "יש למלא מספר החשבון",
    }),
});

const baseCaravanDetailsSchema = Joi.object({
  licenseNumber: Joi.string().alphanum().min(5).max(8).required().messages({
    "string.empty": "יש למלא מספר רישוי",
    "string.base": "מספר הרישוי צריך להיות טקסט",
    "string.alphanum": "מספר הרישוי צריך להכיל אותיות ומספרים בלבד",
    "string.min": "מספר הרישוי צריך להכיל לפחות 5 תווים",
    "string.max": "מספר הרישוי יכול להכיל עד 10 תווים",
    "any.required": "מספר הרישוי הוא שדה חובה",
  }),
  carModel: Joi.string().min(1).max(20).required().messages({
    "string.empty": "יש למלא דגם הרכב",
    "string.base": "דגם הרכב צריך להיות טקסט",
    "string.min": "דגם הרכב צריך להכיל לפחות תו אחד",
    "string.max": "דגם הרכב יכול להכיל עד 50 תווים",
    "any.required": "דגם הרכב הוא שדה חובה",
  }),
  carYear: Joi.number()
    .integer()
    .min(1960)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.empty": "יש למלא שנת ייצור",
      "number.base": "שנת ייצור צריכה להיות מספר",
      "number.integer": "שנת ייצור צריכה להיות מספר שלם",
      "number.min": "שנת ייצור צריכה להיות לפחות 1960",
      "number.max": `שנת ייצור צריכה להיות לכל היותר ${new Date().getFullYear()}`,
      "any.required": "שנת ייצור היא שדה חובה",
    }),
});

export {
  companySchema,
  paymentDetailsSchema,
  baseCaravanDetailsSchema,
  phoneNumberSchema,
};
