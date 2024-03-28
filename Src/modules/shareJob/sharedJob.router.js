import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { ShareJob, jobSharesCount, showAllSharedJobs, unShareJob } from "./sharedJob.controller.js";
import { isValid } from "../../middleware/validation.js";
import { ShareJobSchema, jobSharesCountSchema, unShareJobSchema } from "./shareJob.validation.js";

const router= Router({mergeParams:true});

router.post("/shareJob",isAuthenticated, isValid(ShareJobSchema),asyncHandler(ShareJob));
router.get("/allSharedJobs", isAuthenticated, asyncHandler(showAllSharedJobs));
router.delete("/unShareJob", isAuthenticated, isValid(unShareJobSchema),asyncHandler(unShareJob));
router.get("/jobSharesCount", isAuthenticated, isValid(jobSharesCountSchema),asyncHandler(jobSharesCount));
export default router;