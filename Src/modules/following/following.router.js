import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { follow, followerCount, followingCount, myFollowers, myFollowing, removeFollow, unFollow } from "./following.controller.js";
import { isValid } from "../../middleware/validation.js";
import { createApplicationSchema, followerCountSchema, followingCountSchema, removeFollowSchema, unFollowSchema } from "./following.validation.js";
const router = Router();
router.post("/follow/:followedId", isAuthenticated, isValid(createApplicationSchema),asyncHandler(follow));
router.get("/myFollowers", isAuthenticated, asyncHandler(myFollowers));
router.get("/myFollowing", isAuthenticated, asyncHandler(myFollowing));
router.delete("/unFollow/:id", isAuthenticated, isValid(unFollowSchema),asyncHandler(unFollow));
router.delete("/removeFollow/:id", isAuthenticated, isValid(removeFollowSchema),asyncHandler(removeFollow));
router.get("/followerCount/:followedId", isAuthenticated, isValid(followerCountSchema),asyncHandler(followerCount));
router.get("/followingCount:/followerId", isAuthenticated, isValid(followingCountSchema),asyncHandler(followingCount));

export default router;