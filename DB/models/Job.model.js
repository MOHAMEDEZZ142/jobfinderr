import { sequelize } from "../connection.js";
import { Company } from "./company.model.js";
import { Publishment } from "./publishment.model.js";

export class Job extends Publishment {}
Job.init({},{sequelize, modelName:"job", timestamps:true});

Company.hasMany(Job);
Job.belongsTo(Company);

Job.belongsTo(Publishment);