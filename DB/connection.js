import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("sql6700666","sql6700666","92EEyPxFKg",{
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
Database name: sql6700666
Database user: sql6700666
Database password: 92EEyPxFKg
Port number: 3306
*/