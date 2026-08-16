import { Router } from "express";
import authRouter from "./auth.routes.js";
import transactionRouter from "./transaction.routes.js";
import categoriesRouter from "./categories.routes.js";
import accountsRouter from "./accounts.routes.js";
import billsRouter from "./bills.routes.js";
import budgetsRouter from "./budgets.routes.js";
import savingsRouter from "./savings.routes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = Router();

router.use("/auth", authRouter);
router.use("/transactions", authMiddleware, transactionRouter);
router.use("/categories", categoriesRouter);
router.use("/accounts", authMiddleware, accountsRouter);
router.use("/budgets", authMiddleware, budgetsRouter);
router.use("/bills", authMiddleware, billsRouter);
router.use("/savings", authMiddleware, savingsRouter);

export default router;


