import express from "express";
import {
  createPost,
  deletePost,
  getComments,
  getMyPost,
  getPost,
  likePost,
  postComment,
  unlikePost,
} from "../controllers/postController.mjs";

const router = express.Router();

// create post
router.post("/newpost", createPost);

// get posts
router.get("/getposts", getPost);
router.get("/getmyposts", getMyPost);

// delete post
router.delete("/deletepost", deletePost)

//like and unlike posts
router.patch("/likepost", likePost);
router.patch("/unlikepost", unlikePost);

// post comment
router.post("/postcomment", postComment)

// get comments
router.get("/getcomments", getComments)

export default router;
