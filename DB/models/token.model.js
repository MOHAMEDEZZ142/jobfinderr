
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";

export class Token extends Model {}
Token.init({
    token : {
        type: DataTypes.STRING,
        allowNull: false
    },
    isValid: {
        type: DataTypes.BOOLEAN, 
        defaultValue: true
    },
    // agent: {
    // type: DataTypes.STRING
    // }, 
    expiresIn: {
        type: DataTypes.STRING
    },
},
{sequelize, modelName:"token", timestamps:true});

superUser.hasMany(Token)
Token.belongsTo(superUser);