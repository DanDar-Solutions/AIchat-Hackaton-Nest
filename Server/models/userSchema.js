/**
 * Хэрэглэгчийн өгөгдлийн модель
 * Хэрэглэгчийн мэдээлэл болон хичээлийн явцыг хадгална
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Нэр оруулах шаардлагатай"],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "И-мэйл оруулах шаардлагатай"], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'И-мэйл хаяг буруу байна'] 
  },
  password: { 
    type: String, 
    required: [true, "Нууц үг оруулах шаардлагатай"],
    minlength: [6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой"] 
  },
  progress: {
    lessonsCompleted: { type: Number, default: 0 },
    level: { 
      type: String, 
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner" 
    },
    lastActive: { type: Date, default: Date.now }
  },
}, { 
  timestamps: true,
  versionKey: false
});

// Хэрэглэгчийн моделийг экспортлох
export default mongoose.model("User", userSchema);
