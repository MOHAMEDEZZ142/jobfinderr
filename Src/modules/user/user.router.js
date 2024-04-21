import { Router } from "express";
const router= Router();
import { acctivateAccount, allCompanyData, allSeekerData, deleteProfilePic, logIn, resetPassword, sendForgetPassCode, update, uploadProfilePic } from "./user.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { uploadCloud } from "../../utels/multerCloud.js";
import { isValid } from "../../middleware/validation.js";
import { resetPasswordSchema, sendForgetPassCodeSchema, updateSchema } from "./user.validation.js";
import { isAuthenticatedSeeker } from "../../middleware/isAuthenticatedSeeker.js";
import { isAuthenticatedCompany } from "../../middleware/isAuthenticatedCompany.js";

router.post("/login",
// isValid(loginSchema),
asyncHandler(logIn));
router.get("/confirmEmail/:activationCode", asyncHandler(acctivateAccount));
router.patch("/sendForgetPassCode",isValid(sendForgetPassCodeSchema),asyncHandler(sendForgetPassCode));
router.patch("/resetPassword",isValid(resetPasswordSchema),asyncHandler(resetPassword));
router.patch("/update",isAuthenticated,isValid(updateSchema),asyncHandler(update));
router.post("/profilePic",isAuthenticated,uploadCloud().single("pp") ,uploadProfilePic)
router.post("/deleteProfilePic",isAuthenticated,asyncHandler(deleteProfilePic));
router.get("/allSeekerData", isAuthenticatedSeeker, asyncHandler(allSeekerData));
router.get("/allCompanyData", isAuthenticatedCompany, asyncHandler(allCompanyData));

export default router;