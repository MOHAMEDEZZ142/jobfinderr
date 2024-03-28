import joi from "joi";
// register
export const seekerSignUpSchema= joi.object({
    firstName: joi.string().required().min(3).max(20),
    lastName: joi.string().required().min(3).max(20),
    email:joi.string().email().required(),
    password: joi.string().required(),
    confirmedPassword: joi.string().required().valid(joi.ref("password")),
    gender: joi.string().valid("male", "female"),
    phone: joi.string().pattern(/^01[0,1,2,5]{1}[0-9]{8}$/),
    address: joi.string(),
    birthDate: joi.date().iso().max('now').required()
}).required();