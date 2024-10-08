import Joi from "joi";
import validation from "./validation";

const idSchema = Joi.number().min(1);


const validateId = (userInput) => validation(idSchema, userInput);

export default validateId