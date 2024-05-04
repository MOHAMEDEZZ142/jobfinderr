import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("sql6704026","sql6704026","sKRNVZHV11",{
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
Database name: sql6704026
Database user: sql6704026
Database password: sKRNVZHV11
Port number: 3306
*/