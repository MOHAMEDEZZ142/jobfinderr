import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { Share, showAllShared } from "./share.controller.js";

const router= Router({mergeParams:true});

router.post("/",isAuthenticated, asyncHandler(Share));
router.get("/allShared", isAuthenticated, asyncHandler(showAllShared));
export default router;