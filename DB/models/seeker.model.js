import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import { superUser } from "./superUser.model.js";

export class Seeker extends superUser {}
Seeker.init(
{
gender:{
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false
},
birthDate:{
    type: DataTypes.DATE, 
    allowNull: false,
},
CV:{
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: JSON.stringify({
        URL: "",
        Id: ""
    })
},
},{ sequelize, modelName: 'seeker', timestamps:true });
Seeker.belongsTo(superUser);