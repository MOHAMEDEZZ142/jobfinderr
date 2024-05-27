import { Router } from "express";
import { addJob, deleteJob } from "./Job.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isAuthenticatedCompany } from "../../middleware/isAuthenticatedCompany.js";
import { isValid } from "../../middleware/validation.js";
import { addJobSchema, deleteJobSchema } from "./job.validation.js";
const router= Router();

router.post("/add",isAuthenticatedCompany,isValid(addJobSchema),asyncHandler(addJob));
router.delete("/delete",isAuthenticatedCompany,isValid(deleteJobSchema), asyncHandler(deleteJob));

export default router;