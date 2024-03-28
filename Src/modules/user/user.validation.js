import joi from "joi";

export const loginSchema= joi.object({
    email:joi.string().email().required(),
    password: joi.string().required(),
}).required();

export const sendForgetPassCodeSchema= joi.object({
    email:joi.string().email().required()
}).required();

export const resetPasswordSchema= joi.object({
    forgetCode: joi.number().max(5).min(4).required(),
    password: joi.string().required(),
    confirmedPassword: joi.string().required().valid(joi.ref("password")),
}).required();

export const updateSchema= joi.object({
    userName: joi.string().required().min(3).max(20),
    phone: joi.string().pattern(/^01[0,1,2,5]{1}[0-9]{8}$/),
    address: joi.string(),
    bio: joi.string()
}).required();