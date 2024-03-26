import { Router } from "express";
const router= Router();
import seekerRouter from "./modules/seeker/seeker.router.js";
import companyRouter from "./modules/company/company.router.js";
import userRouter from "./modules/user/user.router.js";
import postRouter from "./modules/post/post.router.js";
import jobRouter from "./modules/job/Job.router.js";
import commentRouter from "./modules/comment/comment.router.js";
import SavedPostRouter from "./modules/savedPost/savedPost.router.js";
import SavedJobRouter from "./modules/savedJob/savedJob.router.js";
import SharePostRouter from "./modules/share/share.router.js";
import ShareJobRouter from "./modules/shareJob/sharedJob.router.js";
import reactionRouter from "./modules/reaction/reaction.router.js";
import followRouter from "./modules/following/following.router.js";
import applyRouter from "./modules/application/application.router.js";
export const appRouter = (app, express)=>{
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/seeker",seekerRouter);
    app.use("/company",companyRouter);
    app.use("/post",postRouter);
    app.use("/job",jobRouter);
    app.use("/comment", commentRouter);
    app.use("/savedPost",SavedPostRouter);
    app.use("/savedJob",SavedJobRouter);
    app.use("/sharedPost",SharePostRouter);
    app.use("/sharedJob",ShareJobRouter);
    app.use("/reaction",reactionRouter);
    app.use("/follow",followRouter);
    app.use("/application",applyRouter);
    //CORS
    const whitelist= ["http://127.0.0.1:5500",
    "41.68.193.104",
    "44.226.145.213",
    "54.187.200.255",
    "34.213.214.55",
    "35.164.95.156",
    "44.230.95.183",
    "44.229.200.200"];
    app.use((req, res, next)=>{
        // activate account api
        if(req.originlUrl.includes("/user/confirmEmail")){
            res.setHeader("Access-Control-Allow-Origin","*");
            res.setHeader("Access-Control-Allow-Methods","*");
            return next();
        };
        if(!whitelist.includes(req.header("origin"))){
            return next(new Error("Blocked By CROS"));
        };
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader("Access-Control-Allow-Headers","*");
        res.setHeader("Access-Control-Allow-Methods","*");
        res.setHeader("Access-Control-Allow-Private-Network",true);
        return next();
    })
    //not found path
    app.all("*", (req, res, next)=>{
        return res.json({success: false,  message: "Page not found!"});
    });
    //global erroe handeler
    app.use((error, req, res, next)=>{
        res.json({success: false, message: error.message, stack: error.stack})
    });
};