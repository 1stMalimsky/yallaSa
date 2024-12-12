import Joi from "joi";

import { validation } from "./validation";

const profileSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required().messages({
    "string.min": "השם חייב להכלי לפחות 2 תווים",
    "string.max": "השם אינו יכול לעלות על 100 תווים",
    "any.required": "יש להכניס שם מלא",
    "string.empty": "יש להכניס שם מלא",
  }),
  phone: Joi.number().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  license: Joi.string().min(2).max(100).allow(""),
});

const validateProfileSchema = (userInput) =>
  validation(profileSchema, userInput);

export { validateProfileSchema, profileSchema };
