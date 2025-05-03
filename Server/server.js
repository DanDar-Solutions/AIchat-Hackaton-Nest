import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./dbconnect.js";

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 8000;
const corsOption = {
    origin : ["http://localhost:5173"]
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is started");
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});