import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { History } from "lucide-react";

function DriverHistory() {
  const [pastDeliveries] = useState([
    {
      id: 1,
      client: "Entreprise A",
      marchandises: "Électroniques",
      adresse: "Alger → Oran",
      date: "02/09/2025",
    },
    {
      id: 2,
      client: "Entreprise B",
      marchandises: "Textiles",
      adresse: "Alger → Tizi Ouzou",
      date: "05/09/2025",
    },
  ]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <History className="w-6 h-6 text-orange-500" /> Missions passées
      </h1>

      <div className="grid gap-4">
        {pastDeliveries.length === 0 ? (
          <p className="text-gray-500">Aucune mission terminée pour l’instant ✅</p>
        ) : (
          pastDeliveries.map((d) => (
            <div
              key={d.id}
              className="p-4 bg-white shadow rounded-lg border-l-4 border-green-500"
            >
              <p className="font-semibold">{d.client}</p>
              <p className="text-gray-600">{d.marchandises}</p>
              <p className="text-sm text-gray-500">{d.adresse}</p>
              <p className="text-xs text-gray-400">Livrée le {d.date}</p>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default DriverHistory;
