import mongoose from "mongoose";

const infoSubSchema = new mongoose.Schema({
  introduction: {
    type: String,
    default: "",
  },
  DOB: {
    type: Date,
  },
  hobbies: {
    type: Array,
  },
});

const friendListSubSchema = new mongoose.Schema(
  {
    friendId: {
      type: String,
      required: true,
    },
    lastContact: {
      type: Date,
    },
    accepted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    info: {
      type: infoSubSchema,
      default: {},
    },
    friends: {
      type: [friendListSubSchema],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
