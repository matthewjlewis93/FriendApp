import express from "express";
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT;
const app = express();





app.listen(PORT, ()=>{
    connectDB();
    console.log("Server started at port", PORT);
},)