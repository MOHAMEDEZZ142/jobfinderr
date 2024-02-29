import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { savePost, showMyAllSavedPosts } from "./savedPost.controller.js";

const router= Router({mergeParams:true});

router.post("/savePost",isAuthenticated, asyncHandler(savePost));
router.get("/showMyAllReactdPost",isAuthenticated, asyncHandler(showMyAllSavedPosts));
export default router;