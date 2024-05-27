import { Router } from "express";
import { addPost, deletePost } from "./post.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { isValid } from "../../middleware/validation.js";
import { addPostSchema } from "./post.validation.js";

const router = Router();

router.post("/add", isAuthenticated,isValid(addPostSchema) ,asyncHandler(addPost));
router.delete("/delete",isAuthenticated, asyncHandler(deletePost));
export default router;