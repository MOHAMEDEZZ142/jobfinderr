import { sequelize } from "../connection.js";
import { DataTypes, Model } from "sequelize";
export class superUser extends Model {}

superUser.init({
    userName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
        validation:{
            isEmail: true
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING
    },
    bio:{
        type: DataTypes.STRING
    },
    profilePicture: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: JSON.stringify({
                URL: "https://res.cloudinary.com/dsjjrdjrd/image/upload/v1711718921/download_vfmzlr.png",
                Id: ""
            })
        },
    address:{
        type: DataTypes.STRING
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    forgetCode: {
        type: DataTypes.STRING
    },
    activationCode: {
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.ENUM("online","offline"),
        defaultValue: "offline"
    }
},
{ sequelize, modelName: 'superuser', timestamps:true});