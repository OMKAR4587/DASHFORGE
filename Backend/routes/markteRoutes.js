import express from "express";
import { history } from "../controllers/marketController.js";
import { Quotes } from "../controllers/quotesController.js";

const router = express.Router();

router.get("/quotes",Quotes)
router.get("/history", history)

export default router