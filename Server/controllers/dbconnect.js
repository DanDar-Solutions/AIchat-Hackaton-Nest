import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * MongoDB өгөгдлийн сантай холбогдох функц
 * .env файлд MONGO_URI байх ёстой
 * Жишээ: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
 */
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.log("Анхааруулга: .env файлд MONGO_URI тодорхойлогдоогүй байна");
            console.log("MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname");
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB амжилттай холбогдлоо: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB холболтын алдаа: ${error.message}`);
        process.exit(1); // Алдаа гарвал програм зогсох
    };
};
export default connectDB;