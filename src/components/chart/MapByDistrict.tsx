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
    // On récupère l’arrondissement (ex: "75018")
    const arr = t.ardt_lieu;

    // Certains enregistrements peuvent être "null" → on les ignore
    if (!arr) return;
    // Si l’arrondissement existe déjà dans l'objet counts → +1
    if (counts[arr]) {
      counts[arr] += 1;
    } else {
      // Sinon, on l’initialise à 1
      counts[arr] = 1;
    }
  });

  const data = Object.entries(counts).map(([arr, count]) => ({
    arrondissement: arr,
    count: count,
  }));

  // transformer les entrées en objets { arrondissement, count }

  // 5️⃣ - On trie le tableau du plus grand au plus petit nombre de tournages
  data.sort((a, b) => b.count - a.count);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 50, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* Arrondissements en bas */}
          <XAxis
            dataKey="arrondissement"
            type="category"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
          />

          {/* Nombre de tournages en vertical */}
          <YAxis type="number" />

          <Tooltip />

          <Bar dataKey="count" fill="#4fa3ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MapByDistrict;
