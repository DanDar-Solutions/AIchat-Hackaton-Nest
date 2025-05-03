import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: {
    lessonsCompleted: { type: Number, default: 0 },
    level: { type: String, default: "beginner" },
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
