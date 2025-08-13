import mongoose from "mongoose";
export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to data base ....");
    }
    catch (error) {
        console.error("Error while connecting to database");
        throw error;
    }
}
//# sourceMappingURL=index.js.map