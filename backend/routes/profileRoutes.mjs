import express from "express";
import { searchProfile } from "../controllers/profileController.mjs";

const router = express.Router();

router.get("/getProfiles", searchProfile);

export default router;
