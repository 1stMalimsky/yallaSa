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
  companyEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "אנא הכנס כתובת מייל תקינה",
      "string.empty": "אנא הכנס כתובת מייל",
      "any.required": "אנא הכנס כתובת מייל",
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

const acc7ValidationSchema = Joi.object({
  city: Joi.string().min(2).max(100).required().messages({
    "string.base": `"עיר" חייבת להיות מחרוזת`,
    "string.empty": `"עיר" לא יכולה להיות ריקה`,
    "string.min": `"עיר" צריכה להיות לפחות 2 תווים`,
    "string.max": `"עיר" יכולה להיות עד 100 תווים`,
    "any.required": `"עיר" היא שדה חובה`,
  }),
  street: Joi.string().min(2).max(100).required().messages({
    "string.base": `"רחוב" חייב להיות מחרוזת`,
    "string.empty": `"רחוב" לא יכול להיות ריק`,
    "string.min": `"רחוב" צריך להיות לפחות 2 תווים`,
    "string.max": `"רחוב" יכול להיות עד 100 תווים`,
    "any.required": `"רחוב" הוא שדה חובה`,
  }),
  houseNumber: Joi.string()
    .pattern(/^\d+[a-zA-Z]*$/)
    .required()
    .messages({
      "string.pattern.base": `"מספר בית" צריך להיות מורכב ממספרים ויכול לכלול אותיות לאחר המספרים`,
      "any.required": `"מספר בית" הינו שדה חובה`,
      "string.empty": `"מספר בית" לא יכול להיות ריק`,
    }),
  mapsLocation: Joi.string()
    .pattern(/^([-+]?\d{1,3}\.\d+),\s*([-+]?\d{1,3}\.\d+)$/)
    .allow("")
    .messages({
      "string.pattern.base": `"מיקום במפות" צריך להיות בפורמט של קואורדינטות GPS ("lat,lng") ולהכיל מספרים עשרוניים`,
    }),
  pickupFrom: Joi.string()
    .pattern(new RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$"))
    .required()
    .messages({
      "string.empty": `"שעת איסוף" לא יכול להיות ריק`,
      "string.pattern.base": `"שעת איסוף" צריכה להיות בפורמט שעה HH:MM`,
      "any.required": `"שעת איסוף" היא שדה חובה`,
    }),
  dropoffUntil: Joi.string()
    .pattern(new RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$"))
    .required()
    .messages({
      "string.empty": `"שעת החזרה" לא יכול להיות ריק`,
      "string.pattern.base": `"שעת החזרה" צריכה להיות בפורמט שעה HH:MM`,
      "any.required": `"שעת החזרה" היא שדה חובה`,
    }),
});

const acc2ValidationSchema = Joi.object({
  listingName: Joi.string().min(2).max(20).required().messages({
    "string.base": `"שם הקרוואן" חייב להיות מורכב מאותיות`,
    "string.empty": `"שם הקרוואן" לא יכול להיות ריק`,
    "string.min": `"שם הקרוואן" צריך להיות לפחות 2 תווים`,
    "string.max": `"שם הקרוואן" יכול להיות עד 20 תווים`,
    "any.required": `"שם הקרוואן" היא שדה חובה`,
  }),
  description: Joi.string().min(2).max(200).required().messages({
    "string.base": `"תיאור הקרוואן" חייב להיות מורכב מאותיות`,
    "string.empty": `"תיאור הקרוואן" לא יכול להיות ריק`,
    "string.min": `"תיאור הקרוואן" צריך להיות לפחות 2 תווים`,
    "string.max": `"תיאור הקרוואן" יכול להיות עד 200 תווים`,
    "any.required": `"תיאור הקרוואן" היא שדה חובה`,
  }),
});

const acc9ValidationSchema = Joi.object({
  pricePerNight: Joi.number().min(5).max(10000).required().messages({
    "number.base": `"מחיר ללילה" צריך להיות מספר`,
    "number.min": `"מחיר ללילה" צריך להיות לפחות 5`,
    "number.max": `"מחיר ללילה" צריך להיות לכל היותר 10000`,
    "any.required": `"מחיר ללילה" הינו שדה חובה`,
    "string.empty": `"מחיר ללילה" לא יכול להיות ריק`,
  }),
  minimumNights: Joi.number().min(1).max(10).required().messages({
    "number.base": `"מינימום לילות" צריך להיות מספר`,
    "number.min": `"מינימום לילות" צריך להיות לפחות 1`,
    "number.max": `"מינימום לילות" צריך להיות לכל היותר 10`,
    "any.required": `"מינימום לילות" הינו שדה חובה`,
    "string.empty": `"מינימום לילות" לא יכול להיות ריק`,
  }),
  freeCancelationDays: Joi.number().min(0).max(100).allow("").messages({
    "number.base": `"ימים לביטול חינם" צריך להיות מספר`,
    "number.min": `"ימים לביטול חינם" צריך להיות לפחות 0`,
    "number.max": `"ימים לביטול חינם" צריך להיות לכל היותר 100`,
    "any.required": `"ימים לביטול חינם" הינו שדה חובה`,
    "string.empty": `"ימים לביטול חינם" לא יכול להיות ריק`,
  }),
  cancelationPrice: Joi.number().min(0).max(100).allow("").messages({
    "number.base": `"דמי ביטול" צריך להיות מספר`,
    "number.min": `"דמי ביטול" צריך להיות לפחות 0`,
    "number.max": `"דמי ביטול" צריך להיות לכל היותר 100`,
    "any.required": `"דמי ביטול" הינו שדה חובה`,
    "string.empty": `"דמי ביטול" לא יכול להיות ריק`,
  }),
  insuranceIncluded: Joi.boolean().required().messages({
    "boolean.base": `"ביטוח כלול" צריך להיות כן או לא`,
    "any.required": `"ביטוח כלול" הינו שדה חובה`,
    "string.empty": `"ביטוח כלול" לא יכול להיות ריק`,
  }),
  basicInsurance: Joi.number().min(0).max(1000).allow("").messages({
    "number.base": `"ביטוח בסיסי" צריך להיות מספר`,
    "number.min": `"ביטוח בסיסי" צריך להיות לפחות 0 ש"ח`,
    "number.max": `"ביטוח בסיסי" צריך להיות לכל היותר 1000 ש"ח`,
  }),

  premiumInsurance: Joi.number().min(0).max(10000).allow("").messages({
    "number.base": `"ביטוח פרימיום" צריך להיות מספר`,
    "number.min": `"ביטוח פרימיום" צריך להיות לפחות 0 ש"ח`,
    "number.max": `"ביטוח פרימיום" צריך להיות לכל היותר 10000 ש"ח`,
  }),
});

export {
  companySchema,
  paymentDetailsSchema,
  baseCaravanDetailsSchema,
  phoneNumberSchema,
  acc7ValidationSchema,
  acc2ValidationSchema,
  acc9ValidationSchema,
};
