import { Router } from "express";
import { signUp } from "./seeker.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isValid } from "../../middleware/validation.js";
import { seekerSignUpSchema } from "./seeker.validation.js";
const router= Router();

router.post("/signup",isValid(seekerSignUpSchema),asyncHandler(signUp));

export default router;