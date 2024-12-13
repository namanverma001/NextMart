import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
//config env
dotenv.config();
connectDB();
// Initialize express application
const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/auth", authRoute);
// Define a simple route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to NextMart</h1>'); // Corrected from resizeTo.send to res.send
});

// Define the server port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
