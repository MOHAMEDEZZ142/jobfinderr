import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("sql7711958","sql7711958","ZNeSM3nVQ5",{
    host: 'sql7.freesqldatabase.com' ,
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};

// Host: sql7.freesqldatabase.com
// Database name: sql7711958
// Database user: sql7711958
// Database password: ZNeSM3nVQ5
// Port number: 3306