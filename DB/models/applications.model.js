import { sequelize } from "../connection";
import { Ads } from "./Ads.model.js";
import { Seeker } from "./seeker.model.js";

export class Applications extends Model {}
Applications.init({
    // AdId:{
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model: Ads,
    //         key: 'id'}
    // },
    // seekerId:{
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model: Seeker,
    //         key: 'id'}
    // },
},{sequelize, modelName:"application", timestamps:true});

Seeker.belongsToMany(Ads,{through:Applications});
Ads.belongsToMany(Seeker,{through:Applications});

Ads.hasMany(Applications);
Applications.belongsTo(Ads);