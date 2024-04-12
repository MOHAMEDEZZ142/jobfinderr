import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("sql10698345","sql10698345","3NCvZL5nkD",{ //"jobfinder1","root","root",
    host: 'sql10.freesqldatabase.com', //'localhost' ,
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};
/*
Host: sql10.freesqldatabase.com
Database name: sql10698345
Database user: sql10698345
Database password: 3NCvZL5nkD
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