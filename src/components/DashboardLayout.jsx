// src/components/DashboardLayout.jsx
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, User, Settings } from "lucide-react";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col h-full">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-orange-500">Kargo</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            to="/DriverDashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100"
          >
            <LayoutDashboard size={20} /> Tableau de bord
          </Link>
          <Link
            to="/NewOrder"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100"
          >
            <PlusCircle size={20} /> Nouvelle commande
          </Link>
          <Link
            to="/OrdersTracking"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100"
          >
            <Package size={20} /> Suivi des commandes
          </Link>
          <Link
            to="/Profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100"
          >
            <User size={20} /> Profil
          </Link>
          <Link
            to="/Settings"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-100"
          >
            <Settings size={20} /> Paramètres
          </Link>
        </nav>

        
      </aside>

      {/* Contenu */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;
