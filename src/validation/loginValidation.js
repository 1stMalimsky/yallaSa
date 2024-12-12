import Joi from "joi";
import { validation } from "./validation";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "יש להכניס אימייל",
      "string.email": "יש להכניס אימייל תקין",
      "any.required": "יש להכניס אימייל",
    }),
  password: Joi.string().min(2).max(255).required().messages({
    "string.empty": "יש להכניס סיסמא",
    "string.email": "יש להכניס סיסמא",
    "any.required": "יש להכניס סיסמא",
    "string.min": "הסיסמא חייבת להכליל לפחות 2 תווים",
    "string.max": "הסיסמא אינה יכולה לעלות על 255 תווים",
  }),
});

const validateLoginSchema = (userInput) => validation(loginSchema, userInput);

export { validateLoginSchema, loginSchema };
