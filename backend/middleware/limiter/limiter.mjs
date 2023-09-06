import { rateLimit } from "express-rate-limit";
const MESSAGE =
  "Too many accounts created from this IP, please try again after an hour";

const createLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    skipSuccessfulRequests: true,
    message: { message: message },
  });
};

export const signupSigninLimiter = createLimiter(10 * 10 * 6000, 10, MESSAGE); //1hr, 10 requests
