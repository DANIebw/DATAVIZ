import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function MapByDistrict({ tournages }: { tournages: any[] }) {
  const counts: Record<string, number> = {};

  tournages.forEach((t) => {
    const arr = t.ardt_lieu;
    if (!arr) return;

    if (counts[arr]) {
      counts[arr] += 1;
    } else {
      counts[arr] = 1;
    }
  });

  // 2️⃣ Transformer l'objet en tableau exploitable par Recharts
  const data = Object.entries(counts).map(([arr, count]) => ({
    arrondissement: arr,
    count: count,
  }));

  // 3️⃣ 🔥 TRIER dans l'ordre croissant des arrondissements
  data.sort((a, b) => Number(a.arrondissement) - Number(b.arrondissement));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, bottom: 50, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="arrondissement" type="category" width={80} />

          <Tooltip />

          <Bar dataKey="count" fill="#4fa3ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default MapByDistrict;
