import { Router } from "express";
const router= Router();
import { acctivateAccount, logIn, resetPassword, sendForgetPassCode, update, uploadProfilePic } from "./user.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { uploadCloud } from "../../utels/multerCloud.js";

router.post("/login",asyncHandler(logIn));
router.get("/confirmEmail/:activationCode", asyncHandler(acctivateAccount));
router.patch("/sendForgetPassCode",asyncHandler(sendForgetPassCode));
router.patch("/resetPassword",asyncHandler(resetPassword));
router.patch("/update",isAuthenticated,asyncHandler(update));
router.post("/profilePic",isAuthenticated,uploadCloud().single("pp") ,uploadProfilePic)

export default router;