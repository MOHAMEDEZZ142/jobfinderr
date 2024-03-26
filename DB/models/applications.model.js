import { Model } from "sequelize";
import { sequelize } from "../connection.js";
import { Job } from "./Job.model.js";
import { Seeker } from "./seeker.model.js";

export class Applications extends Model {}
Applications.init({},{sequelize, modelName:"application", timestamps:true});

Seeker.belongsToMany(Job,{through:Applications});
Job.belongsToMany(Seeker,{through:Applications});

Seeker.hasMany(Applications);
Applications.belongsTo(Seeker)

Job.hasMany(Applications);
Applications.belongsTo(Job);