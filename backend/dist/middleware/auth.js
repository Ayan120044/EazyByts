import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log({ authHeader });
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach userId to request
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res
            .status(403)
            .json({ message: "Forbidden: Invalid or expired token" });
    }
};
//# sourceMappingURL=auth.js.map