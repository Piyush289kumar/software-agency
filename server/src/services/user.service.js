import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return UserModel.create({ ...userData, password: hashedPassword });
};

export const findUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};
