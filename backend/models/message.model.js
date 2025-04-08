import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    toId: {
      type: String,
      required: true,
    },
    fromId: {
      type: String,
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
      minLength: 1,
    },
    read: {
      type: Date,
    },
    reaction: {
      type: String,
    },
  },
  { timestamps: true }
);


const Message = mongoose.model("Message", messageSchema);

export default Message;