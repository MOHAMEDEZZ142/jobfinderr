import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { ShareJob, jobSharesCount, showAllSharedJobs, unShareJob } from "./sharedJob.controller.js";

const router= Router({mergeParams:true});

router.post("/shareJob",isAuthenticated, asyncHandler(ShareJob));
router.get("/allSharedJobs", isAuthenticated, asyncHandler(showAllSharedJobs));
router.delete("/unShareJob", isAuthenticated, asyncHandler(unShareJob));
router.get("/jobSharesCount", isAuthenticated, asyncHandler(jobSharesCount));
export default router;