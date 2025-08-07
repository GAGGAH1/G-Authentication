import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from "./routes/authRoutes.js";

import connectDB from './config/db.js';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: "http://localhost:5000"
}));
app.use(cookieParser());

// Import routes
app.use('/api/auth', authRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});


