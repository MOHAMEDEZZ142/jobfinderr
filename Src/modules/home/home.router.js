import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { jobsFeed, postsFeed } from "./home.controller.js";
const router= Router();

router.get("/postsFeed", isAuthenticated, asyncHandler(postsFeed));
router.get("/jobsFeed", isAuthenticated, asyncHandler(jobsFeed));
export default router;