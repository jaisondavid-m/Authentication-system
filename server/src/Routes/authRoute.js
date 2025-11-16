import express from "express"
import { Login } from "../Controllers/authControllers.js";
import { Register } from "../Controllers/authControllers.js";

const router = express.Router()

router.post("/login",Login)
router.post("/register",Register)

export default router

