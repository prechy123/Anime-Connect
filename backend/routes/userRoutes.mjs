import express from "express";
import { signupSigninLimiter } from "../middleware/limiter/limiter.mjs";

const router = express.Router();

router.post("/signup", signupSigninLimiter)

export default router;
