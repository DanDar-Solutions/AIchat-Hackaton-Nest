import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./controllers/dbconnect.js";
import users from "./controllers/userRoutes.js";
import openAIRoutes from "./controllers/openAIRoutes.js";

//  read .env
dotenv.config();

// connect to mongodb
connectDB()

const app = express();
const PORT = process.env.PORT || 8000;

// allowed CORS connections
const corsOption = {
    origin: ["http://localhost:5173", "https://your-vercel-app-url.vercel.app"]
}

// Middlewares
app.use(cors(corsOption));
app.use(express.json());

// API 
app.use(users)
app.use(openAIRoutes) // Using OpenRouter as primary AI service

// start server     cdm:npm run dev
app.listen(PORT, () => {
    console.log(`Сервер ажиллаж эхэллээ: http://localhost:${PORT}`);
});