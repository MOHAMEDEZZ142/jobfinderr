import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { othersCompanyProfile, othersSeekerProfile } from "./profile.controller.js";
import { isValid } from "../../middleware/validation.js";
import { othersCompanyProfileSchema, othersSeekerProfileSchema } from "./profile.validation.js";

const router = Router();
router.get("/othersSeekerProfile",isAuthenticated,isValid(othersSeekerProfileSchema), asyncHandler(othersSeekerProfile));
router.get("/othersCompanyProfile",isAuthenticated, isValid(othersCompanyProfileSchema), asyncHandler(othersCompanyProfile));

export default router;