import express from "express";
import { signupSigninLimiter } from "../middleware/limiter/limiter.mjs";
import { addUserValidationHandler, addUserValidator } from "../middleware/users/usersValidator.mjs";
import { createUser } from "../controllers/userController.mjs";

const router = express.Router();

router.post(
  "/signup",
  signupSigninLimiter,
  addUserValidator,
  addUserValidationHandler,
  createUser
);
router.post("/signin", signupSigninLimiter, )

export default router;
