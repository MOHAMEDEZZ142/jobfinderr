import { Router } from "express";
import { addPost, deleteMyAllPosts, deletePost, myAllPosts } from "./post.controller.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import SavedPostRouter from "../savedPost/savedPost.router.js";
import SharePostRouter from "../share/share.router.js";
import SavedJobRouter from "../savedJob/savedJob.router.js";
import ShareJobRouter from "../shareJob/sharedJob.router.js";
import commentRouter from "../comment/comment.router.js";
import reactionRouter from "../reaction/reaction.router.js"
import { isValid } from "../../middleware/validation.js";
import { addPostSchema } from "./post.validation.js";

const router = Router();

router.use("/:postId/savedPost", SavedPostRouter);
router.use("/:postId/sharedPost",SharePostRouter );
router.use("/:postId/savedJob", SavedJobRouter);
router.use("/:postId/sharedJob",ShareJobRouter );
router.use("/:postId/comment", commentRouter);
router.use("/:postId/react", reactionRouter);

router.post("/add", isAuthenticated,isValid(addPostSchema) ,asyncHandler(addPost));
router.get("/myAllPosts",isAuthenticated,asyncHandler(myAllPosts));
router.delete("/delete/:id",isAuthenticated, asyncHandler(deletePost));
router.delete("/deleteMyAllPosts",isAuthenticated, asyncHandler(deleteMyAllPosts));
export default router;