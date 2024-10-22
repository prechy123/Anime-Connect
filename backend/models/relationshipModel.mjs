import mongoose from "mongoose";
const Schema = mongoose.Schema;

const relationshipSchema = Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Relationship = mongoose.model("Relationship", relationshipSchema);
export default Relationship;
