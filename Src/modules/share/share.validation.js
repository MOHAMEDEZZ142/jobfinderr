import joi from "joi";

export const SharePostSchema= joi.object({
    postId: joi.required(),
}).required();;
export const unShareSchema= joi.object({
    postId: joi.required(),
}).required();
export const PostSharesCountSchema= joi.object({
    postId: joi.required(),
}).required();