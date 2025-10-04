import DashboardLayout from "../components/DashboardLayout";
import { Truck, Package, CheckCircle, Clock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";


function DriverDashboard() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-600">Chargement...</p>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Veuillez vous connecter</h1>
      </DashboardLayout>
    );
  }

  // ⚡ Récupère depuis le user si dispo, sinon fallback de test
  const deliveries = user.deliveries || [
    { id: 1, title: "Palette de vêtements", status: "En cours" },
    { id: 2, title: "Équipements électroniques", status: "Livrée" },
    { id: 3, title: "Produits alimentaires", status: "En attente" },
  ];

  // 📊 Statistiques auto-calculées
  const totalDeliveries = deliveries.length;
  const ongoingDeliveries = deliveries.filter((d) => d.status === "En cours").length;
  const completedDeliveries = deliveries.filter((d) => d.status === "Livrée").length;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-2">Tableau de bord Transporteur</h1>
      <p className="text-gray-600 mb-6">
        Bienvenue, <span className="font-semibold">{user.pseudo || user.nom}</span>
      </p>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Truck size={32} className="text-orange-500" />
          <div>
            <p className="text-gray-600">Courses totales</p>
            <h2 className="text-xl font-bold">{totalDeliveries}</h2>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Clock size={32} className="text-yellow-600" />
          <div>
            <p className="text-gray-600">En cours</p>
            <h2 className="text-xl font-bold">{ongoingDeliveries}</h2>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <CheckCircle size={32} className="text-green-600" />
          <div>
            <p className="text-gray-600">Livrées</p>
            <h2 className="text-xl font-bold">{completedDeliveries}</h2>
          </div>
        </div>
      </div>

      {/* Bouton trouver une course */}
      <div className="flex justify-end mb-6">
        <Link
          to="/FindDelivery"
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <Package size={20} />
          Trouver une course
        </Link>
      </div>

      {/* Liste des livraisons */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Livraisons récentes</h2>
        {deliveries.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucune livraison trouvée</p>
        ) : (
          <ul className="divide-y">
            {deliveries.map((delivery) => (
              <li
                key={delivery.id}
                className="py-3 flex justify-between items-center"
              >
                <span>{delivery.title}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    delivery.status === "Livrée"
                      ? "bg-green-100 text-green-700"
                      : delivery.status === "En cours"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {delivery.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DriverDashboard;
