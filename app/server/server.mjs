import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/auth.mjs";
import { router as inventoryRoutes } from "./routes/inventory.mjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend escuchando en puerto ${PORT}`));
