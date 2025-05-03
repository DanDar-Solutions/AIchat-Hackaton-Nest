import express from 'express';
import bcrypt from 'bcryptjs'; // bcrypt for hashing passwords
import User from '../models/userSchema.js'; // Импортлож байгаа модель

const userRoutes = express.Router(); // Create a router

// POST route to register a new user
userRoutes.route("/users").post(async (request, response) => {
    try {
        // Хэрэглэгчийн имэйл бүртгэлтэй эсэхийг шалгах
        const takenEmail = await User.findOne({ email: request.body.email });

        if (takenEmail) { // email is taken 
            return response.status(400).json({ message: "The email is already taken" });
        } 
        
        // Нууц үгийг хэш болгох
        const hash = await bcrypt.hash(request.body.password, 12);
        
        // Шинэ хэрэглэгч үүсгэх
        const newUser = new User({
            name: request.body.name,
            email: request.body.email,
            password: hash
        });

        // Хэрэглэгчийг хадгалах
        await newUser.save();
        response.status(201).json({ 
            message: "User created successfully", 
            userId: newUser._id 
        });
    } catch (error) {
        console.error("Бүртгэлийн алдаа:", error);
        response.status(500).json({ message: "Error creating user", error: error.message });
    }
});

export default userRoutes;
