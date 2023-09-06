import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // comment: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);
