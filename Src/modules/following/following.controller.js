import { Op, where } from "sequelize";
import { Following } from "../../../DB/models/following.model.js"
import { superUser } from "../../../DB/models/superUser.model.js";

export const follow= async (req, res, next)=>{
    const{followedId}= req.params;
    const followedUser= await superUser.findOne(
        {where:{[Op.and]: [{id:followedId}, {id:{[Op.not]:req.user.id}}]}});
    if(!followedUser){return next(new Error("user not found"))};
    const isFollowed= await Following.findOne({where:{followedId, followerId:req.user.id}});
    if(isFollowed){return next(new Error("Alredy Followed"))};
    const follows= await Following.create({followerId:req.user.id, followedId});
    return res.json({success: true, message: "Followed successfuly"});
};

export const myFollowers= async(req, res, next)=>{
    const followed= await Following.findAll(
        {where:{followedId:req.user.id}});
    const followers= followed.map( obj => obj.followerId);
    const followersList= await superUser.findAll({
        where:{id:followers},
        attributes:["userName"]
    })
    return res.json({success: true, followersList});
};

export const myFollowing= async(req, res, next)=>{
    const follower= await Following.findAll(
        {where:{followerId:req.user.id}});
    const following= follower.map( obj => obj.followedId);
    const followingList= await superUser.findAll({
        where:{id:following},
        attributes:["userName"]
    })
    return res.json({success: true, followingList});
};

export const unFollow= async(req, res, next)=>{
    const unFollowing= await Following.findOne({where:{followerId:req.user.id , followedId: req.params.id}});
    if(!unFollowing){return next(new Error("user not found"))};
    await unFollowing.destroy();
    return res.json({success: true, message: "Unfollowed"});
};

export const removeFollow= async(req, res, next)=>{
    const unFollowing= await Following.findOne({where:{followedId:req.user.id , followerId: req.params.id}});
    if(!unFollowing){return next(new Error("user not found"))};
    await unFollowing.destroy();
    return res.json({success: true, message: "Follow deleted successfully"});
};

export const followerCount =async (req, res, next)=>{
    const followers = await Following.findAll({where:{followedId:req.params.followedId}});
    const followersCount = followers.length;
    return res.json({success:true, followersCount})
};

export const followingCount =async (req, res, next)=>{
    const following = await Following.findAll({where:{followerId:req.params.followerId}});
    const followingCount = following.length;
    return res.json({success:true, followingCount})
};