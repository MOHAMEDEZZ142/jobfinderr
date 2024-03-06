import { Sequelize } from "sequelize";
export const sequelize= new Sequelize( "sql6687811","sql6687811","G8iewytUxy", {
    host: 'sql6.freesqldatabase.com',
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};

//
/*
Host: sql6.freesqldatabase.com
Database name: sql6687811
Database user: sql6687811
Database password: G8iewytUxy
Port number: 3306
*/