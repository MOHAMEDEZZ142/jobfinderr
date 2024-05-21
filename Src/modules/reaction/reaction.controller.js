import { Comment } from "../../../DB/models/comment.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Reaction } from "../../../DB/models/reaction.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const reactPost= async (req, res, next)=>{
    const post = await Post.findOne({where:{id: req.body.postId}});
    if(!post){return next(new Error("Post not found"))};
    const react = await Reaction.create({postId:post.id, superuserId: req.user.id});
    notify({type:"react", senderId:req.user.id, to: post.superuserId, postId:post.id, 
        content:`${req.user.userName} just reacted on your post`})
    return res.json({success: true, react});
};

export const showAllReactOnPost = async (req, res, next)=>{
    const post = await Post.findOne({where:{id: req.body.postId}});
    if(!post){return next(new Error("Post not found"))};
    const react = await Reaction.findAll(
        {where:{postId: post.id},attributes:["createdAt","superuserId"],});
    const reactionCount = react.length;
    return res.json({success: true, react, reactionCount});
};

export const showMyAllReactdPost = async (req, res, next)=>{
    const ReactdPosts = await Reaction.findAll({
        where:{superuserId: req.user.id},
        attributes:["createdAt"],
        include:[
            {model:Post, attributes:["createdAt"],
            include:[
                {model: Publishment, attributes:["content"]},
                {model: superUser, attributes:["userName"]},
                {model: Comment, attributes: ["createdAt","content"], include:[{model: superUser, attributes: ["userName"]}]}
            ]
        },
            ]
    });
    return res.json({success: true, ReactdPosts});
};

export const unReactPost = async (req, res, next)=>{
    const react= await Reaction.findOne({where:{postId: req.body.postId, superuserId:req.user.id}});
    if(!react){return next(new Error("Something wrong"))}
    if(req.user.id !== react.superuserId){return res.json({success: false, message: "Not Authorized"})};
    await react.destroy();
    return res.json({success:true, message: "deleted"});
};

export const postReactsCount =async (req, res, next)=>{
    const react = await Reaction.findAll({where:{postId:req.body.postId}});
    const reactsCount = react.length;
    return res.json({success:true, reactsCount});
};