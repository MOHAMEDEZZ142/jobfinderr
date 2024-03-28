import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { postReactsCount, reactPost, showAllReactOnPost, showMyAllReactdPost, unReactPost } from "./reaction.controller.js";
import { isValid } from "../../middleware/validation.js";
import { postReactsCountSchema, reactPostSchema, showAllReactOnPostSchema, unReactPostSchema } from "./reaction.validation.js";

const router= Router({mergeParams:true});

router.post("/reactPost",isAuthenticated, isValid(reactPostSchema),asyncHandler(reactPost));
router.get("/showAllReactOnPost",isAuthenticated, isValid(showAllReactOnPostSchema),asyncHandler(showAllReactOnPost));
router.get("/showMyAllReactdPost",isAuthenticated, asyncHandler(showMyAllReactdPost));
router.delete("/unReactPost", isAuthenticated, isValid(unReactPostSchema),asyncHandler(unReactPost));
router.get("/postReactsCount", isAuthenticated, isValid(postReactsCountSchema),asyncHandler(postReactsCount));

export default router;