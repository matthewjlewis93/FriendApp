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
    io.to(userId).emit("newMessage", newMessage);
    if (receiverSocketId) {
      console.log('emitting message to', receiverSocketId);
      io.to(toId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message" });
  }
};

export const editMessage = async (req, res) => {
  const {reaction, id, userId} = req.body;
  // console.log("hello")
  try {
    const updatedMessage = await Message.findByIdAndUpdate(id, {reaction}, {new: true})
    io.to(userId).emit("newReaction", updatedMessage);
    const receiverSocketId = getReceiverSocketId(updatedMessage.fromId);
    // console.log(updatedMessage);
    if (receiverSocketId) {
      console.log('emitting reaction to', receiverSocketId);
      io.to(updatedMessage.fromId).emit("newReaction", updatedMessage);
    }
    res.status(201).json(updatedMessage);
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Error updating message"})
  }
};

export const readMessage = async (req, res) => {
  const {read, id, userId} = req.body;

  try {
    const readMessage = await Message.findByIdAndUpdate(id, {read}, {new: true})
    res.status(201).json({success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({succcess: false})
  }
}

export const getFriends = (req, res) => {};
