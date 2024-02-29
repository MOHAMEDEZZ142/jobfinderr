import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import { superUser } from "./superUser.model.js";

export class Company extends superUser {}
Company.init(
    {
        establishmentDate:{
            type:DataTypes.DATE
        },
        description:{
            type:DataTypes.STRING
        },
    },
    {sequelize, modelName:"company" ,timestamps:true}
);
Company.belongsTo(superUser);