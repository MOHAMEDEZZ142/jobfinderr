import { sequelize } from "../../../DB/connection.js";
import { Comment } from "../../../DB/models/comment.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const addPost = async (req, res, next)=>{
    const {id} = req.user;
    const post = await Post.create(
        {superuserId:id, 
        publishment: { content:req.body.content }},{ include: [Publishment, superUser] });
    return res.json({success: true, post});
};

export const deletePost= async(req, res, next)=>{
    const post= await Post.findOne({where:{id: req.params.id}});
    if(!post) return res.json({success: false, message: "Post not found"});
    if(req.user.id !== post.superuserId){return res.json({success: false, message: "Not Authorized"})};
    await post.destroy({where:{id: req.params.id}});
    await Publishment.destroy({where:{id: post.publishmentId}});
    return res.json({success: true, message:" Post Deleted successfuly"});
};

export const deleteMyAllPosts= async(req, res, next)=>{
    const posts= await Post.findAll({where:{superuserId:req.user.id}});
    if (posts.length === 0) {return next(new Error("You have't posts"));};
    for(const post of posts){
        const publishments= await Publishment.findAll({where:{id: post.publishmentId}});
        for(const publishment of publishments){
            await publishment.destroy();
        };
        await post.destroy();
    };
    return res.json({success: true, message:"Post Deleted successfuly"});
};

export const myAllPosts = async(req, res, next)=>{
    const posts= await Post.findAll({
        where:{superuserId:req.user.id},
        attributes:["createdAt"], 
        include: [
            {model: superUser, attributes:["userName"]},
            {model: Publishment, attributes:["content"]},
            {model: Comment, 
                attributes: ["createdAt","content",],
            include:[{model: superUser, attributes: ["userName"]}],
        },
        ]
    });
return res.json({ success: true, posts});
};