import express from "express";
import {
	createBudget,
	deleteBudget,
	editBudget,
	getBudget,
	getBudgets,
} from "../controllers/budgets/budgets.js";
const router = express.Router();

router.get("/", getBudgets);
router.get("/:id", getBudget);
router.post("/:id", createBudget);
router.patch("/:id", editBudget);
router.delete("/:id", deleteBudget);

export default router;
