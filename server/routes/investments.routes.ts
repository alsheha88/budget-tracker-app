import express from "express";
import {
	buyInvestment,
	getInvestmentsStats,
} from "../controllers/investments/investments.js";

const router = express.Router();

router.get("/stats", getInvestmentsStats);
router.post("/buy", buyInvestment);
// later: router.post("/sell", sellInvestment);

export default router;
