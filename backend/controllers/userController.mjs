import User from "../models/userModel.mjs";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  const { userName, fullName, email, password, profilePictureUrl } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultPicture =
    "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";

  const newUser = new User({
    userName,
    fullName,
    email,
    password: hashedPassword,
    profilePictureUrl: defaultPicture,
  });

  try {
    await newUser.save();
    if (newUser.isNew) {
      throw new Error("Failed to create account");
    }
  } catch {
    res.status(400).json({ message: "Failed to create account" });
  }
};
