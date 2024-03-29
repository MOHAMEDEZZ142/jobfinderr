import { Router } from "express";
import { deleteCV, signUp, uploadCV } from "./seeker.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isValid } from "../../middleware/validation.js";
import { seekerSignUpSchema } from "./seeker.validation.js";
import { isAuthenticatedSeeker } from "../../middleware/isAuthenticatedSeeker.js";
import { uploadCloud } from "../../utels/multerCloud.js";
const router= Router();

router.post("/signup",isValid(seekerSignUpSchema),asyncHandler(signUp));
router.post("/uploadCV",isAuthenticatedSeeker,uploadCloud().single("cv") ,asyncHandler(uploadCV));
router.post("/deleteCV",isAuthenticatedSeeker,asyncHandler(deleteCV));

export default router;