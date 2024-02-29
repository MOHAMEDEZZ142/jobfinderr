import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";
import { Model } from "sequelize";
import { Publishment } from "./publishment.model.js";
export class Shared extends Model {}
Shared.init({},{sequelize, modelName:"shared", timestamps:true});

superUser.belongsToMany(Publishment,{through:Shared});
Publishment.belongsToMany(superUser,{through:Shared});

// superUser.hasMany(Shared);
// Shared.belongsTo(superUser)

// Post.hasMany(Shared);
// Shared.belongsTo(Post);