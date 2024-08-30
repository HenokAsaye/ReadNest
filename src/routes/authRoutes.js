import { Router } from "express";
import { signup,login } from "../controllers/authController";

const router=Router();
router.post("/register",signup);
router.post("/login",login);

export default router
