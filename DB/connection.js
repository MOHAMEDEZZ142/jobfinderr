import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("jobfinder1","root","root",{ 
    host: 'localhost' ,
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};
//'sql10.freesqldatabase.com'
//
/*
// "sql10698345","sql10698345","3NCvZL5nkD",
Host: sql10.freesqldatabase.com
Database name: sql10698345
Database user: sql10698345
Database password: 3NCvZL5nkD
Port number: 3306
*/