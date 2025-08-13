import express from "express";
import connectDB from "./DB/index.js";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio.route.js";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "https://makeyourportfolio.vercel.app",
    "https://ayanalam.vercel.app",
]; // frontend URL
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // allow cookies if using sessions/JWT with HttpOnly cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.get("/", (_req, res) => {
    res.send("Server is running");
});
async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Error while starting server", error);
    }
}
startServer();
//# sourceMappingURL=app.js.map