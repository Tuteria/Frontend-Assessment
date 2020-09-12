import { Router } from "express";
import { loginOrRegister, logout } from "../controllers/auth";

const router = Router();

router.post("/login", loginOrRegister);
router.get("/logout", logout);

export default router;
