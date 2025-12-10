import express from "express";
import { authMiddleware } from "../middleware/auth.mjs";
import { getInventory } from "../controllers/inventoryController.mjs";

export const router = express.Router();

router.get("/", authMiddleware, getInventory);
