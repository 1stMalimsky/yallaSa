import Joi from "joi";

const acc5ValidationSchema = Joi.object({
  weight: Joi.number()
    .min(100)
    .max(20000)
    .required()
    .label("משקל כולל")
    .messages({
      "string.empty": `"משקל כולל" לא יכול להיות ריק`,
      "number.base": `"משקל כולל" צריך להיות מספר`,
      "number.min": `"משקל כולל" צריך להיות לפחות 100`,
      "number.max": `"משקל כולל" צריך להיות עד 20000`,
      "any.required": `"משקל כולל" הינו שדה חובה`,
    }),
  length: Joi.number().min(100).max(2000).required().label("אורך ").messages({
    "number.base": `"אורך" צריך להיות מספר`,
    "number.min": `"אורך" צריך להיות לפחות 100`,
    "number.max": `"אורך" צריך להיות עד 2000`,
    "any.required": `"אורך" הינו שדה חובה`,
    "string.empty": `"אורך" לא יכול להיות ריק`,
  }),
  width: Joi.number().min(50).max(1000).required().label("רוחב").messages({
    "number.base": `"רוחב" צריך להיות מספר`,
    "number.min": `"רוחב" צריך להיות לפחות 50`,
    "number.max": `"רוחב" צריך להיות עד 1000`,
    "any.required": `"רוחב" הינו שדה חובה`,
    "string.empty": `"רוחב" לא יכול להיות ריק`,
  }),
  licenseClass: Joi.string()
    .max(2)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .label("רישיון נהיגה נדרש")
    .messages({
      "string.base": `"רישיון נהיגה נדרש" צריך להיות טקסט`,
      "string.max": `"רישיון נהיגה נדרש" צריך להיות עד 2 תווים`,
      "string.pattern.base": `"רישיון נהיגה נדרש" צריך להכיל אותיות אנגליות בלבד`,
      "any.required": `"רישיון נהיגה נדרש" הינו שדה חובה`,
      "string.empty": `"רישיון נהיגה נדרש" לא יכול להיות ריק`,
    }),
  minimumAge: Joi.number().min(18).max(70).required().label("גיל").messages({
    "number.base": `"גיל" חייב להיות מספר`,
    "number.min": `"גיל" חייב להיות לפחות 18`,
    "number.max": `"גיל" אינו יכול לעבור את 70`,
    "any.required": `"גיל" הוא שדה חובה`,
  }),
});

export default acc5ValidationSchema;
