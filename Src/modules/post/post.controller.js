import { Comment } from "../../../DB/models/comment.model.js";
import { Following } from "../../../DB/models/following.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";
import { notify } from "../../utels/notify.js";

export const addPost = async (req, res, next)=>{
    const {id} = req.user;
    const post = await Post.create(
        {superuserId:id, 
        publishment: { content:req.body.content }},{ include: [Publishment, superUser] });
        const receiverIds= await Following.findAll({
            where:{followedId:req.user.id}
        });
        const receiverIdArray = receiverIds.map(item => item.followerId);
        notify({type:"sharePost", senderId:req.user.id, to: receiverIdArray, postId:post.id, 
            content:`${req.user.userName} just share a post`})
    return res.json({success: true, post});
};

export const deletePost= async(req, res, next)=>{
    const post= await Post.findOne({where:{id: req.body.id}});
    if(!post) return res.json({success: false, message: "Post not found"});
    if(req.user.id !== post.superuserId){return res.json({success: false, message: "Not Authorized"})};
    await post.destroy({where:{id:post.id}});
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

export const othersAllPosts = async(req, res, next)=>{
    const posts= await Post.findAll({
        where:{superuserId:req.body.id}, 
        include: [
            {model: superUser},
            {model: Publishment,},
            {model: Comment, 
            include:[{model: superUser}],
        },
        ]
    });
return res.json({ success: true, posts});
};