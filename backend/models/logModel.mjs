import mongoose from "mongoose";

const Schema = mongoose.Schema;

const logSchema = new Schema({
  email: { type: String },
  context: { type: String },
  message: { type: String, required: true },
  type: { type: String, required: true },
  level: { type: String, required: true },
  Timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 604800,
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;
