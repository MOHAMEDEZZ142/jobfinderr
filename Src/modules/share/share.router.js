import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { PostSharesCount, SharePost, showAllSharedPosts, unShare } from "./share.controller.js";
import { isValid } from "../../middleware/validation.js";
import { PostSharesCountSchema, SharePostSchema, unShareSchema } from "./share.validation.js";

const router= Router({mergeParams:true});

router.post("/sharePost",isAuthenticated, isValid(SharePostSchema),asyncHandler(SharePost));
router.get("/allSharedPosts", isAuthenticated, asyncHandler(showAllSharedPosts));
router.delete("/unShare/:id", isAuthenticated, isValid(unShareSchema),asyncHandler(unShare));
router.get("/PostSharesCount", isAuthenticated, isValid(PostSharesCountSchema),asyncHandler(PostSharesCount));
export default router;