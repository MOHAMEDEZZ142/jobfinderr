import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("sql11706428","sql11706428","smmlYDjys7",{
    host: 'sql11.freesqldatabase.com' ,
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};
/*
Host: sql11.freesqldatabase.com
Database name: sql11706428
Database user: sql11706428
Database password: smmlYDjys7
Port number: 3306
*/