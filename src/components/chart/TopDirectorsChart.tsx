import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function TopDirectorsChart({ tournages }: { tournages: any[] }) {
  // 1️⃣ On initialise un objet pour compter combien de fois chaque réalisateur apparaît
  const counts: Record<string, number> = {};

  // 2️⃣ On parcourt *tous* les tournages
  tournages.forEach((t) => {
    const director = t.nom_realisateur;

    // Si pas de réalisateur → on ignore
    if (!director) return;

    // 3️⃣ Un champ peut contenir plusieurs réalisateurs séparés par des virgules.
    // Exemple : "JEREMY GARELICK, SPIRO RAZATOS"
    const list = director.split(",");

    // 4️⃣ On parcourt chacun des noms dans la liste
    list.forEach((name: string) => {
      const cleanName = name.trim(); // enlever les espaces

      if (!cleanName) return;

      // 5️⃣ On incrémente le compteur
      if (counts[cleanName]) {
        counts[cleanName] += 1;
      } else {
        counts[cleanName] = 1;
      }
    });
  });

  // 6️⃣ On transforme l'objet { "Nom": count } → en tableau d'objets pour Recharts
  const data = Object.entries(counts).map(([directorName, count]) => ({
    director: directorName,
    count: count,
  }));

  // 7️⃣ On trie du plus grand au plus petit
  data.sort((a, b) => b.count - a.count);

  // 8️⃣ On garde seulement le top 10
  const top10 = data.slice(0, 10);

  // graphique 4
  return (
    <div style={{ width: "100%", height: 400 }} className="animate-fade-in-up">
      <ResponsiveContainer>
        <BarChart
          data={top10}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="director" angle={-35} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#4ade80"
            animationDuration={800}
            animationBegin={200}
          />{" "}
          {/* vert clair */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopDirectorsChart;
