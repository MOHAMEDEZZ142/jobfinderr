import { Comment } from "../../../DB/models/comment.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";
import { notify } from "../../utels/notify.js";

export const addComment = async (req, res, next)=>{
    const post= await Post.findOne({where:{id:req.body.postId}});
    if(!post){return next(new Error("Post not found"))};
    const comment = await Comment.create({
        content: req.body.content,
        postId: post.id,
        superuserId: req.user.id});
    notify({type:"comment", senderId:req.user.id, to: post.superuserId, postId:post.id, commentId:comment.id,  
        content:`${req.user.userName} just commented on your post`})
    return res.json({success: true, comment});
};

export const myAllComments = async (req, res, next)=>{
    const comments = await Comment.findAll({
        where:{superuserId:req.user.id},
        attributes:["createdAt","content"],
        include: [
            {model: superUser, attributes:["userName"]},
            {model: Post, attributes:["createdAt"], 
            include:[
                {model:Publishment , attributes: ["content"]}, 
                {model: superUser, attributes: ["userName"]}]}
            ]
    });
    return comments ? res.json({success: true, comments}): next(new Error("You have no comments"));
};

export const postAllComments = async (req, res, next)=>{
    const comments = await Comment.findAll({
        where:{postId:req.body.postId},
        include: [
            {model: superUser, attributes:["userName"]},
            ]
    });
    return comments ? res.json({success: true, comments}): next(new Error("There are no comments"));
};

export const deleteComment= async(req, res, next)=>{
    const comment= await Comment.findOne({where:{id:req.body.id}});
    if(!comment) {return next(new Error("Comment not found"))};
    if(req.user.id !== comment.superuserId){return next(new Error("Not Authourized"))};
    await comment.destroy({where:{id:req.body.id}});
    return res.json({success: true, message:"Comment Deleted successfuly"});
};

export const deleteOthersComments= async (req, res, next)=>{
    const post = await Post.findOne({where:{id: req.body.postId}});
    if(!post){return next(new Error("Post not found"))};
    if(post.superuserId!== req.user.id){return next(new Error("Not Authorized"))};
    const comment= await Comment.findOne({where:{postId: req.body.postId, id:req.body.commentId}});
    if(!comment){return next(new Error("Not Found"))};
    await Comment.destroy({where:{id: comment.id}});
    return res.json({success:true, message:"Comment Deleted Successfully"});
};

export const deleteAllPostComments= async (req, res, next)=>{
    const post = await Post.findOne({where:{id: req.body.postId}});
    if(!post){return next(new Error("Post not found"))};
    if(post.superuserId!== req.user.id){return next(new Error("Not Authorized"))};
    await Comment.destroy({where:{postId: post.id}});
    return res.json({success:true, message:"Comments Deleted Successfully"});
};

export const postCommentsCount =async (req, res, next)=>{
    const comment = await Comment.findAll({where:{postId:req.body.postId}});
    const commentsCount = comment.length;
    return res.json({success:true, commentsCount})
};