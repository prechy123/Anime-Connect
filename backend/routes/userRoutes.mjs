import express from "express";
import { signupSigninLimiter } from "../middleware/limiter/limiter.mjs";
import { addUserValidationHandler, addUserValidator } from "../middleware/users/usersValidator.mjs";
import { createUser } from "../controllers/userController.mjs";
import requestIp from "request-ip"

const router = express.Router();

router.post(
  "/signup",
  signupSigninLimiter,
  addUserValidator,
  addUserValidationHandler,
  createUser
);
//added client ip addredd to request object as req.clientIp
router.post("/signin", signupSigninLimiter, requestIp.mw())

export default router;
