import axios from "axios";
import { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable.jsx";

export default function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadInventory() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/";
          return;
        }

        const r = await axios.get(
          `${import.meta.env.VITE_API_URL}/inventory`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setItems(r.data);
      } catch (err) {
        console.error("Error cargando inventario", err);
        alert("Error cargando inventario.");
      }
    }

    loadInventory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <InventoryTable items={items} />
    </div>
  );
}
