import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("sql6700666","sql6700666","92EEyPxFKg",{ //"jobfinder1","root","root",
    host: 'sql6.freesqldatabase.com', //'localhost' ,
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
/*
44.226.145.213
54.187.200.255
34.213.214.55
35.164.95.156
44.230.95.183
44.229.200.200
*/