import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { jobSavesCount, saveJob, showMyAllSavedJobs, unSaveJob } from "./savedJob.controller.js";
import { isValid } from "../../middleware/validation.js";
import { jobSavesCountSchema, saveJobSchema, unSaveJobSchema } from "./savedJob.validation.js";

const router= Router({mergeParams:true});

router.post("/saveJob",isAuthenticated, isValid(saveJobSchema),asyncHandler(saveJob));
router.get("/showMyAllSavedJob",isAuthenticated, asyncHandler(showMyAllSavedJobs));
router.delete("/unSaveJob", isAuthenticated, isValid(unSaveJobSchema),asyncHandler(unSaveJob));
router.get("/jobSavesCount", isAuthenticated, isValid(jobSavesCountSchema),asyncHandler(jobSavesCount));

export default router;