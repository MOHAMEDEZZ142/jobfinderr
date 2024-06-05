import { Router } from "express";
import { addDescription, signUp } from "./company.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isValid } from "../../middleware/validation.js";
import { addDescriptionSchema, companySignUpSchema } from "./company.validation.js";
import { isAuthenticatedCompany } from "../../middleware/isAuthenticatedCompany.js";
const router= Router();
router.post("/signUp",isValid(companySignUpSchema),asyncHandler(signUp));
router.post("/addDescription",isAuthenticatedCompany,isValid(addDescriptionSchema),asyncHandler(addDescription));
//company router
export default router;