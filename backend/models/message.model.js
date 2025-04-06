import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    toID: {
      type: String,
      required: true,
    },
    fromID: {
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
