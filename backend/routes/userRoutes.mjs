//packages
import express from "express";

//middleware-limiter
import {
  followLimiter,
  signupSigninLimiter,
} from "../middleware/limiter/limiter.mjs";

//middleware-validator
import {
  addUserValidationHandler,
  addUserValidator,
} from "../middleware/users/usersValidator.mjs";

//controller
import {
  checkUserName,
  createUser,
  getUserLogs,
  logout,
  signin,
} from "../controllers/userController.mjs";

//middleware
import requestIp from "request-ip";
import useragent from "express-useragent";
// import saveLogInfo from "../middleware/logger/saveLogInfo.mjs";
import {
  changeProfilePicture,
  followUser,
  getFollowerUsers,
  getFollowingUsers,
  unFollowUser,
  updateProfile,
} from "../controllers/profileController.mjs";
import decodeToken from "../middleware/auth/decodeToken.mjs";

const router = express.Router();


//for get routes
router.get("/following", decodeToken, getFollowingUsers);
router.get("/follower", decodeToken, getFollowerUsers);

// Check username
router.get("/checkUserName", checkUserName)

//for post routes
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
router.post("/logout", logout);

//patch routes
router.patch("/:id/follow", decodeToken, followLimiter, followUser);
router.patch("/:id/unfollow", decodeToken, followLimiter, unFollowUser);
router.patch("/changeprofilepicture", changeProfilePicture)
router.patch("/updateprofile", updateProfile)

//get routes
router.get("/getlogs", getUserLogs);

//export
export default router;
