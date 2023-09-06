import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
