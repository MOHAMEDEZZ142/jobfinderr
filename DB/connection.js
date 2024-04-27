import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("sql6702376","sql6702376","cXHFpnPCcm",{
    host: 'sql6.freesqldatabase.com' ,
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};
/*
Host: sql6.freesqldatabase.com
Database name: sql6702376
Database user: sql6702376
Database password: cXHFpnPCcm
Port number: 3306
*/