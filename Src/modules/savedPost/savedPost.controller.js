import { Comment } from "../../../DB/models/comment.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Saved } from "../../../DB/models/savedPost.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const savePost= async (req, res, next)=>{
    const post = await Post.findOne({where:{id: req.params.postId}});
    if(!post){return next(new Error("Post not found"))};
    const save = await Saved.create({postId:req.params.postId, superuserId: req.user.id});
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