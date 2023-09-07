import express from "express";

//middleware-limiter
import { signupSigninLimiter } from "../middleware/limiter/limiter.mjs";

//middleware-validator
import {
  addUserValidationHandler,
  addUserValidator,
} from "../middleware/users/usersValidator.mjs";

//controller
import { createUser, getUserLogs, signin } from "../controllers/userController.mjs";

//middleware
import requestIp from "request-ip";
import useragent from "express-useragent";
import saveLogInfo from "../middleware/logger/saveLogInfo.mjs";

const router = express.Router();

//post routes
router.post(
  "/signup",
  signupSigninLimiter,
  addUserValidator,
  addUserValidationHandler,
  createUser
);
//added client ip address to request object as req.clientIp
//added useragent to keep track of browsers and device
router.post(
  "/signin",
  signupSigninLimiter,
  requestIp.mw(),
  useragent.express(),
  signin
);


//get routes
router.get("/getlogs", getUserLogs)

export default router;
