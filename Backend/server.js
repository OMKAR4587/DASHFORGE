import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import marketRoutes from './routes/markteRoutes.js'
import { connectDb } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
// import watchlistRoutes from "./routes/watchlist.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middelware
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter)
app.use('/api/market', marketRoutes);
// app.use('/watchlist', watchlistRoutes)

// test routes
app.get("/",(req, res)=>{
    res.status(200).json({
        success:true,
        message:"server is running"
    });
});

await connectDb()
app.listen(PORT,()=>{
    console.log(`server is running on port number: ${PORT}`)
});