import User from "../models/user.model.js";

export const getFullProfile = async (req, res) => {
  const { profileId } = req.params;
  try {
    const fullProfile = User.findById(profileId);
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
    res.status(200).json({ success: true, data: [...friendList], userId });
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

export const editProfile = async (req, res) => {};

export const deleteProfile = async (req, res) => {};
