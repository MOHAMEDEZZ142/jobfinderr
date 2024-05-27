import { Job } from "../../../DB/models/Job.model.js";
import { Comment } from "../../../DB/models/comment.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Following } from "../../../DB/models/following.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Reaction } from "../../../DB/models/reaction.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const othersProfile= async(req, res, next)=>{
    const {id}= req.body;
    //user
    const userInfo= await superUser.findOne({where:{id}})
    //posts
    const userPosts= await Post.findAll({
        where:{superuserId:id}, 
        include: [
            {model: superUser},
            {model: Publishment},
            {model: Reaction},
            {model: Comment,
            include:[{model: superUser}],},
            ],
            order: [['createdAt', 'DESC']]
    });
    //jobs
    // const company= await Company.findOne({where:{superuserId:id}}) 
    // const userJobs= await Job.findAll({
    //     where:{companyId:company.id},
    //         include: [
    //             {model: Company , include:[{model:superUser}]},
    //             {model: Publishment},
    //         ]
    // });
    //followers
    const followed= await Following.findAll({where:{followedId:id}});
    const followers= followed.map( obj => obj.followerId);
    const userFollowersList= await superUser.findAll({where:{id:followers}})
    //following
    const follower= await Following.findAll({where:{followerId:user.id}});
    const following= follower.map( obj => obj.followedId);
    const userFollowingList= await superUser.findAll({where:{id:following}})
    return res.json({ success: true, results:{userInfo, userPosts,userFollowersList, userFollowingList} });
};
