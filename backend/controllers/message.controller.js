import User from "../models/user.model.js"
import Message from "../models/message.model.js"

export const getMessages = (req, res) => {

}

export const sendMessage = async (req, res) => {
    const {messageContent, toID, userID} = req.body;
    try {
        const newMessage = new Message({messageContent, toID, fromID: userID});
        await newMessage.save()
        res.status(200).json({_id: newMessage._id, messageContent: newMessage.messageContent, toID: newMessage.toID, fromID: newMessage.fromID});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error sending message"});
    }

}

export const editMessage = (req, res) => {}

export const getFriends = (req, res) => {}