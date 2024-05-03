import mongoose from "mongoose";

const Schema = mongoose.Schema;

// community schema
const communityPostSchema = new Schema(
  {
    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
    posts: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        post: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { _id: false }
);

const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);

export default CommunityPost;
