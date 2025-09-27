import DashboardLayout from "../components/DashboardLayout";
import { Package, Truck, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/UserContext"; // ✅

function ClientDashboard() {
  const { user } = useUser(); // ✅ utiliser le hook, pas useContext(UserContext)

  if (!user) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Veuillez vous connecter</h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Bienvenue, {user.pseudo || user.name} 👋
      </h1>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Package size={32} className="text-orange-500" />
          <div>
            <p className="text-gray-600">Commandes totales</p>
            <h2 className="text-xl font-bold">{user.orders?.length || 0}</h2>
          </div>
        </div>
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Truck size={32} className="text-green-600" />
          <div>
            <p className="text-gray-600">En livraison</p>
            <h2 className="text-xl font-bold">
              {user.orders?.filter((o) => o.status === "En cours").length || 0}
            </h2>
          </div>
        </div>
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Package size={32} className="text-blue-600" />
          <div>
            <p className="text-gray-600">Livrées</p>
            <h2 className="text-xl font-bold">
              {user.orders?.filter((o) => o.status === "Livrée").length || 0}
            </h2>
          </div>
        </div>
      </div>

      {/* Bouton nouvelle commande */}
      <div className="flex justify-end mb-6">
        <Link
          to="/NewOrder"
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <PlusCircle size={20} />
          Nouvelle commande
        </Link>
      </div>

      {/* Liste des commandes */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Commandes récentes</h2>
        <ul className="divide-y">
          {user.orders?.map((order) => (
            <li
              key={order.id}
              className="py-3 flex justify-between items-center"
            >
              <span>{order.title}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Livrée"
                    ? "bg-green-100 text-green-700"
                    : order.status === "En cours"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
}

export default ClientDashboard;
