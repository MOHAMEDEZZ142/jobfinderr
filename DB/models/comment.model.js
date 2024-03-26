import { sequelize } from "../connection.js";
import { Post } from "./post.model.js";
import { superUser } from "./superUser.model.js";
import { DataTypes, Model } from "sequelize";

export class Comment extends Model {}
Comment.init({
    content:{type: DataTypes.STRING}
},{sequelize, modelName:"comment", timestamps:true});

Post.hasMany(Comment);
Comment.belongsTo(Post);

superUser.hasMany(Comment);
Comment.belongsTo(superUser);