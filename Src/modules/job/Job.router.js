import { Router } from "express";
import { addJob, deleteJob, deleteMyAllJobs, myAllJobs } from "./Job.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import SavedJobRouter from "../savedJob/savedJob.router.js";
import SharedJobRouter from "../shareJob/sharedJob.router.js";
import applyRouter from "../application/application.router.js";
import { isAuthenticatedCompany } from "../../middleware/isAuthenticatedCompany.js";
import { isValid } from "../../middleware/validation.js";
import { addJobSchema, deleteJobSchema } from "./job.validation.js";
const router= Router();

router.use("/:jobId/savedJob", SavedJobRouter);
router.use("/:jobId/sharedJob", SharedJobRouter);
router.use("/:jobId/applyJob", applyRouter);

router.post("/add",isAuthenticatedCompany,isValid(addJobSchema),asyncHandler(addJob));
router.get("/myAlljobs",isAuthenticatedCompany,asyncHandler(myAllJobs));
router.delete("/delete/:id",isAuthenticatedCompany,isValid(deleteJobSchema), asyncHandler(deleteJob));
router.delete("/deleteMyAlljobs",isAuthenticatedCompany, asyncHandler(deleteMyAllJobs));

export default router;