//Home page
/////////job feed 
// export const jobFeed = async (req, res, next)=>{
//     const {id}= req.user;
//     const followingList= await Following.findAll({});
//     return res.json({ success: true });
// };

import { Job } from "../../../DB/models/Job.model";
import { Post } from "../../../DB/models/post.model";

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
        order: [['createdAt', 'DESC']]
    })
    return res.json({ success: true, allPosts });
};

export const jobsFeed = async (req, res, next) => {
    const {id}= req.user;
    const allJobs= await Job.findAll({
        order: [['createdAt', 'DESC']]
    })
    return res.json({ success: true, allJobs });
};

