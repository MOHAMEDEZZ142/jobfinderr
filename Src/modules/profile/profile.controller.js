import { Company } from "../../../DB/models/company.model.js";
import { Following } from "../../../DB/models/following.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Reaction } from "../../../DB/models/reaction.model.js";
import { Seeker } from "../../../DB/models/seeker.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const othersSeekerProfile= async(req, res, next)=>{
    const {seekerId}= req.body;
    //data
    const userInfo= await Seeker.findOne({where:{id:seekerId},include: [{model: superUser}]});
    //user
    const user= await superUser.findOne({where:{id:userInfo.superuserId}})
    //posts
    const userPosts= await Post.findAll({
        where:{superuserId:user.id}, 
        include: [
            {model: superUser},
            {model: Publishment},
            {model: Reaction},
            {model: Comment,
            include:[{model: superUser}],},
            ],
            order: [['createdAt', 'DESC']]
    });
    //followers
    const followed= await Following.findAll({where:{followedId:user.id}});
    const followers= followed.map( obj => obj.followerId);
    const userFollowersList= await superUser.findAll({where:{id:followers}})
    //following
    const follower= await Following.findAll({where:{followerId:user.id}});
    const following= follower.map( obj => obj.followedId);
    const userFollowingList= await superUser.findAll({where:{id:following}})
    return res.json({ success: true, results:{userInfo, userPosts, userFollowersList, userFollowingList} });
};

export const othersCompanyProfile= async(req, res, next)=>{
    const {companyId}= req.body;
    //data
    const userInfo= await Company.findOne({where:{id:companyId},include: [{model: superUser}]});
    //user
    const user= await superUser.findOne({where:{id:userInfo.superuserId}})
    //posts
    const userPosts= await Post.findAll({
        where:{superuserId:user.id}, 
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
    const userJobs= await Job.findAll({
        where:{companyId},
        include: [
            {model: Company , include:[{model:superUser}]},
            {model: Publishment},
        ]
    });
    //followers
    const followed= await Following.findAll({where:{followedId:user.id}});
    const followers= followed.map( obj => obj.followerId);
    const userFollowersList= await superUser.findAll({where:{id:followers}})
    //following
    const follower= await Following.findAll({where:{followerId:user.id}});
    const following= follower.map( obj => obj.followedId);
    const userFollowingList= await superUser.findAll({where:{id:following}})
    return res.json({ success: true, results:{userInfo, userPosts, userJobs,userFollowersList, userFollowingList} });
};
