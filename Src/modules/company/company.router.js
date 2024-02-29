import { Router } from "express";
import { signUp } from "./company.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
const router= Router();
router.post("/signUp",asyncHandler(signUp));

export default router;