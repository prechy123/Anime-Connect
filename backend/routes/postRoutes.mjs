import express from "express";
import { createPost, getPost } from "../controllers/postController.mjs";

const router = express.Router();

// create post
router.post("/newpost", createPost)

// get posts
router.get("/getposts", getPost)

export default router