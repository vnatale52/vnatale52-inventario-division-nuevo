import express from "express";
import { login } from "../controllers/authController.mjs";

export const router = express.Router();

router.post("/login", login);
