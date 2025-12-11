import express from "express";
import { login, register } from "../controllers/authController.mjs";
export const router = express.Router();
router.post("/login", login);
router.post("/register", register);
