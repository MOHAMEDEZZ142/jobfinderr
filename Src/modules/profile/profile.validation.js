import joi from "joi";

export const othersCompanyProfileSchema= joi.object({
    companyId: joi.string().required()
}).required();

export const othersSeekerProfileSchema= joi.object({
    seekerId: joi.string().required()
}).required();