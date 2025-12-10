import { useState, useMemo } from "react";

export default function InventoryTable({ items }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  function toggleSort(field) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const filtered = useMemo(() => {
    return items
      .filter((i) =>
        JSON.stringify(i).toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDir === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [items, search, sortField, sortDir]);

  return (
    <div style={styles.wrapper}>
      <h2>Inventario</h2>

      <input
        placeholder="Buscar..."
        style={styles.search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th} onClick={() => toggleSort("id")}>
              ID {sortField === "id" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={styles.th} onClick={() => toggleSort("columna")}>
              Columna {sortField === "columna" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={styles.th} onClick={() => toggleSort("descripcion")}>
              Descripción {sortField === "descripcion" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={styles.th} onClick={() => toggleSort("cantidad")}>
              Cantidad {sortField === "cantidad" ? (sortDir === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((i) => (
            <tr key={i.id}>
              <td style={styles.td}>{i.id}</td>
              <td style={styles.td}>{i.columna}</td>
              <td style={styles.td}>{i.descripcion}</td>
              <td style={styles.td}>{i.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "95%",
    margin: "30px auto",
  },
  search: {
    padding: "10px",
    marginBottom: "15px",
    width: "200px",
    border: "1px solid #888",
    borderRadius: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
  },
  th: {
    padding: "10px",
    borderBottom: "2px solid #444",
    cursor: "pointer",
    background: "#ddd",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #ccc",
  },
};
