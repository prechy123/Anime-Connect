import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  message: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
