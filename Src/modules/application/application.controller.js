import { Job } from "../../../DB/models/Job.model.js";
import { Applications } from "../../../DB/models/applications.model.js";
import { Publishment } from "../../../DB/models/publishment.model.js";
import { Seeker } from "../../../DB/models/seeker.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";
import { notify } from "../../utels/notify.js";

export const createApplication= async (req, res, next)=>{
    const{jobId} = req.body ;
    const seeker= await Seeker.findOne({where:{id: req.user.id}});
    if(!seeker){return next(new Error("user not found"))};
    const job= await Job.findOne({where:{id:jobId}});
    if(!job){return next(new Error("Job not found"))};
    const isApplied= await Applications.findOne({where:{jobId, seekerId:req.user.id}});
    if(isApplied){return next(new Error("Alredy Applied"))};
    const user= await superUser.findOne({where:{id: seeker.id}});
    const application= await Applications.create({jobId, seekerId:req.user.id});
    notify({type:"application", senderId:user.id, to: job.companyId, jobId:job.id,
        content:`${user.userName} just applied for your job`})
    return res.json({success: true, message: "Applied successfully", application});
};

export const AlljobApplications = async(req, res, next)=>{
    const job= await Job.findOne({
        where:{id:req.body.jobId}
    });
    if(!job){return next(new Error("This job not found"))};
    if(job.companyId !== req.user.id){return next(new Error("Not Authorized"))};
    const applications= await Applications.findAll({
        where:{jobId:job.id},
        include:[
            {model:Seeker,include:[{model:superUser, attributes:["userName"]}]}
        ]
    })
    return applications ? res.json({success: true, applications}): next(new Error("There are no applications"));
};

export const AllSeekerApplications = async(req, res, next)=>{
    const seeker= await Seeker.findOne({
        where:{id:req.user.id}
    });
    if(!seeker){return next(new Error("User not found"))};
    const applications= await Applications.findAll({
        where:{seekerId:req.user.id},
        include:[
            {model:Job,include:[{model:Publishment, attributes:["content"]}]}
        ]
    })
    return applications ? res.json({success: true, applications}): next(new Error("There are no applications"));
};

export const deleteApplicationSeeker = async(req, res, next)=>{
    const applications= await Applications.findOne({
        where:{seekerId:req.user.id, jobId: req.body.jobId}
    });
    if(!applications){return next(new Error("There are no applications"))}
    await applications.destroy();
    return res.json({success: true, message: "Application Deleted Successfully"});
};

export const deleteApplicationCompany = async(req, res, next)=>{
    const job= await Job.findOne({
        where:{id:req.body.jobId}
    });
    if(job.companyId !== req.user.id){return next(new Error("Not Authorized"))};
    if(!job){return next(new Error("This job not found"))};
    const applications= await Applications.findOne({
        where:{jobId: job.id}
    });
    if(!applications){return next(new Error("There are no applications"))};
    await applications.destroy();
    return res.json({success: true, message: "Application Deleted Successfully"});
};

export const jobApplicationCount =async (req, res, next)=>{
    const apps = await Applications.findAll({where:{jobId:req.body.jobId}});
    const appsCount = apps.length;
    return res.json({success:true, appsCount})
};
