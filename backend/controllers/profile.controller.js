import User from "../models/user.model.js";

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
      "fullName profilePic"
    );
    console.log(allFriends);
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

export const editProfile = async (req, res) => {};

export const deleteProfile = async (req, res) => {};
