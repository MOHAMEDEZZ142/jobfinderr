import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { myNotification } from "./notification.controller.js";
const router= Router();
router.get("/myNotification",isAuthenticated,asyncHandler(myNotification));
export default router;