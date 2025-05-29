import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const authRouter = express.Router();

authRouter.post("/signup", upload.single("profile-photo"), signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;