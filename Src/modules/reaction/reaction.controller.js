import { Comment } from "../../../DB/models/comment.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Reaction } from "../../../DB/models/reaction.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const reactPost= async (req, res, next)=>{
    const post = await Post.findOne({where:{id: req.params.postId}});
    if(!post){return next(new Error("Post not found"))};
    const react = await Reaction.create({postId:req.params.postId, superuserId: req.user.id});
    return res.json({success: true, react});
};

export const showAllReactOnPost = async (req, res, next)=>{
    const post = await Post.findOne({where:{id: req.params.postId}});
    if(!post){return next(new Error("Post not found"))};
    const React = await Reaction.findAll(
        {where:{postId: req.params.postId},attributes:["createdAt","superuserId"],});
    return res.json({success: true, React});
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
    const post= await Reaction.findOne({where:{postId: req.params.id, superuserId:req.user.id}});
    if(!post){return next(new Error("Post not found"))}
    if(req.user.id !== post.superuserId){return res.json({success: false, message: "Not Authorized"})};
    await post.destroy();
};

export const postReactsCount =async (req, res, next)=>{
    const react = await Reaction.findAll({where:{postId:req.params.postId}});
    const reactsCount = react.length;
    return res.json({success:true, reactsCount});
};