import { Sequelize } from "sequelize";
export const sequelize= new Sequelize( "sql5694338","sql5694338","wjEsfULvxb", {//"jobfinder1","root","root",
    host:'sql5.freesqldatabase.com',//'localhost' ,//
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};

//
/*
Host: sql5.freesqldatabase.com
Database name: sql5694338
Database user: sql5694338
Database password: wjEsfULvxb
Port number: 3306
*/