import User from "../models/user.model.js"
import Message from "../models/message.model.js"

export const getMessages = (req, res) => {

}

export const sendMessage = (req, res) => {
    const {messageContent, toID, userID} = req.body;
    const newMessage = new Message({messageContent, toID, fromID: userID})

    
}

export const editMessage = (req, res) => {}

export const getFriends = (req, res) => {}