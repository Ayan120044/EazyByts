import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z, ZodError } from "zod";
import { UserModel } from "../DB/user.model.js";
import { authenticate } from "../middleware/auth.js";
const authRoutes = Router();
const JWT_EXPIRY = "7d";
// ZOD Schemas
const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
const signInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});
// SIGNUP
authRoutes.post("/signup", async (req, res) => {
    try {
        const data = signUpSchema.parse(req.body);
        const existingUser = await UserModel.findOne({
            $or: [{ email: data.email }, { username: data.username }],
        });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "Email or username already in use" });
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await UserModel.create({
            ...data,
            password: hashedPassword,
        });
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });
        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
            },
        });
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({ message: err.message });
        }
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
// SIGNIN
authRoutes.post("/signin", async (req, res) => {
    try {
        const { email, password } = signInSchema.parse(req.body);
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });
        res.status(200).json({
            message: "Signin successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({ message: err.message });
        }
        console.error("Signin error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
// SIGNOUT - just a frontend cleanup now
authRoutes.post("/signout", (_req, res) => {
    res
        .clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .json({ message: "Signed out successfully" });
});
// GET USER
authRoutes.get("/getuser", authenticate, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
            .populate({
            path: "portfolios",
            select: "_id personalInfo skills projects socialLinks selectedTemplate",
        })
            .select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
export default authRoutes;
//# sourceMappingURL=auth.route.js.map