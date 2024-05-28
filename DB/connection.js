import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("sql12709941","sql12709941","FG3Yf8Dnjt",{
    host: 'sql12.freesqldatabase.com' ,
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};
/*
Host: sql12.freesqldatabase.com
Database name: sql12709941
Database user: sql12709941
Database password: FG3Yf8Dnjt
Port number: 3306
*/