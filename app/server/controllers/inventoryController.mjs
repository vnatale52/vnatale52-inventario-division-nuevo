import { query } from "../database.mjs";

export async function getInventory(req, res) {
  const result = await query("SELECT * FROM inventario ORDER BY id ASC");
  res.json(result.rows);
}
