/**
 * Express сервер
 * MongoDB холболт болон API route-уудыг зохицуулна
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./controllers/dbconnect.js";
import users from "./controllers/userRoutes.js";

// .env файлаас тохиргоог уншиж авах
dotenv.config();

// MongoDB-тэй холбогдох
connectDB()

const app = express();
const PORT = process.env.PORT || 8000;

// CORS тохиргоо - зөвшөөрөгдсөн frontend домэйнууд
const corsOption = {
    origin: ["http://localhost:5173"]
}

// Middleware-үүд
app.use(cors(corsOption));
app.use(express.json());

// API маршрутууд
app.use(users)

// Сервер асаах
app.listen(PORT, () => {
    console.log(`Сервер ажиллаж эхэллээ: http://localhost:${PORT}`);
});