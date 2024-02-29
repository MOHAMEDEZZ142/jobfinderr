import { Router } from "express";
import { signUp } from "./seeker.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
const router= Router();
router.post("/signup",asyncHandler(signUp));

export default router;