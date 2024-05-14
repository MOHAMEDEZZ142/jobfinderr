import { Op, Sequelize } from "sequelize";
import { Job } from "../../../DB/models/Job.model.js";
import { Comment } from "../../../DB/models/comment.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Reaction } from "../../../DB/models/reaction.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const postsFeed = async (req, res, next) => {
    const {id}= req.user;
    const allPosts= await Post.findAll({
        include: [
            {model: superUser, attributes:["userName"]},
            {model: Publishment, attributes:["content"]},
            {model: Comment, 
                attributes: ["createdAt","content",],
            include:[{model: superUser, attributes: ["userName"]}],
        },
            {model:Reaction,
                attributes: [[Sequelize.literal('(SELECT COUNT(*) FROM Reactions WHERE Reactions.postId = Post.id)'), 'reactionCount']]
            }
        ],
        order: [['createdAt', 'DESC']]
    })
    return res.json({ success: true, allPosts });
};

export const jobsFeed = async (req, res, next) => {
    const {id}= req.user;
    const allJobs= await Job.findAll({
        include: [
            {model: Company, attributes:["superuserId"] , include:[{model:superUser, attributes:["userName"] }]},
            {model: Publishment, attributes:["content"]},
        ],
        order: [['createdAt', 'DESC']]
    })
    return res.json({ success: true, allJobs });
};

export const search = async (req, res) => {
    const { searchTerm } = req.body; 
    const publishments = await Publishment.findAll({
        where: {
        content: {
            [Op.like]: `%${searchTerm}%`,
        },
        },
    });
    const superusers = await superUser.findAll({
        where: {
            [Op.or]: [
                { userName: { [Op.like]: `%${searchTerm}%` } },
                { email: { [Op.like]: `%${searchTerm}%` } },
            ],
        },
    });
    return res.json({ publishments, superusers });
};