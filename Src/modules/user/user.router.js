import { Router } from "express";
const router= Router();
import { acctivateAccount, logIn, resetPassword, sendForgetPassCode } from "./user.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";

router.post("/login",asyncHandler(logIn));
router.get("/confirmEmail/:activationCode", asyncHandler(acctivateAccount));
router.patch("/sendForgetPassCode",asyncHandler(sendForgetPassCode));
router.patch("/resetPassword",asyncHandler(resetPassword));
export default router;