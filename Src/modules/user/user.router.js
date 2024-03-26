import { Router } from "express";
const router= Router();
import { acctivateAccount, logIn, resetPassword, sendForgetPassCode, update } from "./user.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

router.post("/login",asyncHandler(logIn));
router.get("/confirmEmail/:activationCode", asyncHandler(acctivateAccount));
router.patch("/sendForgetPassCode",asyncHandler(sendForgetPassCode));
router.patch("/resetPassword",asyncHandler(resetPassword));
router.patch("/update",isAuthenticated,asyncHandler(update));
export default router;