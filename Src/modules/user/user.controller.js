import { superUser } from "../../../DB/models/superUser.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Token } from "../../../DB/models/token.model.js";
import Randomstring from "randomstring";
import { sendEmail } from "../../utels/sendMails.js";
import cloudinary from "../../utels/cloudinary.js";
import { where } from "sequelize";

//logIn
export const logIn= async (req, res, next)=>{
    const {email, password} = req.body;
    //cheack user exist
    const user=  await superUser.findOne({ where: {email}});
    if(!user){return next(new Error("Email is not found"))};
    //cheack pass
    const pass= bcryptjs.compareSync(password, user.password);
    if(!pass){return next(new Error("Incorrect password"))};
    //cheack confirmation
    if(!user.isConfirmed){return next(new Error("you must confirm your email.. pelese check your inbox"))};
    //generate token
    const token= jwt.sign({id:user.id, email: user.email},process.env.TOKEN_KEY, {expiresIn: "1d" });
    await Token.create({token ,superuserId: user.id, expiresIn:"1"});
    user.status="online";
    await user.save();
    return res.json({success: true, message: "logedin", token});
};

//activate account
export const acctivateAccount =async(req, res, next)=>{
    const user = await superUser.update(
        {isConfirmed: true}, 
        {where: {activationCode: req.params.activationCode}}
        );
    return res.send("Account has activated");
};

//forget password
export const sendForgetPassCode= async(req, res, next)=>{
    const user= await superUser.findOne({where:{email:req.body.email}});
    if (!user){return next(new Error("User not found"))}
    const code = Randomstring.generate({
        length:5,
        charset: "numeric"
    });
    user.forgetCode= code;
    await user.save();
    const isSent= await sendEmail({to:user.email, subject:"Reset password", html: `<p>${code}</p>`});
    return isSent? res.json({success: true, message: "Please review your email!"}): next(new Error("something went wrong"));
};

//reset passord
export const resetPassword= async (req, res, next)=>{
    let user= await superUser.findOne({where:{forgetCode:req.body.forgetCode}});
    if(!user){return next(new Error("user is not found or invalid code"))};
    user.forgetCode=null;
    user.password= bcryptjs.hashSync(req.body.password, Number(process.env.SALT_ROUND));
    await user.save();
    const tokens= await Token.findAll({where:{superuserId:user.id}});
    tokens.forEach(async(token)=>{
        token.isValid=false;
        await tokens.save();
    })
    return res.json({success: true, message:"password has changed successfully"})
};

//update
export const update= async (req, res, next)=>{
    const { userName,phone,bio, address } = req.body;
    const user = await superUser.findOne({where:{id: req.user.id}});
    if(!user){next(new Error("User not found"));}
    await user.update({userName,phone,bio, address});
    await user.save();
    return res.json({success:true, message: "Updated successfully", user});
};

export const  uploadProfilePic= async (req, res, next)=>{
    const {id}= req.user;
    const {secure_url, public_id} = await cloudinary.uploader.upload(
        req.file.path,
        {folder: `users/${id}/pp`}
        );
    const user= await superUser.findOne({where:{id}});
    if(!user){return next(new Error("user is not found"))}
    await user.update({profilePicture:secure_url});
    return res.json({success: true, user});
};