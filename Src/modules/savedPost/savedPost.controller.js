import { Comment } from "../../../DB/models/comment.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Saved } from "../../../DB/models/savedPost.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const savePost= async (req, res, next)=>{
    const post = await Post.findOne({where:{id: req.body.postId}});
    if(!post){return next(new Error("Post not found"))};
    const save = await Saved.create({postId:post.id, superuserId: req.user.id});
    return res.json({success: true, save});
};

export const showMyAllSavedPosts = async (req, res, next)=>{
    const savedPosts = await Saved.findAll({
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
    return res.json({success: true, savedPosts});
};

export const unSavePost = async (req, res, next)=>{
    const post= await Saved.findOne({where:{postId: req.body.postId, superuserId:req.user.id}});
    if(!post){return next(new Error("Post not found"))}
    if(req.user.id !== post.superuserId){return res.json({success: false, message: "Not Authorized"})};
    await post.destroy();
    return res.json({success: true, message: "deleted successfully"})
};

export const PostSavesCount =async (req, res, next)=>{
    const savedPost = await Saved.findAll({where:{postId:req.body.postId}});
    const savesCount = savedPost.length;
    return res.json({success:true, savesCount})
};