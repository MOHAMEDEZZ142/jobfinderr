import joi from "joi";

export const othersCompanyProfile= joi.object({
    companyId: joi.string().required()
}).required();

export const othersSeekerProfile= joi.object({
    seekerId: joi.string().required()
}).required();