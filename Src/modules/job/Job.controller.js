import moment from "moment";
import { Job } from "../../../DB/models/Job.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";

export const addJob = async (req, res, next)=>{
    const {id} = req.user;
    const {jobTiltle, level, requirments, responsability, yOfExperience} = req.body
    const job = await Job.create(
        {companyId:id,
        publishment: {content:"jobTiltle"+" "+jobTiltle+" "+"level"+" "+level+" "+
        "requirments"+" "+requirments+" "+"responsability"+" "+responsability+" "+
        "yOfExperience"+" "+yOfExperience}},
        { include: [Publishment] });
    return res.json({success: true, job});
};

export const deleteJob= async(req, res, next)=>{
    const {jobId}= req.body;
    const job= await Job.findOne({where:{id:jobId}});
    if(!job) return res.json({success: false, message: "Job not found"});
    if(req.user.id !== job.companyId){return next(new Error("Not Authorized"))};
    await job.destroy({where:{id:jobId}});
    await Publishment.destroy({where:{id: job.publishmentId}});
    return res.json({success: true, message:" Job Deleted successfuly"});
};

export const deleteMyAllJobs= async(req, res, next)=>{
    const jobs= await Job.findAll({where:{companyId:req.user.id}});
    if (jobs.length === 0) {return next(new Error("jobs not found"));};
    for(const job of jobs){
        const publishments= await Publishment.findAll({where:{id: job.publishmentId}});
        for(const publishment of publishments){
            await publishment.destroy();
        };
        await job.destroy();
    };
    return res.json({success: true, message:"Post Deleted successfuly"});
};

export const myAllJobs = async(req, res, next)=>{
    const jobs= await Job.findAll({
        where:{companyId:req.user.id},
        attributes:[
            [
            moment().format('YYYY-MM-DD'),
            'createdAt'
            ]
        ],
        include: [
            {model: Company, attributes:["superuserId"] , include:[{model:superUser, attributes:["userName"] }]},
            {model: Publishment, attributes:["content"]},
        ]
    });
return res.json({ success: true, jobs});
};


export const jobFeed =async(req, res, next)=>{
const { id } = req.user;
const followingList = await Following.findAll({
    where: { followerId: id },
    include: {
    model: superUser,
    attributes: ['id', 'userName'],
    },
});
const followedIds = followingList.map((following) => following.superuser.id);
const companies = await Company.findAll({
    where: { superuserId: followedIds },
    include: {
        model: superUser,
        attributes: ['userName'],
    },
});
const jobs = await Job.findAll({
    where: { companyId: followedIds },
    include: {
        model: superUser, 
        attributes: ['userName'], 
    },
    order: [['createdAt', 'DESC']], 
});
return res.json({ success: true, jobs });
}
