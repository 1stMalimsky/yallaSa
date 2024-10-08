import Joi from "joi";
import validation from "./validation";

const customTlds = ['com', 'org', 'net', 'edu']

const bookingSchema = Joi.object({
    firstName: Joi.string().min(2).max(256).required(),
    lastName: Joi.string().min(2).max(256).required(),
    phone: Joi.string().min(9).max(14).required(),
    email: Joi.string().email(({
        tlds: {
            allow: customTlds
        }
    })).min(2).max(256).required(),
})


const validateBooking = (userInput) => validation(bookingSchema, userInput);

export default validateBooking;