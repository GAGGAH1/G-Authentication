import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectDB from './config/db.js';

const allowedOrigins = ['http://localhost:5173'];

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: allowedOrigins
}));
app.use(cookieParser());

// Import routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});


