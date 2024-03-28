import joi from "joi";

export const addCommentSchema= joi.object({
    content: joi.string().required(),
    postId: joi.required(),
}).required();
export const postAllCommentsSchema= joi.object({
    postId: joi.required(),
}).required();
export const deleteCommentSchema= joi.object({
    id: joi.required(),
}).required();
export const myAllCommentsSchema= joi.object({
    id: joi.required(),
}).required();
export const deleteOthersCommentsSchema= joi.object({
    postId: joi.required(),
}).required();
export const deleteAllPostCommentsSchema= joi.object({
    postId: joi.required(),
}).required();
export const postCommentsCountSchema= joi.object({
    postId: joi.required(),
}).required();