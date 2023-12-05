import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Users schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
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
    profilepictureurl: {
      type: String,
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: {
      type: String,
      default: "Somewhere click edit icon to change",
    },
    bio: {
      type: String,
      default: "I am new on WEEEBS",
    },
    animeInterest: [
      {
        type: String,
        default: "",
      }
    ],
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.index({ fullName: "text" });

const User = mongoose.model("User", userSchema);

export default User;
