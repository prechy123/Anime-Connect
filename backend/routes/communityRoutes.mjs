import express from "express";
import { createCommunity } from "../controllers/communityController.mjs";

const router = express.Router();

// create Community
router.post("/createcommunity", createCommunity)

export default router;
