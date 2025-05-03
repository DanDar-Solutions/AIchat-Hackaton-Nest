import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';

const userRoutes = express.Router(); // Create a router

userRoutes.route("/users").post(async (request, response) => {
    try {
        const takenEmail = await User.findOne({ email: request.body.email });

        if (takenEmail) { // email is taken 
            return response.status(400).json({ message: "The email is already taken" });
        } 
        
        // Нhashing passowrd
        const hash = await bcrypt.hash(request.body.password, 12);
        
        // new user
        const newUser = new User({
            name: request.body.name,
            email: request.body.email,
            password: hash
        });

        // save user
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
