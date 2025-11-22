import express from "express"
import { Login,Logout,verifyToken,Register } from "../Controllers/authControllers.js";

const router = express.Router()

router.post("/login",Login)
router.post("/register",Register)
router.get("/verify", verifyToken)
router.post("/logout", Logout)

export default router

