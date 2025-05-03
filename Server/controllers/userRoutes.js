import express from 'express';
import bcrypt from 'bcryptjs'; // bcrypt for hashing passwords
import database from './dbconnect.js'; // Assuming you have a database connection module

const userRoutes = express.Router(); // Create a router

// POST route to register a new user
userRoutes.route("/users").post(async (request, response) => {
    let db = database.getDb(); 

    const takenEmail = await db.collection("users").findOne({ email: request.body.email });

    if (takenEmail) { // email is taken 
        return response.status(400).json({ message: "The email is already taken" });
    } else {
        // Hashing the password
        const hash = await bcrypt.hash(request.body.password, 12); // directly pass salt rounds
        // schema
        const mongoObject = {
            name: request.body.name,
            email: request.body.email,
            password: hash,
            joinDate: new Date(),
            posts: []
        };

        try {   // user data insert
            let data = await db.collection("users").insertOne(mongoObject);
            response.status(201).json({ message: "User created successfully", data });
        } catch (error) {
            response.status(500).json({ message: "Error creating user", error: error.message });
        }
    }
});

export default userRoutes;
