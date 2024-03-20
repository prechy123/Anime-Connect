import express from "express";
import {
  createPost,
  getPost,
  likePost,
  unlikePost,
} from "../controllers/postController.mjs";

const router = express.Router();

// create post
router.post("/newpost", createPost);

// get posts
router.get("/getposts", getPost);

//like and unlike posts
router.patch("/likepost", likePost);
router.patch("/unlikepost", unlikePost);

export default router;
