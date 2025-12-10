import fs from "fs";
import { parse } from "csv-parse/sync";
import { query } from "./database.mjs";

const csv = fs.readFileSync("./data/usuarios.csv", "utf8");
const rows = parse(csv, { columns: true });

for (const r of rows) {
  await query(
    "INSERT INTO usuarios (username, password) VALUES ($1, $2)",
    [r.username, r.password]
  );
}

console.log("Usuarios importados.");
