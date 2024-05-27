import joi from "joi";

export const othersProfileSchema= joi.object({
    id: joi.string().required()
}).required();