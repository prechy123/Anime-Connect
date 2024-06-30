import mongoose, { mongo } from "mongoose";
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
    likesCount: {
      type: Number,
      default: 0
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    commentsCount: {
      type: Number,
      default: 0
    },
    shareCount: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0,
    },
    postImage: {
      public_id: {
        type: String,
        default: ""
      },
      url: {
        type: String,
        default: ""
      }
    }
  },
  {
    timestamps: true,
  }
);

postSchema.index({ content: "text" });
const Post = mongoose.model("Post", postSchema);

export default Post;
