import Post from "../models/postModel.mjs";
import User from "../models/userModel.mjs";
import Comment from "../models/commentModel.mjs";

export const createPost = async (req, res) => {
  const { userId, content } = req.body;
  const newPost = new Post({
    userId,
    content,
  });
  try {
    await newPost.save();
    if (newPost.isNew) {
      return res.status(400).json({ message: "failed to post message" });
    }
    const user = await User.findById(userId);
    user.post.push(userId);
    await user.save();
    res.status(200).json({ message: "message posted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const editPost = async (req, res) => {
  const { postId } = req.query;
  const { editedMessage } = req.body;
  const existingPost = await Post.findOne({ _id: postId });
  if (!existingPost) {
    return res.status(400).json({ message: "Post not found" });
  }
  existingPost.content = editedMessage;
  try {
    const updatedPost = await existingPost.save();
    res.status(200).json({ message: "Updated successfully", updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("userId", "username fullname profilepictureurl")
      .lean();
    res.status(200).json({ messsage: posts });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.query;

  try {
    const result = await Post.deleteOne({ _id: postId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Message deleted successfully" });
    } else {
      res.status(400).json({ message: "Message was not deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyPost = async (req, res) => {
  const { userId } = req.query;
  try {
    const posts = await Post.find({ userId })
      .populate("userId", "username fullname profilepictureurl")
      .lean();
    res.status(200).json({ messsage: posts });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findOne({ _id: postId });
    post.likes.push(userId);
    post.likesCount++;
    await post.save();
    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const unlikePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findOne({ _id: postId });
    const userIndex = post.likes.indexOf(userId);
    if (userIndex !== -1) {
      post.likes.splice(userIndex, 1);
    }
    post.likesCount--;
    await post.save();
    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.query;

  try {
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username profilepictureurl",
      },
    });
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    const comments = post.comments;
    res.status(200).json({ message: "success", comments });
  } catch (err) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const postComment = async (req, res) => {
  const { userId, postId, content } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    const newComment = new Comment({
      content,
      user: userId,
      post: postId,
    });
    await newComment.save();
    await post.updateOne({
      $push: { comments: newComment._id },
      $inc: { commentsCount: 1 },
    });
    await post.save();
    res.status(200).json({ message: "Comment successfully created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
