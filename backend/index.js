import express from "express";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { userInfo } from "./lib/userInfoMiddleware.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import profileRouter from "./routes/profile.route.js";

const PORT = process.env.PORT;
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use(userInfo); // Middleware excluded by auth route
app.use("/api/message", messageRouter);
app.use("/api/profile", profileRouter);

////
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at port", PORT);
});
