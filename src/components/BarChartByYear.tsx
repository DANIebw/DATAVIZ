// React : useMemo permet d'optimiser le calcul (ne se relance que si tournages change)
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Définition du type attendu en props
// Chaque tournage peut ou non contenir l'année
type Props = {
  tournages: {
    annee_tournage?: string;
  }[];
};

// Component qui affiche un graphique des tournages par année
export default function BarChartByYear({ tournages }: Props) {
  // Transformation des données API → format adapté au graphique
  // Exemple sortie : [{ annee: "2020", count: 18 }, { annee: "2021", count: 25 }]
  const dataParAnnee = useMemo(() => {
    return tournages.reduce((acc: any[], t) => {
      // Si l'année est absente, on met "Inconnue"
      const annee = t.annee_tournage || "Inconnue";

      // Vérifie si l'année existe déjà dans notre tableau
      const exist = acc.find((item) => item.annee === annee);

      if (exist) {
        // Si oui → on augmente le nombre de tournages
        exist.count += 1;
      } else {
        // Si non → on ajoute une nouvelle entrée
        acc.push({ annee, count: 1 });
      }
      return acc;
    }, []);
  }, [tournages]); // ⚡ Recalcule uniquement quand tournages change

  // 🧱Affichage du graphique avec Recharts
  return (
    <BarChart data={dataParAnnee} width={400} height={260}>
      {/* Fond quadrillé du graphique */}
      <CartesianGrid strokeDasharray="3 3" />

      {/* Axe horizontal → Années */}
      <XAxis dataKey="annee" stroke="#ffffff" />

      {/* Axe vertical → Nombre de tournages */}
      <YAxis stroke="#ffffff" />

      {/* Info-bulle au survol */}
      <Tooltip />

      {/* Barres du graphique → colorées */}
      <Bar dataKey="count" fill="#6f1d1b" />
    </BarChart>
  );
}
