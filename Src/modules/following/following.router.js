import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { follow, myFollowers } from "./following.controller.js";
const router = Router();
router.post("/follow/:followedId", isAuthenticated, asyncHandler(follow));
router.post("/myFollowers", isAuthenticated, asyncHandler(myFollowers));

export default router;