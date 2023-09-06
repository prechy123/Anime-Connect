import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
