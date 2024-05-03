import { Comment } from "../../../DB/models/comment.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Reaction } from "../../../DB/models/reaction.model.js";
import { Shared } from "../../../DB/models/share.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const SharePost= async (req, res, next)=>{
    const share = await Shared.create({postId:req.body.postId, superuserId: req.user.id});
    return res.json({success: true, share});
};

export const showAllSharedPosts = async (req, res, next)=>{
    const sharedPosts = await Shared.findAll(
        {where:{superuserId: req.user.id},
        attributes:["createdAt"],
        include:[
        {model:Post, attributes:["createdAt"],
        include:[
            {model: Publishment, attributes:["content"]},
            {model: superUser, attributes:["userName"]},
            {model: Comment, attributes: ["createdAt"], include:[{model: superUser, attributes: ["userName"]},{model: Publishment, attributes: ["content"]}]},
            {model:Reaction}
        ]
    },
    {model: superUser, attributes:["userName"]}
        ]
    });
    return res.json({success: true, sharedPosts});
};

export const unShare = async (req, res, next)=>{
    const shared= await Shared.findOne({where:{id: req.params.id}});
    if(!shared){return next(new Error("Post not found"))}
    if(req.user.id !== shared.superuserId){return res.json({success: false, message: "Not Authorized"})};
    await shared.destroy();
};

export const PostSharesCount =async (req, res, next)=>{
    const sareddPost = await Shared.findAll({where:{postId:req.params.postId}});
    const sharesCount = sareddPost.length;
    return res.json({success:true, sharesCount})
};