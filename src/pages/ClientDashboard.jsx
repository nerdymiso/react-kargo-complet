import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Package, Truck, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { supabase } from "../services/supabase";

function ClientDashboard() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error fetching orders:", error.message);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

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
        Bienvenue, {user.pseudo} 👋
      </h1>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Package size={32} className="text-orange-500" />
          <div>
            <p className="text-gray-600">Commandes totales</p>
            <h2 className="text-xl font-bold">{orders.length}</h2>
          </div>
        </div>
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Truck size={32} className="text-green-600" />
          <div>
            <p className="text-gray-600">En livraison</p>
            <h2 className="text-xl font-bold">
              {orders.filter((o) => o.status === "in_progress").length}
            </h2>
          </div>
        </div>
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Package size={32} className="text-blue-600" />
          <div>
            <p className="text-gray-600">Livrées</p>
            <h2 className="text-xl font-bold">
              {orders.filter((o) => o.status === "delivered").length}
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
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">Aucune commande pour l’instant.</p>
        ) : (
          <ul className="divide-y">
            {orders.map((order) => (
              <li
                key={order.id}
                className="py-3 flex justify-between items-center"
              >
                <span>
                  {order.description || `${order.pickup_address} → ${order.delivery_address}`}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "in_progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ClientDashboard;
