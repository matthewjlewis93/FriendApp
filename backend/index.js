import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { userInfo } from "./lib/userInfoMiddleware.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import profileRouter from "./routes/profile.route.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use(userInfo); // Middleware excluded by auth route
app.use("/api/message", messageRouter);
app.use("/api/profile", profileRouter);

////
server.listen(PORT, () => {
  connectDB();
  console.log("Server started at port", PORT);
});
