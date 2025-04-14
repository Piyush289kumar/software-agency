import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import multerUpload from "../middlewares/upload.js";

const router = express.Router();

router.post("/sign-up", multerUpload.single("avatar"), registerUser);
router.post("/sing-in", loginUser);

export default router;
