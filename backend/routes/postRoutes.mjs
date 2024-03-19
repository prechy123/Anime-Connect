import express from "express";
import { createPost } from "../controllers/postController.mjs";

const router = express.Router();

// create post
router.post("/newpost", createPost)

export default router