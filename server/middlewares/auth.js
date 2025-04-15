import { verifyToken } from "../utils/jwt.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decode = verifyToken(token);
  if (!decode)
    return res.status(403).json({ message: "Invalid or expired token" });

  req.user = decode;
  next();
};
