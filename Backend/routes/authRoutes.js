import express, { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect,(req, res)=>{
    res.json({
        message:"you are authenticated",
        userId:req.userId
    })
})
export default router;