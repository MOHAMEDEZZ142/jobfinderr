import joi from "joi";

export const createApplicationSchema= joi.object({
    jobId: joi.required(),
}).required();
export const AlljobApplicationsSchema= joi.object({
    jobId: joi.required(),
}).required();
export const deleteApplicationSeekerSchema= joi.object({
    jobId: joi.required(),
}).required();
export const deleteApplicationCompanySchema= joi.object({
    jobId: joi.required(),
}).required();
export const jobApplicationCountSchema= joi.object({
    jobId: joi.required(),
}).required();