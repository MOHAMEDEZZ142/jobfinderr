import { Comment } from "../../../DB/models/comment.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Shared } from "../../../DB/models/share.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const Share= async (req, res, next)=>{
    const post = await Shared.create({publishmentId:req.params.publishmentId, superuserId: req.user.id});
    return res.json({success: true, post});
};

export const showAllShared = async (req, res, next)=>{
    const shared = await Shared.findAll(
        {where:{superuserId: req.user.id},
        attributes:["createdAt"],
        include:[
        {model:Publishment, attributes:["content","createdAt"],
        include:[
            {model: superUser, attributes:["userName"]},
            // {model: Comment, attributes: ["createdAt"], include:[{model: superUser, attributes: ["userName"]},{model: Publishment, attributes: ["content"]}]}
        ]
    },
    {model: superUser, attributes:["userName"]}
        ]
    });
    return res.json({success: true, sharedPosts});
};