import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";

export const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await UserModel.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      avatar: {
        public_id: req.file?.filename || "",
        url: req.file?.path || "",
      },
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar.url,
    });
  } catch (error) {
    res.status(500).json({ message: "Sign Up failed" });
  }
};

export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "Invalid credentials." });
    console.log("Generating token for user ID:", user._id);

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(404).json({ message: "Invalid credentials." });

    const token = generateToken({ userId: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar?.url,
      message: "Sign In successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Sign In failed" });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Signed Out" });
  } catch (error) {
    res.status(500).json({ message: "Signed out failed" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Can't Get Profile Information" });
  }
};
