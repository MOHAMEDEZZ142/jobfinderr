import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { follow, followerCount, followingCount, myFollowers, myFollowing, removeFollow, unFollow } from "./following.controller.js";
const router = Router();
router.post("/follow/:followedId", isAuthenticated, asyncHandler(follow));
router.get("/myFollowers", isAuthenticated, asyncHandler(myFollowers));
router.get("/myFollowing", isAuthenticated, asyncHandler(myFollowing));
router.delete("/unFollow/:id", isAuthenticated, asyncHandler(unFollow));
router.delete("/removeFollow/:id", isAuthenticated, asyncHandler(removeFollow));
router.get("/followerCount/:followedId", isAuthenticated, asyncHandler(followerCount));
router.get("/followingCount:/followerId", isAuthenticated, asyncHandler(followingCount));

export default router;