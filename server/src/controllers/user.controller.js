import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { createUser, findUserByEmail } from "../services/user.service.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";
import { logger } from "../utils/logger.js";
import UserModel from "../models/user.model.js";

export const signUpUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await findUserByEmail(email);
    if (exists) throw new ErrorResponse("User already exists.", 400);

    const user = await createUser({
      name,
      email,
      password,
      avatar: {
        public_id: req.file?.filename || "",
        url: req.file?.path || "",
      },
    });

    logger.info(`New user registered: ${user.email}`);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar?.url,
    });
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) throw new ErrorResponse("Invalid credentials.", 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorResponse("Invalid credentials.", 401);

    const token = generateToken({ userId: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    logger.info(`User signed in: ${user.email}`);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar?.url,
      message: "Sign In successful",
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token").json({ message: "Signed Out" });
    logger.info("User signed out");
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("-password");
    if (!user) throw new ErrorResponse("User not found", 404);

    res.json(user);
  } catch (error) {
    next(error);
  }
};
