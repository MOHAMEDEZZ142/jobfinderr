import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { PostSharesCount, SharePost, showAllSharedPosts, unShare } from "./share.controller.js";

const router= Router({mergeParams:true});

router.post("/sharePost",isAuthenticated, asyncHandler(SharePost));
router.get("/allSharedPosts", isAuthenticated, asyncHandler(showAllSharedPosts));
router.delete("/unShare/:id", isAuthenticated, asyncHandler(unShare));
router.get("/PostSharesCount", isAuthenticated, asyncHandler(PostSharesCount));
export default router;