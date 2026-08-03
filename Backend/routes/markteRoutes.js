import express from "express";
import { history } from "../controllers/marketController.js";
import { Quotes } from "../controllers/quotesController.js";
import { searchStockController } from "../controllers/sarchStockController.js";
import { profileController } from "../controllers/profileController.js";
import { newsController } from "../controllers/newsController.js";

const router = express.Router();

router.get("/quotes",Quotes);
router.get("/history", history);
router.get("/search", searchStockController);
router.get("/profile", profileController);
router.get("/news", newsController);

export default router