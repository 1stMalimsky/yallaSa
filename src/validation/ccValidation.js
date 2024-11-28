import Joi from "joi";

const ccRegex =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

const ccValidationSchema = Joi.object({
  cardNumber: Joi.string().pattern(ccRegex).required().messages({
    "string.pattern.base": "מספר כרטיס לא תקין",
    "string.empty": "שדה חובה",
  }),
  cardName: Joi.string().required().messages({
    "string.empty": "יש לכתוב שם בעל האשראי",
  }),
  cardExpDate: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
    .required()
    .messages({
      "string.pattern.base": "אנא הכניסו תאריך בפורמט המתאים",
      "string.empty": "יש להכניס תאריך תפוגה",
    }),
  cardCvv: Joi.string()
    .pattern(/^[0-9]{3,4}$/)
    .required()
    .messages({
      "string.pattern.base": "CVV חייב להכיל 3 או 4 ספרות",
      "string.empty": "שדה חובה",
    }),
});

const validateCC = (ccInput) =>
  ccValidationSchema.validate(ccInput, { abortEarly: false });

export { validateCC };
