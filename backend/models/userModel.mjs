import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    interest: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.index({ fullName: "text" });

const User = mongoose.model("user", userSchema);

export default User;
