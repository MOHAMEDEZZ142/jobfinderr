import { Op } from "sequelize";
import { Following } from "../../../DB/models/following.model.js"
import { superUser } from "../../../DB/models/superUser.model.js";

export const follow= async (req, res, next)=>{
    const{followedId}= req.params;
    const followedUser= await superUser.findOne({where:{[Op.and]: [{id:followedId}, {id:{[Op.not]:req.user.id}}]}}); // [Op.and]: [ { name: 'John' }, { age: 25 } ]
    if(!followedUser){return next(new Error("user not found"))};
    const follows= await Following.create({followerId:req.user.id, followedId});
    return res.json({success: true, message: "Followed successfuly"});
};

export const myFollowers= async(req, res, next)=>{
    const followers= await Following.findAll({where:{followedId:req.user.id}});
    return res.json({success: true, followers});
};
