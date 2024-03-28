import joi from "joi";

export const addPostSchema= joi.object({
    content: joi.string().required()
}).required();