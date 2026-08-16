import express from "express";
import {
	createSavings,
	deleteSavings,
	editSavings,
	getAllSavings,
	getSavings,
} from "../controllers/savings/savings.js";
import { addContribution } from "../controllers/transactions/transactions.js";
const router = express.Router();

router.get("/", getAllSavings);
router.get("/:id", getSavings);
router.post("/:id", createSavings);
router.post("/contribute", addContribution);
router.patch("/:id", editSavings);
router.delete("/:id", deleteSavings);

export default router;
