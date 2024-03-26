import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { postReactsCount, reactPost, showAllReactOnPost, showMyAllReactdPost, unReactPost } from "./reaction.controller.js";

const router= Router({mergeParams:true});

router.post("/reactPost",isAuthenticated, asyncHandler(reactPost));
router.get("/showAllReactOnPost",isAuthenticated, asyncHandler(showAllReactOnPost));
router.get("/showMyAllReactdPost",isAuthenticated, asyncHandler(showMyAllReactdPost));
router.delete("/unReactPost", isAuthenticated, asyncHandler(unReactPost));
router.get("/postReactsCount", isAuthenticated, asyncHandler(postReactsCount));

export default router;