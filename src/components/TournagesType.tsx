import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Type représentant un tournage brut venant de l'API
type Tournage = {
  type_tournage?: string;
};

// Type pour représenter un résultat regroupé { type, count }
type TypeCount = {
  type: string;
  count: number;
};

function TournagesParType({ tournages }: { tournages: Tournage[] }) {
  // Regroupement par type ,  // Objectif : compter combien de fois chaque type apparaît
  const dataTypes = tournages.reduce((acc: TypeCount[], t) => {
    const type = t.type_tournage || "Inconnu";
    const exist = acc.find((item) => item.type === type);

    if (exist) exist.count++;
    else acc.push({ type, count: 1 });

    return acc;
  }, [] as TypeCount[]);

  // Affichage graphique 1
  return (
    <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
      <h2 className="text-lg font-semibold">
        Long métrage, Série TV, Téléfilm…
      </h2>
      <p className="text-xs opacity-80">Répartition des types de tournages.</p>
      <div className="w-full flex justify-center">
        <BarChart width={400} height={260} data={dataTypes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}

export default TournagesParType;

// import TournagesParType from "@/components/TournagesParType";
