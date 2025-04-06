import express from "express";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"

const PORT = process.env.PORT;
const app = express();

//middleware
app.use(express.json()); 
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter)

////
app.listen(PORT, ()=>{
    connectDB();
    console.log("Server started at port", PORT);
},)