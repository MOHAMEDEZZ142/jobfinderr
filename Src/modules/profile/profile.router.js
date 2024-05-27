import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { othersProfile } from "./profile.controller.js";
import { isValid } from "../../middleware/validation.js";
import { othersProfileSchema } from "./profile.validation.js";

const router = Router();
router.get("/othersProfile",isAuthenticated,isValid(othersProfileSchema), asyncHandler(othersProfile));

export default router;