import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // store securely
const JWT_EXPIRES_IN = "1h"; // token expiration time

// ===== Generate JWT Token =====
export const generateToken = (payload: object): string => {
  // payload can include user id, role, etc.
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// ===== Verify JWT Token =====
export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
