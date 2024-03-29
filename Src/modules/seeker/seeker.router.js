import { Router } from "express";
import { signUp, uploadCV } from "./seeker.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isValid } from "../../middleware/validation.js";
import { seekerSignUpSchema } from "./seeker.validation.js";
import { isAuthenticatedSeeker } from "../../middleware/isAuthenticatedSeeker.js";
const router= Router();

router.post("/signup",isValid(seekerSignUpSchema),asyncHandler(signUp));
router.post("/uploadCV",isAuthenticatedSeeker,uploadCloud().single("cv") ,asyncHandler(uploadCV));

export default router;