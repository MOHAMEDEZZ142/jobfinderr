import joi from "joi";

export const followSchema= joi.object({
    followedId: joi.required(),
}).required();
export const unFollowSchema= joi.object({
    id: joi.required(),
}).required();
export const removeFollowSchema= joi.object({
    id: joi.required(),
}).required();
export const followerCountSchema= joi.object({
    followedId: joi.required(),
}).required();
export const followingCountSchema= joi.object({
    followerId: joi.required(),
}).required();