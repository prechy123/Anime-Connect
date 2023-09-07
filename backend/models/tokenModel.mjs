import mongoose from "mongoose";

const Schema = mongoose.Schema;
const tokenSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  //since the output of the tokens are strings
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    expires: 3 * 60 * 60, //3hours
  },
});

const Token = mongoose.model("Token", tokenSchema);
export default Token;
