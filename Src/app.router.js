import { Router } from "express";
const router= Router();
import seekerRouter from "./modules/seeker/seeker.router.js";
import companyRouter from "./modules/company/company.router.js";
import userRouter from "./modules/user/user.router.js";
import postRouter from "./modules/post/post.router.js";
import jobRouter from "./modules/job/Job.router.js";
import commentRouter from "./modules/comment/comment.router.js";
import SavedPostRouter from "./modules/savedPost/savedPost.router.js";
import SharePostRouter from "./modules/share/share.router.js";
import reactionRouter from "./modules/reaction/reaction.router.js";
import followRouter from "./modules/following/following.router.js";
export const appRouter = (app, express)=>{
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/seeker",seekerRouter);
    app.use("/company",companyRouter);
    app.use("/post",postRouter);
    app.use("/job",jobRouter);
    app.use("/comment", commentRouter);
    // app.use("/savedPost",SavedPostRouter);
    // app.use("/sharedPost",SharePostRouter);
    app.use("/reaction",reactionRouter);
    app.use("/follow",followRouter);
    //CORS
    const whitelist= ["http://127.0.0.1:5500"];
    app.use((req, res, next)=>{
        // // activate account api
        // if(req.originlUrl.includes("/user/confirmEmail")){
        //     res.setHeader("Access-Control-Allow-Origin","*");
        //     res.setHeader("Access-Control-Allow-Methods","GET");
        //     return next();
        // };
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