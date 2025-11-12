import express from "express";
import { searchFAQs } from "../controllers/searchController";

const router = express.Router();

router.post("/search", searchFAQs);

export default router;
