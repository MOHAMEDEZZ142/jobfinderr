import joi from "joi";

export const saveJobSchema= joi.object({
    jobId: joi.required(),
}).required();;
export const unSaveJobSchema= joi.object({
    jobId: joi.required(),
}).required();
export const jobSavesCountSchema= joi.object({
    jobId: joi.required(),
}).required();