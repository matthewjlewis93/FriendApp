import User from "../models/user.model.js";
import fs from "node:fs";

export const getFullProfile = async (req, res) => {
  const { userId } = req.body;
  try {
    const fullProfile = await User.findById(userId);
    res.status(200).json({ success: true, fullProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error getting profile" });
  }
};

export const getFriendsList = async (req, res) => {
  const { userId } = req.body;
  try {
    const profile = await User.findById(userId);
    const friendList = profile.friends;

    const idArray = friendList.map((friend) => friend.friendId);

    let allFriends = await User.find({ _id: { $in: idArray } }).select(
      "firstName profilePic"
    );
    res.status(200).json({ success: true, data: [...allFriends], userId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error getting friends list" });
  }
};

export const addFriend = async (req, res) => {
  const { profileId } = req.params;
  const { userId } = req.body;
  try {
    const profile = User.findById(profileId);
    const friendList = profile.friends;
  } catch (error) {}
};

export const removeFriend = async (req, res) => {};

export const editProfile = async (req, res) => {
  const { userId } = req.body;
  // console.log(req.body);
  // return;
  const profileUpdates = {};
  Object.entries(req.body).forEach((value) => {
    if (value[1] && !["userId", "profilePic"].includes(value[0]))
      profileUpdates[value[0]] = value[1];
  });
  try {
    if (req.file) {
      // update profile picture
      const { filename } = req.file;
      profileUpdates.profilePic = filename;
    }
    const profile = await User.findByIdAndUpdate(userId, profileUpdates, {
      new: true,
    });
    if (req.file && req.body["profilePic"]) {
      fs.unlink(import.meta.dirname+"/../../uploads/" + req.body["profilePic"], (error) => {
        if (error) console.error(error)
        }
      );
    }
    res.status(200).json({success: true, data: profile})
  } catch (error) {
    console.error(error);
  }
};

export const deleteProfile = async (req, res) => {};
