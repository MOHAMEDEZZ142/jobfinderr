import  jwt  from "jsonwebtoken";
import { Token } from "../../DB/models/token.model.js";
import { superUser } from "../../DB/models/superUser.model.js";
export const isAuthenticated= async(req, res, next)=>{
    //check token existence and type
    let {token} = req.headers;
    if(!token) return next(new Error("you should send token"));
    if(!token.startsWith(process.env.BARER_KEY)) return next(new Error("invalid token"));
    //check payload
    token= token.split(process.env.BARER_KEY)[1];
    const payload= jwt.verify(token, process.env.TOKEN_KEY);
    if(!payload){return next(new Error("invalid token"))};
    //check token in DB
    const istoken= await Token.findOne({where:{token, isValid:true}});
    if(!istoken){return next(new Error("token expired"))};
    //check user existence
    const user= await superUser.findOne({where:{email: payload.email}});
    if(!user){return next(new Error("user not found"))};
    //pass user in req
    req.user=user;
    //response
    return next();
};