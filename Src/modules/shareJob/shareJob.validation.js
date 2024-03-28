import joi from "joi";

export const ShareJobSchema= joi.object({
    jobId: joi.required(),
}).required();;
export const unShareJobSchema= joi.object({
    jobId: joi.required(),
}).required();
export const jobSharesCountSchema= joi.object({
    jobId: joi.required(),
}).required();