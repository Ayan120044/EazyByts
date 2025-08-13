import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);

    // Attach userId to request
    (req as any).userId = (decoded as any).userId;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" });
  }
};
