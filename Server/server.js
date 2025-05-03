import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  connectDB  from "./controllers/dbconnect.js";
import users from "./controllers/userRoutes.js";

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 8000;
const corsOption = {
    origin : ["http://localhost:5173"]
}

app.use(cors(corsOption));
app.use(express.json());
app.use(users)

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});