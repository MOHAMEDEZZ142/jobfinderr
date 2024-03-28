import joi from "joi";
// register
export const companySignUpSchema= joi.object({
    companyName: joi.string().required().min(3).max(20),
    email:joi.string().email().required(),
    password: joi.string().required(),
    confirmedPassword: joi.string().required().valid(joi.ref("password")),
    phone: joi.string().pattern(/^01[0,1,2,5]{1}[0-9]{8}$/),
    address: joi.string(),
    establishmentDate: joi.date().iso().max('now').required(),
    description: joi.string()
}).required();

//addDescription
export const addDescriptionSchema= joi.object({
    description: joi.string().required()
}).required();