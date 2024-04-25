import Chat from "../models/ChatModel.mjs";

export const getChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const chat = await Chat.findOne({
      $or: [
        { participants: [req.user._id, userId] },
        { participants: [userId, req.user._id] },
      ],
    }).populate("messages");
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
