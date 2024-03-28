import joi from "joi";

export const reactPostSchema= joi.object({
    postId: joi.required(),
}).required();
export const showAllReactOnPostSchema= joi.object({
    postId: joi.required(),
}).required();
export const unReactPostSchema= joi.object({
    postId: joi.required(),
}).required();
export const postReactsCountSchema= joi.object({
    postId: joi.required(),
}).required();