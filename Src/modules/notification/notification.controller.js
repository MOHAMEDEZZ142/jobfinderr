import { Job } from "../../../DB/models/Job.model.js";
import { Comment } from "../../../DB/models/comment.model.js";
import { Company } from "../../../DB/models/company.model.js";
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
            {model: Post, 
                include:[
                {model: superUser},
                {model: Publishment, attributes:["content"]},
                {model: Comment, 
                include:[{model: superUser,}],
            },
                {model:Reaction}
            ]},
            {model: Job,
                include: [
                {model: Company, include:[{model:superUser}]},
                {model: Publishment, attributes:["content"]},
            ],},
            {model: Reaction},
            {model: Comment},
        ]
    })
    return res.json({success: true, notification});
}