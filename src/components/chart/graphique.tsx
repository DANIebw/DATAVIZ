import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Tournage = {
  annee_tournage?: string | number | null;
  type_tournage?: string | null;
};

type ChartPoint = {
  annee: number;
  longMetraj: number;
  serieTV: number;
  telefilm: number;
};

const TYPE_CONFIG = [
  {
    key: "longMetraj" as const,
    matcher: (raw: string) => raw.toLowerCase().includes("long"),
  },
  {
    key: "serieTV" as const,
    matcher: (raw: string) => raw.toLowerCase().includes("série"),
  },
  {
    key: "telefilm" as const,
    matcher: (raw: string) => raw.toLowerCase().includes("téléfilm"),
  },
];

type GraphiqueProps = {
  tournages: Tournage[];
};

/* ---------------------------------------------------------
    FONCTION : construit les données {annee, longMetraj, ...}
--------------------------------------------------------- */
function buildChartData(tournages: Tournage[]): ChartPoint[] {
  const yearMap = new Map<
    number,
    { longMetraj: number; serieTV: number; telefilm: number }
  >();

  for (const t of tournages) {
    if (!t.annee_tournage || !t.type_tournage) continue;

    const annee = Number(t.annee_tournage);
    if (Number.isNaN(annee)) continue;

    const typeRaw = t.type_tournage.trim();
    if (!typeRaw) continue;

    const base = yearMap.get(annee) ?? {
      longMetraj: 0,
      serieTV: 0,
      telefilm: 0,
    };

    for (const config of TYPE_CONFIG) {
      if (config.matcher(typeRaw)) {
        base[config.key] += 1;
        break;
      }
    }

    yearMap.set(annee, base);
  }

  return Array.from(yearMap.entries())
    .map(([annee, counts]) => ({
      annee,
      ...counts,
    }))
    .sort((a, b) => a.annee - b.annee);
}

/* ---------------------------------------------------------
    COMPOSANT GRAPHIQUE RECHARTS
--------------------------------------------------------- */
function LineChartByThemes({ data }: { data: ChartPoint[] }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />

          <XAxis
            dataKey="annee"
            tick={{ fill: "#e5e7eb", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#e5e7eb", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              borderRadius: 8,
              border: "1px solid #475569",
              fontSize: 12,
            }}
            labelStyle={{ color: "#e5e7eb" }}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 12 }}
          />

          <Line
            type="monotone"
            dataKey="longMetraj"
            name="Long métrage"
            stroke="#38bdf8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="serieTV"
            name="Série TV"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="telefilm"
            name="Téléfilm"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------------------------------------------------------
    COMPOSANT PRINCIPAL : Graphique
--------------------------------------------------------- */
export default function Graphique({ tournages }: GraphiqueProps) {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const fullData = buildChartData(tournages);

  const filteredData =
    selectedYear === "all"
      ? fullData
      : fullData.filter((d) => d.annee === selectedYear);

  const years = [...new Set(fullData.map((d) => d.annee))];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Sélecteur d'année */}
      <select
        className="p-2 bg-sky-950 text-white rounded-lg border border-white/20"
        value={selectedYear}
        onChange={(e) =>
          setSelectedYear(
            e.target.value === "all" ? "all" : Number(e.target.value)
          )
        }
      >
        <option value="all">Toutes les années</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Graphique */}
      <LineChartByThemes data={filteredData} />
    </div>
  );
}
