import express from "express";
import {
  signUpUser,
  signInUser,
  signOut,
  userProfile,
} from "../controllers/user.controller.js";
import multerUpload from "../middlewares/upload.js";
import { validate } from "../middlewares/validate.js";
import { signUpSchema, signInSchema } from "../validations/userValidation.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Profile Routes
router.post(
  "/sign-up",
  multerUpload.single("avatar"),
  validate(signUpSchema),
  signUpUser
);
router.post("/sing-in", validate(signInSchema), signInUser);

router.post("/sign-out", signOut);

router.get("/profile", isAuthenticated, userProfile);

export default router;
