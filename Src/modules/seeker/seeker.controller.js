import { Seeker } from "../../../DB/models/seeker.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../../utels/sendMails.js";
import { signUpTemp } from "../../utels/generateHTML.js";
import cloudinary from "../../utels/cloudinary.js";

export const signUp = async(req, res, next)=>{
    //recive data
    const {firstName, lastName, gender,birthDate, phone, email, password, address} = req.body;
    //cheack if email exist
    const isUser= await superUser.findOne({ where: {email}});
    if(isUser){return next(new Error("Email is already exist"))};
    //Pass hashing 
    const hashedPass= bcryptjs.hashSync(password, Number(process.env.SALT_ROUND));
    //create activation code
    const activationCode= crypto.randomBytes(64).toString("hex");
    //Insert data
    const seeker = await Seeker.create({gender,birthDate, 
        superuser:{userName:firstName+" "+lastName,password : hashedPass, email, phone, address,activationCode}},
        {include: {model: superUser}});
    //activate acc link
    const link= `https://jobfinderr.onrender.com/user/confirmEmail/${activationCode}`;
    //send link by Email & cheack
    const isSent= await sendEmail({to:email, subject: "Activate Account", html: signUpTemp(link)});
    return isSent ? res.json({success: true, message: "Please review your email!"}): next(new Error("something went wrong"));
};

export const  uploadCV= async (req, res, next)=>{
    const {id}= req.user;
    const {secure_url, public_id} = await cloudinary.uploader.upload(
        req.file.path,
        {folder: `seekers/${id}/cv`}
        );
    const updatedCV = {
        URL: secure_url,
        Id: public_id
    };
    const seeker= await Seeker.findOne({where:{id}});
    if(!seeker){return next(new Error("user is not found"))}
    await seeker.update({CV: JSON.stringify(updatedCV)});
    return res.json({success: true, seeker});
};