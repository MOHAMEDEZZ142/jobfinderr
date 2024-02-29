import { Router } from "express";
import { addJob, deleteJob, deleteMyAllJobs, myAllJobs } from "./Job.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
// import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { isAuthenticatedCompany } from "../../middleware/isAuthenticatedCompany.js";
const router= Router();
router.post("/add",isAuthenticatedCompany,asyncHandler(addJob));
router.get("/myAlljobs",isAuthenticatedCompany,asyncHandler(myAllJobs));
router.delete("/delete/:id",isAuthenticatedCompany, asyncHandler(deleteJob));
router.delete("/deleteMyAlljobs",isAuthenticatedCompany, asyncHandler(deleteMyAllJobs));

export default router;