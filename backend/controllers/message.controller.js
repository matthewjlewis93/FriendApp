import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  const { friendId } = req.params;
  const { userId } = req.body;
  console.log('get messages')

  try {
    const recievedMessages = await Message.find({
      toId: userId,
      fromId: friendId,
    });
    const sentMessages = await Message.find({
      toId: friendId,
      fromId: userId,
    });
    const messages = [...recievedMessages, ...sentMessages].toSorted((x, y) =>
      String(x.createdAt).localeCompare(String(y.createdAt))
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting messages" });
  }
};

export const sendMessage = async (req, res) => {
  const { messageContent, toId, userId } = req.body;
  try {
    const newMessage = new Message({ fromId: userId, messageContent, toId });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message" });
  }
};

export const editMessage = (req, res) => {};

export const getFriends = (req, res) => {};
