import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getMessages = async (req, res) => {
  const { friendId } = req.params;
  const { userId } = req.body;

  try {
    const messages = await Message.find({
      $or: [
        { toId: userId, fromId: friendId },
        { toId: friendId, fromId: userId },
      ],
    });
    res.status(200).json({ success: true, messages});
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

    const receiverSocketId = getReceiverSocketId(toId);
    if (receiverSocketId) {
      console.log('emitting to', receiverSocketId);
      io.to(toId).to(userId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message" });
  }
};

export const editMessage = (req, res) => {};

export const getFriends = (req, res) => {};
