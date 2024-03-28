import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { PostSavesCount, savePost, showMyAllSavedPosts, unSavePost } from "./savedPost.controller.js";
import { isValid } from "../../middleware/validation.js";
import { PostSavesCountSchema, savePostSchema, unSavePostSchema } from "./savedPost.validation.js";

const router= Router({mergeParams:true});

router.post("/savePost",isAuthenticated, isValid(savePostSchema),asyncHandler(savePost));
router.get("/showMyAllSaveddPost",isAuthenticated, asyncHandler(showMyAllSavedPosts));
router.delete("/unSavePost/:id", isAuthenticated, isValid(unSavePostSchema),asyncHandler(unSavePost));
router.get("/PostSavesCount", isAuthenticated, isValid(PostSavesCountSchema),asyncHandler(PostSavesCount));
export default router;