import joi from "joi";

export const addJobSchema= joi.object({
    jobTiltle: joi.string().required(),
    level: joi.string().required(),
    requirments: joi.string().required(),
    responsability: joi.string().required(),
    yOfExperience: joi.string().required(),
}).required();
export const deleteJobSchema= joi.object({
    id: joi.required(),
}).required();