import express from "express";
import {
	createBill,
	deleteBill,
	editBill,
	getBill,
	getBills,
	getBillsStats,
	markAsPaid,
} from "../controllers/bills/bills.js";
const router = express.Router();

router.get("/", getBills);
router.get("/stats", getBillsStats);
router.get("/:id", getBill);
router.post("/", createBill);
router.patch("/:id/pay", markAsPaid);
router.patch("/:id", editBill);
router.delete("/:id", deleteBill);

export default router;
