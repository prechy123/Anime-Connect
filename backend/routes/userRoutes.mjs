import express from "express";
import { signupSigninLimiter } from "../middleware/limiter/limiter.mjs";
import { addUserValidator } from "../middleware/users/usersValidator.mjs";

const router = express.Router();

router.post("/signup", signupSigninLimiter, addUserValidator);

export default router;
