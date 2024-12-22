import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors';
//config env
dotenv.config();
connectDB();
// Initialize express application
const app = express();


//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
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
