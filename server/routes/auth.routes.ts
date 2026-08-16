import express from "express";
import { login, logout, signUp, verifyEmail } from "../controllers/auth/authControllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail);



export default router;