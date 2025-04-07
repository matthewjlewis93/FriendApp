import express from "express";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import { userInfo } from "./lib/userInfoMiddleware.js";
import messageRouter from "./routes/message.route.js";

const PORT = process.env.PORT;
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(userInfo);

//routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter)

////
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at port", PORT);
});
