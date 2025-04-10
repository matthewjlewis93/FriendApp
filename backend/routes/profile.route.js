import express from "express";
import { addFriend, deleteProfile, editProfile, getFriendsList, getFullProfile, removeFriend } from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.get("/:profileId", getFullProfile);

profileRouter.get("/friends/:profileId", getFriendsList);

profileRouter.patch("/add/:profileId", addFriend);

profileRouter.patch("/remove/:profileId", removeFriend);

profileRouter.patch("/edit", editProfile);

profileRouter.delete("/delete", deleteProfile);

export default profileRouter;