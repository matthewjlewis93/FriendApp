import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";



export const signup = async (req, res) => {
  const { firstName, email, username, password } = req.body;
  const {filename} = req.file;
  // console.log(req.file);
  // return;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      email,
      username,
      password: hashedPassword,
      profilePic: filename
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const userInfo = req.body;
  const userSearch = await User.findOne({ username: userInfo.username });
  if (userSearch) {
    // login
    bcrypt.compare(
      userInfo.password,
      userSearch._doc.password,
      (err, result) => {
        if (err) {
          console.log("Error comparing passwords: ", err);
          res.status(500).json({ message: err });
        } else {
          if (result) {
            generateToken(userSearch._id, res);
            res.status(200).json({
              success: true,
              existingUser: true,
              id: userInfo._id,
            });
          } else {
            res.status(500).json({
              success: false,
              existingUser: true,
              message: "Failed Log In",
            });
          }
        }
      }
    );
  } else {
    res.status(400).json({
      success: false,
      existingUser: false,
      message: "User not found",
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true });
};
