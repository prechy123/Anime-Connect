import express from "express";
import {
  createPost,
  getMyPost,
  getPost,
  likePost,
  unlikePost,
} from "../controllers/postController.mjs";

const router = express.Router();

// create post
router.post("/newpost", createPost);

// get posts
router.get("/getposts", getPost);
router.get("/getmyposts", getMyPost);

//like and unlike posts
router.patch("/likepost", likePost);
router.patch("/unlikepost", unlikePost);

export default router;
