import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
export class Publishment extends Model {}
Publishment.init({
    content:{type: DataTypes.STRING}
},{sequelize, modelName:"publishment", timestamps:true});