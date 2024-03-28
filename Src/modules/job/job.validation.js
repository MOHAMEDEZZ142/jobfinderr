import joi from "joi";

export const addJobSchema= joi.object({
    content: joi.string().required(),
}).required();
export const deleteJobSchema= joi.object({
    id: joi.required(),
}).required();