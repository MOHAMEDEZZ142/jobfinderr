import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { jobsFeed, postsFeed, search } from "./home.controller.js";
const router= Router();

router.get("/postsFeed", isAuthenticated, asyncHandler(postsFeed));
router.get("/jobsFeed", isAuthenticated, asyncHandler(jobsFeed));
router.get("/search", isAuthenticated, asyncHandler(search));
export default router;