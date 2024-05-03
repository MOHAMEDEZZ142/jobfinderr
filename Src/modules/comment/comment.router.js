import { Router } from "express";
import { addComment, deleteAllPostComments, deleteComment, deleteOthersComments, myAllComments, postAllComments, postCommentsCount,  } from "./comment.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { asyncHandler } from "../../utels/asynHandler.js";
import { isValid } from "../../middleware/validation.js";
import { addCommentSchema, deleteAllPostCommentsSchema, deleteCommentSchema, deleteOthersCommentsSchema, myAllCommentsSchema, postAllCommentsSchema, postCommentsCountSchema } from "./comment.validation.js";

const router = Router({mergeParams:true});

router.post("/addComment",isAuthenticated,isValid(addCommentSchema) ,asyncHandler(addComment));
router.delete("/deleteComment/:id",isAuthenticated,isValid(deleteCommentSchema) ,asyncHandler(deleteComment));
router.delete("/deleteOthersComments/:commentId",isAuthenticated,isValid(deleteOthersCommentsSchema) , asyncHandler(deleteOthersComments))
router.get("/myAllComments", isAuthenticated,isValid(myAllCommentsSchema) , asyncHandler(myAllComments));
router.get("/allComments", isAuthenticated,isValid(postAllCommentsSchema) , asyncHandler(postAllComments));
router.delete("/deleteAllPostComments", isAuthenticated,isValid(deleteAllPostCommentsSchema) , asyncHandler(deleteAllPostComments));
router.get("/postCommentsCount", isAuthenticated,isValid(postCommentsCountSchema) , asyncHandler(postCommentsCount));

export default router;