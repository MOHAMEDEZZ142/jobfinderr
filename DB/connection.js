import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("jobfinder1","root","root", {
    host: 'localhost',
    dialect: 'mysql'
});
export const connectDB= async ()=>{
    return await sequelize.sync()
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log("Connection field", err)})
};