import { Router } from "express";
import { asyncHandler } from "../../utels/asynHandler.js";
import { AllSeekerApplications, AlljobApplications, createApplication, deleteApplicationCompany, deleteApplicationSeeker, jobApplicationCount } from "./application.controller.js";
import { isAuthenticatedSeeker } from "../../middleware/isAuthenticatedSeeker.js";
import { isAuthenticatedCompany } from "../../middleware/isAuthenticatedCompany.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

const router= Router();
router.post("/createApplication",isAuthenticatedSeeker,asyncHandler(createApplication));
router.get("/AllJobApplications",isAuthenticatedCompany,asyncHandler(AlljobApplications));
router.get("/AllSeekerApplications",isAuthenticatedSeeker,asyncHandler(AllSeekerApplications));
router.delete("/deleteApplicationSeeker",isAuthenticatedSeeker,asyncHandler(deleteApplicationSeeker));
router.delete("/deleteApplicationCompany",isAuthenticatedCompany,asyncHandler(deleteApplicationCompany));
router.get("/jobApplicationCount", isAuthenticated, asyncHandler(jobApplicationCount));
export default router;