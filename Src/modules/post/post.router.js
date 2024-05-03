import { Router } from "express";
import { addPost, deleteMyAllPosts, deletePost, myAllPosts } from "./post.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { isValid } from "../../middleware/validation.js";
import { addPostSchema } from "./post.validation.js";

const router = Router();

router.post("/add", isAuthenticated,isValid(addPostSchema) ,asyncHandler(addPost));
router.get("/myAllPosts",isAuthenticated,asyncHandler(myAllPosts));
router.delete("/delete",isAuthenticated, asyncHandler(deletePost));
router.delete("/deleteMyAllPosts",isAuthenticated, asyncHandler(deleteMyAllPosts));
export default router;