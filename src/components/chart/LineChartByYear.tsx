// React : useMemo permet d'optimiser le calcul (ne se relance que si tournages change)
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Définition du type attendu en props
// Chaque tournage peut ou non contenir l'année
type Props = {
  tournages: {
    annee_tournage: string;
  }[];
};
type YearCount = {
  annee: string;
  count: number;
};

// Component qui affiche un graphique des tournages par année
export default function LineChartByYear({ tournages }: Props) {
  // Transformation des données API → format adapté au graphique
  // Exemple sortie : [{ annee: "2020", coun
  const dataParAnnee = useMemo(() => {
    const dataYear = tournages.reduce((acc: YearCount[], t) => {
      const annee = t.annee_tournage || "Inconnue";
      const exist = acc.find((item) => item.annee === annee);

      if (exist) exist.count++;
      else acc.push({ annee, count: 1 });

      return acc;
    }, []);
    // 🧠 TRIER les années (sinon le graphique est dans le désordre)
    dataYear.sort((a, b) => {
      const yearA = Number(a.annee);
      const yearB = Number(b.annee);

      if (isNaN(yearA)) return 1;
      if (isNaN(yearB)) return -1;

      return yearA - yearB;
    });

    return dataYear;
  }, [tournages]);

  // ⚡ Recalcule uniquement quand tournages change

  // Affichage du graphique avec Recharts
  return (
    <LineChart data={dataParAnnee} width={400} height={260}>
      {/* Fond quadrillé du graphique */}
      <CartesianGrid strokeDasharray="3 3" />

      {/* Axe horizontal → Années */}
      <XAxis dataKey="annee" stroke="#ffffff" />

      {/* Axe vertical → Nombre de tournages */}
      <YAxis stroke="#ffffff" />

      {/* Info-bulle au survol */}
      <Tooltip />

      {/* Barres du graphique → colorées */}
      <Line dataKey="count" fill="#6f1d1b" />
    </LineChart>
  );
}
