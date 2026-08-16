import express from "express";
import {
	addTransaction,
	addTransferTransaction,
	deleteTransaction,
	editTransaction,
	getTransaction,
	getTransactions,
} from "../controllers/transactions/transactions.js";

const router = express.Router();
router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", addTransaction);
router.post("/transfer", addTransferTransaction);
router.patch("/:id", editTransaction);
router.delete("/:id", deleteTransaction);

export default router;
