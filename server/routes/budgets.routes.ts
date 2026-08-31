import express from "express";
import {
	createBudget,
	deleteBudget,
	editBudget,
	getBudget,
	getBudgets,
	getBudgetsStats,
} from "../controllers/budgets/budgets.js";
const router = express.Router();

router.get("/", getBudgets);
router.get("/stats", getBudgetsStats);
router.get("/:id", getBudget);
router.post("/", createBudget);
router.patch("/:id", editBudget);
router.delete("/:id", deleteBudget);

export default router;
