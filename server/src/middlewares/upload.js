import multer from "multer";
import { storage } from "../utils/cloudinary.js";

const multerUpload = multer({ storage });

export default multerUpload;
