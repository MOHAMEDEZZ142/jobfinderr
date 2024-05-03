import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { follow, followerCount, followingCount, myFollowers, myFollowing, removeFollow, unFollow } from "./following.controller.js";
import { isValid } from "../../middleware/validation.js";
import { followSchema, followerCountSchema, followingCountSchema, removeFollowSchema, unFollowSchema } from "./following.validation.js";
const router = Router();
router.post("/follow", isAuthenticated, isValid(followSchema),asyncHandler(follow));
router.get("/myFollowers", isAuthenticated, asyncHandler(myFollowers));
router.get("/myFollowing", isAuthenticated, asyncHandler(myFollowing));
router.delete("/unFollow", isAuthenticated, isValid(unFollowSchema),asyncHandler(unFollow));
router.delete("/removeFollow", isAuthenticated, isValid(removeFollowSchema),asyncHandler(removeFollow));
router.get("/followerCount", isAuthenticated, isValid(followerCountSchema),asyncHandler(followerCount));
router.get("/followingCount", isAuthenticated, isValid(followingCountSchema),asyncHandler(followingCount));

export default router;