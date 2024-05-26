import { Op } from "sequelize";
import { Following } from "../../../DB/models/following.model.js"
import { superUser } from "../../../DB/models/superUser.model.js";
import { notify } from "../../utels/notify.js";

export const follow= async (req, res, next)=>{
    const{followedId}= req.body;
    const followedUser= await superUser.findOne(
        {where:{[Op.and]: [{id:followedId}, {id:{[Op.not]:req.user.id}}]}});
    if(!followedUser){return next(new Error("user not found"))};
    const isFollowed= await Following.findOne({where:{followedId, followerId:req.user.id}});
    if(isFollowed){return next(new Error("Alredy Followed"))};
    const follows= await Following.create({followerId:req.user.id, followedId});
    notify({type:"follow", senderId:req.user.id, to: followedId, 
        content:`${req.user.userName} just followed you`})
    return res.json({success: true, message: "Followed successfuly"});
};

export const myFollowers= async(req, res, next)=>{
    const followed= await Following.findAll(
        {where:{followedId:req.user.id}});
    const followers= followed.map( obj => obj.followerId);
    const followersList= await superUser.findAll({
        where:{id:followers},
    })
    return res.json({success: true, followersList});
};

export const myFollowing= async(req, res, next)=>{
    const follower= await Following.findAll(
        {where:{followerId:req.user.id}});
    const following= follower.map( obj => obj.followedId);
    const followingList= await superUser.findAll({
        where:{id:following},
    })
    return res.json({success: true, followingList});
};

export const unFollow= async(req, res, next)=>{
    const unFollowing= await Following.findOne({where:{followerId:req.user.id , followedId: req.body.followedId}});
    if(!unFollowing){return next(new Error("user not found"))};
    await unFollowing.destroy();
    notify({type:"unfollow", senderId:req.user.id, to: req.body.followedId, 
        content:`${req.user.userName} just unfollowed you`})
    return res.json({success: true, message: "Unfollowed"});
};

export const removeFollow= async(req, res, next)=>{
    const unFollowing= await Following.findOne({where:{followedId:req.user.id , followerId: req.body.followerId}});
    if(!unFollowing){return next(new Error("user not found"))};
    await unFollowing.destroy();
    notify({type:"removeFollower", senderId:req.user.id, to: req.body.followerId, 
        content:`${req.user.userName} just removed you from his followers`})
    return res.json({success: true, message: "Follow deleted successfully"});
};

export const followerCount =async (req, res, next)=>{
    const followers = await Following.findAll({where:{followedId:req.body.followedId}});
    const followersCount = followers.length;
    return res.json({success:true, followersCount})
};

export const followingCount =async (req, res, next)=>{
    const following = await Following.findAll({where:{followerId:req.body.followerId}});
    const followingCount = following.length;
    return res.json({success:true, followingCount})
};