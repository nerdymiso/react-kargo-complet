import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function DriverDashboard() {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      client: "Entreprise A",
      marchandises: "Électroniques",
      statut: "En cours",
      adresse: "Alger → Oran",
    },
    {
      id: 2,
      client: "Entreprise B",
      marchandises: "Textiles",
      statut: "En cours",
      adresse: "Alger → Tizi Ouzou",
    },
  ]);

  const markAsDelivered = (id) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, statut: "Livrée" } : d
      )
    );
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Truck className="w-6 h-6 text-orange-500" /> Missions en cours
      </h1>

      <div className="grid gap-4">
        {deliveries.length === 0 ? (
          <p className="text-gray-500">Aucune mission en cours 🚚</p>
        ) : (
          deliveries.map((d) => (
            <div
              key={d.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{d.client}</p>
                <p className="text-gray-600">{d.marchandises}</p>
                <p className="text-sm text-gray-500">{d.adresse}</p>
                <p className="text-sm text-yellow-600 font-medium">
                  {d.statut}
                </p>
              </div>

              <button
                onClick={() => markAsDelivered(d.id)}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <CheckCircle className="w-4 h-4" /> Marquer livrée
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/DriverHistory"
          className="text-orange-500 hover:underline font-semibold"
        >
          Voir missions passées →
        </Link>
      </div>
    </DashboardLayout>
  );
}

export default DriverDashboard;
