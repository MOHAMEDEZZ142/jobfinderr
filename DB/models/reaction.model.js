import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";
import { Post } from "./post.model.js";
import { Model } from "sequelize";
export class Reaction extends Model {}
Reaction.init({},{sequelize, modelName:"reaction", timestamps:true});

superUser.belongsToMany(Post,{through:Reaction});
Post.belongsToMany(superUser,{through:Reaction});

superUser.hasMany(Reaction);
Reaction.belongsTo(superUser)

Post.hasMany(Reaction);
Reaction.belongsTo(Post);