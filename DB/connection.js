import { Sequelize } from "sequelize";
export const sequelize= new Sequelize( "sql6696852","sql6696852","7Lgw6VbTE3", {//"jobfinder1","root","root",
    host:'sql6.freesqldatabase.com',//'localhost' ,//
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
Database name: sql6696852
Database user: sql6696852
Database password: 7Lgw6VbTE3
Port number: 3306
*/