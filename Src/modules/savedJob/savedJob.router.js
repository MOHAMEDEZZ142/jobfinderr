import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { jobSavesCount, saveJob, showMyAllSavedJobs, unSaveJob } from "./savedJob.controller.js";

const router= Router({mergeParams:true});

router.post("/saveJob",isAuthenticated, asyncHandler(saveJob));
router.get("/showMyAllSavedJob",isAuthenticated, asyncHandler(showMyAllSavedJobs));
router.delete("/unSaveJob", isAuthenticated, asyncHandler(unSaveJob));
router.get("/jobSavesCount", isAuthenticated, asyncHandler(jobSavesCount));

export default router;