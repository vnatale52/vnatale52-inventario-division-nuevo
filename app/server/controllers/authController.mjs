import jwt from "jsonwebtoken";
import { query } from "../database.mjs";

export async function login(req, res) {
  const { username, password } = req.body;

  const result = await query("SELECT * FROM usuarios WHERE username=$1", [username]);

  if (result.rows.length === 0)
    return res.status(401).json({ error: "Usuario incorrecto" });

  const user = result.rows[0];

  if (user.password !== password)
    return res.status(401).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "12h" });

  res.json({ token });
}
