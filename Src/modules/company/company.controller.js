import { Company } from "../../../DB/models/company.model.js";
import { superUser } from "../../../DB/models/superUser.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../../utels/sendMails.js";
import { signUpTemp } from "../../utels/generateHTML.js";

export const signUp = async(req, res, next)=>{
    //recive data
    const {companyName, establishmentDate,description, phone, email, password,address} = req.body;
    //cheack if email exist
    const isUser= await superUser.findOne({ where: {email}});
    if(isUser){return next(new Error("Email is already exist"))};
    //Pass hashing 
    const hashedPass= bcryptjs.hashSync(password, Number(process.env.SALT_ROUND));
    //create activation code
    const activationCode= crypto.randomBytes(64).toString("hex");
    //Insert data
    const company = await Company.create({description, establishmentDate,
        superuser:{ userName:companyName, password : hashedPass, email, phone, address, activationCode}},{
            include: {model: superUser}
        });
    const link= `https://jobfinderr.onrender.com/user/confirmEmail/${activationCode}`;
    const isSent= await sendEmail({to:email, subject: "Activate Account", html: signUpTemp(link)});
    return isSent ? res.json({success: true, message: "Please review your email!"}): next(new Error("something went wrong"));
};