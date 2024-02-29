import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { reactPost, showAllReactOnPost, showMyAllReactdPost } from "./reaction.controller.js";

const router= Router({mergeParams:true});

router.post("/reactPost",isAuthenticated, asyncHandler(reactPost));
router.get("/showAllReactOnPost",isAuthenticated, asyncHandler(showAllReactOnPost));
router.get("/showMyAllReactdPost",isAuthenticated, asyncHandler(showMyAllReactdPost));
export default router;