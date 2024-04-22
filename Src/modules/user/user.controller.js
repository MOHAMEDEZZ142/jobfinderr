import { superUser } from "../../../DB/models/superUser.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Token } from "../../../DB/models/token.model.js";
import Randomstring from "randomstring";
import { sendEmail } from "../../utels/sendMails.js";
import cloudinary from "../../utels/cloudinary.js";
import { Seeker } from "../../../DB/models/seeker.model.js";
import { Company } from "../../../DB/models/company.model.js";
// import { Following } from "../../../DB/models/following.model.js";
// import { Post } from "../../../DB/models/post.model.js";
// import { Publishment } from "../../../DB/models/publishment.model.js";
// import { Comment } from "../../../DB/models/comment.model.js";

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
    const updatedProfilePic = {
        URL: secure_url,
        Id: public_id
    };
    const user= await superUser.findOne({where:{id}});
    if(!user){return next(new Error("user is not found"))}
    await user.update({profilePicture: JSON.stringify(updatedProfilePic)});
    return res.json({success: true, user});
};

export const deleteProfilePic= async (req, res, next)=>{
    const {id}= req.user;
    const user= await superUser.findOne({where:{id}});
    if(!user){return next(new Error("user is not found"))};
    if (!user.profilePicture) {return next(new Error("No profile picture found"));}
    const previousProfilePic = JSON.parse(user.profilePicture);
    await cloudinary.uploader.destroy(previousProfilePic.Id);
    await user.update({profilePicture: JSON.stringify({
        URL: "https://res.cloudinary.com/dsjjrdjrd/image/upload/v1711718921/download_vfmzlr.png",
        Id: ""
    })});
    return res.json({ success: true, message: "Profile picture deleted" });
};

// //get all user data

//get all user data
export const allSeekerData = async (req, res, next)=>{
    const {id}= req.user;
    const user= await Seeker.findOne({
        where:{id},
        attributes:["gender","birthDate","CV"],
        include: [
            {model: superUser, attributes:["userName","email","phone","bio","profilePicture","address"]},
        ]
    });
    return res.json({ success: true, user });
};

//get all company data
export const allCompanyData = async (req, res, next)=>{
    const {id}= req.user; 
    const user= await Company.findOne({
        where:{id},
        attributes:["establishmentDate","description"],
        include: [
            {model: superUser, attributes:["userName","email","phone","bio","profilePicture","address"]},
        ]
    });
    return res.json({ success: true, user });
};

//Home page
/////////job feed 
// export const jobFeed = async (req, res, next)=>{
//     const {id}= req.user;
//     const followingList= await Following.findAll({});
//     return res.json({ success: true });
// };
/*
export const postsFeed = async (req, res, next) => {
      // 1. Fetch User's Following List (Optimized)
    const { id } = req.user;
    const followingList = await Following.findAll({
        where: { followerId: id },
        include: {
        model: superUser,
        attributes: ['id', 'userName'],
        },
    });

      // 2. Fetch Job Posts from Followed Companies (Efficient)
    const followedIds = followingList.map((following) => following.superuser.id);
    const posts = await Post.findAll({
        where: { superuserId: followedIds },
        include: {
          model: superUser, // Eagerly load company information
          attributes: ['userName'], // Include only company name
        },
        order: [['createdAt', 'DESC']], // Order by creation date (latest first)
    });

      // 3. Respond with Success and Job Posts
    return res.json({ success: true, posts });
};


        // where:{folloerId:id},
        // attributes:["establishmentDate","description"],
        // include: [
        //     {model: superUser, attributes:["userName","email","phone","bio","profilePicture","address"]},
        // ]
    */