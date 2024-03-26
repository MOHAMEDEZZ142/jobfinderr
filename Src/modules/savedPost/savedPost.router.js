import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { PostSavesCount, savePost, showMyAllSavedPosts, unSavePost } from "./savedPost.controller.js";

const router= Router({mergeParams:true});

router.post("/savePost",isAuthenticated, asyncHandler(savePost));
router.get("/showMyAllSaveddPost",isAuthenticated, asyncHandler(showMyAllSavedPosts));
router.delete("/unSavePost/:id", isAuthenticated, asyncHandler(unSavePost));
router.get("/PostSavesCount", isAuthenticated, asyncHandler(PostSavesCount));
export default router;