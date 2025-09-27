// src/pages/OrderTracking.jsx
import DashboardLayout from "../components/DashboardLayout";
function OrderTracking() {
  const order = {
    id: "CMD12345",
    status: "En cours de livraison",
    location: "Alger - Bab Ezzouar",
    estimatedDelivery: "2025-09-15",
  };

  return (
 <DashboardLayout>
    <div className="p-6 max-w-xl mx-auto">
    
      <h1 className="text-2xl font-bold mb-6">Suivi de Commande</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        <p><strong>Numéro de commande:</strong> {order.id}</p>
        <p><strong>Statut:</strong> {order.status}</p>
        <p><strong>Localisation actuelle:</strong> {order.location}</p>
        <p><strong>Date estimée de livraison:</strong> {order.estimatedDelivery}</p>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default OrderTracking;
