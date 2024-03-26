import { Job } from "../../../DB/models/Job.model.js";
import { SharedJob } from "../../../DB/models/shareJob.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const ShareJob= async (req, res, next)=>{
    const share = await SharedJob.create({jobId:req.params.jobId, superuserId: req.user.id});
    return res.json({success: true, share});
};

export const showAllSharedJobs = async (req, res, next)=>{
    const sharedJobs = await SharedJob.findAll(
        {where:{superuserId: req.user.id},
        attributes:["createdAt"],
        include:[
        {model:Job, attributes:["createdAt"],
        include:[
            {model: Publishment, attributes:["content"]},
            {model: superUser, attributes:["userName"]},
        ]
    },
    {model: superUser, attributes:["userName"]}
        ]
    });
    return res.json({success: true, sharedPosts});
};

export const unShareJob = async (req, res, next)=>{
    const shared= await SharedJob.findOne({where:{id: req.params.id}});
    if(!shared){return next(new Error("Post not found"))}
    if(req.user.id !== shared.superuserId){return res.json({success: false, message: "Not Authorized"})};
    await shared.destroy();
};

export const jobSharesCount =async (req, res, next)=>{
    const sharedJob = await SharedJob.findAll({where:{jobId:req.params.jobId}});
    const sharesCount = sharedJob.length;
    return res.json({success:true, sharesCount})
};