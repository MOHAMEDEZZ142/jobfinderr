import { Model } from "sequelize";
import { sequelize } from "../connection.js";
import { superUser } from "./superUser.model.js";

export class Following extends Model {}
Following.init({},{sequelize, modelName:"following", timestamps:true});

superUser.belongsToMany(superUser,{through:Following, as:"follower", foreignKey:"followerId"});
superUser.belongsToMany(superUser,{through:Following, as:"followed", foreignKey:"followedId"});