import express from "express";
import {
	createAccount,
	deleteAccount,
	editAccount,
	getAccount,
	getAccounts,
	getAccountStats,
} from "../controllers/accounts/accounts.js";

const router = express.Router();

router.get("/", getAccounts);
router.get("/stats", getAccountStats);
router.get("/:id", getAccount);
router.post("/", createAccount);
router.patch("/:id", editAccount);
router.delete("/:id", deleteAccount);

export default router;
