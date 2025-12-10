import fs from "fs";
import { parse } from "csv-parse/sync";
import { query } from "./database.mjs";

const csv = fs.readFileSync("./data/Inventario.csv", "utf8");
const rows = parse(csv, { columns: true });

for (const r of rows) {
  await query(
    "INSERT INTO inventario (columna, descripcion, cantidad) VALUES ($1, $2, $3)",
    [r.columna, r.descripcion, r.cantidad]
  );
}

console.log("Inventario importado.");
