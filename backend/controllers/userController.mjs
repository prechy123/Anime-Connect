import bcrypt from "bcrypt";

//mongoose-model
import User from "../models/userModel.mjs";


export const createUser = async (req, res) => {
  const { username, fullname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultPicture =
    "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";

  const newUser = new User({
    username,
    fullname,
    email,
    password: hashedPassword,
    profilepictureurl: defaultPicture,
  });

  try {
    await newUser.save();
    if (newUser.isNew) {
      throw new Error("Failed to create account");
    }
    res.status(200).json({message: "Added successfully"})
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
};

export const signin = async (req, res) => {

}