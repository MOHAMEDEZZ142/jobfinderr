import { Router } from "express";
import { addComment, deleteAllPostComments, deleteComment, deleteOthersComments, myAllComments, postAllComments,  } from "./comment.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";

const router = Router({mergeParams:true});

//router.use("/:postId/comment", commentRouter);
router.post("/addComment",isAuthenticated ,asyncHandler(addComment));
router.delete("/deleteComment/:id",isAuthenticated,asyncHandler(deleteComment));
router.delete("/deleteOthersComments/:commentId", isAuthenticated, asyncHandler(deleteOthersComments))
router.get("/myAllComments", isAuthenticated, asyncHandler(myAllComments));
router.get("/allComments", isAuthenticated, asyncHandler(postAllComments));
router.delete("/deleteAllPostComments", isAuthenticated, asyncHandler(deleteAllPostComments));
// router.get("/postCommentsCount", isAuthenticated, asyncHandler(postCommentsCount));

export default router;