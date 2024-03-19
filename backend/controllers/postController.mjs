import Post from "../models/postModel.mjs";

export const createPost = async (req, res) => {
  const { userId, content } = req.body;
  const newUser = new Post({
    userId,
    content,
  });
  try {
    await newUser.save();
    if (newUser.isNew) {
      res.status(400).json({ message: "failed to post message" });
    }
    res.status(200).json({ message: "message posted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({messsage: posts});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
