import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";
import { Post } from "./post.model.js";
import { Job } from "./Job.model.js";
import { Applications } from "./applications.model.js";
import { Comment } from "./comment.model.js";
import { Seeker } from "./seeker.model.js";
import { Company } from "./company.model.js";
import { Reaction } from "./reaction.model.js";
export class Notification extends Model {}
Notification.init({
    content:{
        type: DataTypes.STRING,
        allowNull: false}
},{sequelize, modelName:"notification", timestamps:true});

superUser.hasMany(Notification,{foreignKey:"senderId"});
Notification.belongsTo(superUser,{as:"sender", foreignKey:"senderId"});

superUser.hasMany(Notification,{foreignKey:"receiverId"});
Notification.belongsTo(superUser,{as:"receiver", foreignKey:"receiverId"});

Seeker.hasMany(Notification);
Notification.belongsTo(Seeker);

Company.hasMany(Notification);
Notification.belongsTo(Company);

Post.hasMany(Notification);
Notification.belongsTo(Post);

Job.hasMany(Notification);
Notification.belongsTo(Job);

Comment.hasMany(Notification);
Notification.belongsTo(Comment);