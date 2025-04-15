import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    avatar: {
      public_id: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userScheme);
export default UserModel;
