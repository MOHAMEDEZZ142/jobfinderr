import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { othersCompanyProfile, othersSeekerProfile } from "./profile.controller.js";

const router = Router();
router.get("/othersSeekerProfile",isAuthenticated, asyncHandler(othersSeekerProfile));
router.get("/othersCompanyProfile",isAuthenticated, asyncHandler(othersCompanyProfile));

export default router;