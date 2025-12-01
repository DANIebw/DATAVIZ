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
    <div className="w-full flex justify-center">
      <BarChart width={400} height={260} data={dataTypes}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" stroke="#ffffff" />
        <YAxis stroke="#ffffff" />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default TournagesParType;
