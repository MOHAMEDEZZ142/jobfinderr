import { Job } from "../../../DB/models/Job.model.js";
import { Comment } from "../../../DB/models/comment.model.js";
import { Notification } from "../../../DB/models/notification.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Reaction } from "../../../DB/models/reaction.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const myNotification= async(req, res, next)=>{
    const notification= await Notification.findAll({
        where:{receiverId:req.user.id},
        include:[
            {
            model: superUser,
            as: "sender",
            },
            {model: Post, include :[{model:Publishment}]},
            {model: Job},
            {model: Reaction},
            {model: Comment},
        ]
    })
    return res.json({success: true, notification});
}