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
    profilePicture:{
            type: DataTypes.STRING,
            default:"https://res.cloudinary.com/dqy3hy4xj/image/upload/v1691724644/amazon/user/blank-profile-picture-973460_1280_dgbcxs.webp"
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