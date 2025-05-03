import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.log("Warning: MONGO_URI is not defined in {.env}");
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    };
};