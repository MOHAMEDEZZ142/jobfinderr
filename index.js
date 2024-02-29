//.env
import dotenv from "dotenv"; 
dotenv.config();
//express
import express from "express";
const app= express();
//Db
import { connectDB } from "./DB/connection.js";
connectDB();
//routing
import { appRouter } from "./Src/app.router.js";
appRouter(app, express);

app.listen(process.env.PORT, ()=> console.log(`App is running on ${process.env.PORT}!`));