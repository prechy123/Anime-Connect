import mongoose from "mongoose";
import { decryptField, encryptField } from "../utils/encryption.mjs";

const Schema = mongoose.Schema;

const logSchema = new Schema({
  email: { type: String },
  context: { type: String, set: encryptField, get: decryptField },
  message: { type: String, required: true },
  type: { type: String, required: true },
  Timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 604800,
  },
});

const Log = mongoose.model("Log", logSchema);

export default Log;

///here adding get, set to context
