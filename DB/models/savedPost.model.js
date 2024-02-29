import { Model } from "sequelize";
import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";
import { Publishment } from "./publishment.model.js";
import { Post } from "./post.model.js";
export class Saved extends Model {}
Saved.init({},{sequelize, modelName:"saved", timestamps:true});
superUser.belongsToMany(Publishment,{through:Saved});
Publishment.belongsToMany(superUser,{through:Saved});

superUser.hasMany(Saved);
Saved.belongsTo(superUser)

Post.hasMany(Saved);
Saved.belongsTo(Post);