import { Job } from "../../../DB/models/Job.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { SavedJob } from "../../../DB/models/savedJob.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const saveJob= async (req, res, next)=>{
    const job = await Job.findOne({where:{id: req.body.jobId}});
    if(!job){return next(new Error("Post not found"))};
    const save = await SavedJob.create({jobId:job.id, superuserId: req.user.id});
    return res.json({success: true, save});
};

export const showMyAllSavedJobs = async (req, res, next)=>{
    const savedJobs = await SavedJob.findAll({
        where:{superuserId: req.user.id},
        attributes:["createdAt"],
        include:[
            {model:Job, attributes:["createdAt"],
            include:[
                {model: Publishment, attributes:["content"]},
                {model: Company,include:[{model:superUser, attributes:["userName"]}]},
            ]
        },
            ]
    });
    return res.json({success: true, savedJobs});
};

export const unSaveJob = async (req, res, next)=>{
    const post= await SavedJob.findOne({where:{jobId: req.body.jobId, superuserId:req.user.id}});
    if(!post){return next(new Error("Post not found"))}
    if(req.user.id !== post.superuserId){return res.json({success: false, message: "Not Authorized"})};
    await post.destroy();
    return res.json({success: true, message: "deleted successfully"})
};

export const jobSavesCount =async (req, res, next)=>{
    const savedJob = await SavedJob.findAll({where:{jobId:req.body.jobId}});
    const savesCount = savedJob.length;
    return res.json({success:true, savesCount})
};