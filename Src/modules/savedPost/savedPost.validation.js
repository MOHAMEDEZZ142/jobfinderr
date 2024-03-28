import joi from "joi";

export const savePostSchema= joi.object({
    postId: joi.required(),
}).required();;
export const unSavePostSchema= joi.object({
    postId: joi.required(),
}).required();
export const PostSavesCountSchema= joi.object({
    postId: joi.required(),
}).required();