import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";
import { Model } from "sequelize";
import { Post } from "./post.model.js";
export class Shared extends Model {}
Shared.init({},{sequelize, modelName:"shared", timestamps:true});

// superUser.belongsToMany(Post,{through:Shared});
// Post.belongsToMany(superUser,{through:Shared});

superUser.hasMany(Shared);
Shared.belongsTo(superUser)

Post.hasMany(Shared);
Shared.belongsTo(Post);