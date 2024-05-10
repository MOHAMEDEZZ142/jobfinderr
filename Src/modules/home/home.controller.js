//Home page
/////////job feed 
// export const jobFeed = async (req, res, next)=>{
//     const {id}= req.user;
//     const followingList= await Following.findAll({});
//     return res.json({ success: true });
// };

import { Op } from "sequelize";
import { Job } from "../../../DB/models/Job.model.js";
import { Comment } from "../../../DB/models/comment.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Post } from "../../../DB/models/post.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Reaction } from "../../../DB/models/reaction.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

// export const postsFeed = async (req, res, next) => {
//     const { id } = req.user;
//     const followingList = await Following.findAll({
//         where: { followerId: id },
//         include: {
//         model: superUser,
//         attributes: ['id', 'userName'],
//         },
//     });

//       // 2. Fetch Job Posts from Followed Companies (Efficient)
//     const followedIds = followingList.map((following) => following.superuser.id);
//     const posts = await Post.findAll({
//         where: { superuserId: followedIds },
//         include: {
//           model: superUser, // Eagerly load company information
//           attributes: ['userName'], // Include only company name
//         },
//         order: [['createdAt', 'DESC']], // Order by creation date (latest first)
//     });

//       // 3. Respond with Success and Job Posts
//     return res.json({ success: true, posts });
// };

//         where:{folloerId:id},
//         attributes:["establishmentDate","description"],
//         include: [
//             {model: superUser, attributes:["userName","email","phone","bio","profilePicture","address"]},
//         ]
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
            {model:Reaction}
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
        userName: {
            [Op.like]: `%${searchTerm}%`,
        },
        },
    });
    return res.json({ publishments, superusers });
};