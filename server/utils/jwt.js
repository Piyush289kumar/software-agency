import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

console.log("JWT_SECRET:", JWT_SECRET); // should NOT be undefined
console.log("JWT_EXPIRES_IN:", JWT_EXPIRES_IN); // should print "7d"

export const generateToken = (payload) => {
  //   if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  //     throw new Error("JWT environment variables are not defined");
  //   }
  console.log("JWT_SECRET:", JWT_SECRET); // should NOT be undefined
  console.log("JWT_EXPIRES_IN:", JWT_EXPIRES_IN); // should print "7d"

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
