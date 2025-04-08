import express from "express";
import { editMessage, getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/:friendId", getMessages);

messageRouter.post("/send", sendMessage);

messageRouter.patch("/edit/:_id", editMessage);

export default messageRouter;