import { Model } from "sequelize";
import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";
import { Job } from "./Job.model.js";
export class SavedJob extends Model {}
SavedJob.init({},{sequelize, modelName:"savedjob", timestamps:true});
superUser.belongsToMany(Job,{through:SavedJob});
Job.belongsToMany(superUser,{through:SavedJob});

superUser.hasMany(SavedJob);
SavedJob.belongsTo(superUser)

Job.hasMany(SavedJob);
SavedJob.belongsTo(Job);