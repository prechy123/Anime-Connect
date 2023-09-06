import express from "express";
import { signupSigninLimiter } from "../middleware/limiter/limiter.mjs";
import { addUserValidationHandler, addUserValidator } from "../middleware/users/usersValidator.mjs";

const router = express.Router();

router.post(
  "/signup",
  signupSigninLimiter,
  addUserValidator,
  addUserValidationHandler
);

export default router;
