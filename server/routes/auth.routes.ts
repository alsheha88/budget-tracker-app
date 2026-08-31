import express from "express";
import { getUser, login, logout, refresh, signUp, verifyEmail } from "../controllers/auth/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/logout", logout);
router.post("/refresh", refresh)
router.get("/verify-email", verifyEmail);
router.get("/user/me", authMiddleware, getUser);



export default router;