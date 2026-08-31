import express from "express";
import {
	createSavings,
	deleteSavings,
	editSavings,
	getAllSavings,
	getSavings,
	getSavingsStats,
} from "../controllers/savings/savings.js";
import { addContribution } from "../controllers/transactions/transactions.js";
const router = express.Router();

router.get("/", getAllSavings);
router.get("/stats", getSavingsStats);
router.get("/:id", getSavings);
router.post("/", createSavings);
router.post("/contribute", addContribution);
router.patch("/:id", editSavings);
router.delete("/:id", deleteSavings);

export default router;
