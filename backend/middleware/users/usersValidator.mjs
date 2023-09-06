import { check, validationResult } from "express-validator";
import User from "../../models/userModel.mjs";

export const addUserValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .isAlpha("en-US", { ignore: "_-" })
    .withMessage("Username can only contain alphabet whit _ and -")
    .custom((value) => {
      switch (true) {
        case value.length <= 4:
          throw new Error("Username must be at least 5 characters long");
        case value.length > 20:
          throw new Error("Username can not be more that 20 characters long");
        default:
          return true;
      }
    })
    .trim()
    .custom(async (value) => {
      try {
        const userName = await User.findOne({ username: value });
        if (userName) {
          throw new Error("User name already exist, try another");
        }
      } catch (error) {
        throw error;
      }
    }),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const email = await User.findOne({ email: value });
        if (email) {
          throw new Error(
            "Account with this email address exist, try another or login"
          );
        }
      } catch (error) {
        throw error;
      }
    }),
  check("password", "Enter a password with 6 or more characters").isLength({
    min: 6,
  }),
];

export const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    const errorMsg = Object.values(mappedError).map((error) => error.msg);
    res.status(400).json({
      error: errorMsg,
    });
  }
};
