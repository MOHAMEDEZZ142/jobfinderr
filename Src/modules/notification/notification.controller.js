import { Notification } from "../../../DB/models/notification.model.js";

export const myNotification= async(req, res, next)=>{
    const notification= await Notification.findAll({
        where:{receiverId:req.user.id}
    })
    return res.json({success: true, notification});
}