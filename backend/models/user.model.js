import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
  introduction: {
    type: String,
    default: "",
  },
  music: {
    type: Array,
  },
  hobbies: {
    type: Array,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    fullName: {
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
      type: infoSchema,
      default: {},
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
