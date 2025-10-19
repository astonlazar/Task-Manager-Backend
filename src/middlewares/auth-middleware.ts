import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt"; // adjust path according to your project

// Extend Request type to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: any; // you can define a specific type instead of any
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach user info to request
    req.user = decoded;
    next(); // proceed to the next middleware or route
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
