import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";
import { Model } from "sequelize";
import { Job } from "./Job.model.js";
export class SharedJob extends Model {}
SharedJob.init({},{sequelize, modelName:"sharedJob", timestamps:true});

// superUser.belongsToMany(Job,{through:SharedJob});
// Job.belongsToMany(superUser,{through:SharedJob});

superUser.hasMany(SharedJob);
SharedJob.belongsTo(superUser)

Job.hasMany(SharedJob);
SharedJob.belongsTo(Job);