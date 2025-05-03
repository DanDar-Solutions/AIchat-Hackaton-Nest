import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb is connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // if any error by 1
    };
};
export default connectDB;