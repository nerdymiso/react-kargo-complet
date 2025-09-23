import { Link } from "react-router-dom";

function Sidebar({ role }) {
  return (
    <aside className="w-64 bg-[#0a1d40] text-white flex flex-col p-6 space-y-6">
      <h1 className="text-xl font-bold">Kargo</h1>

      <nav className="flex flex-col space-y-4">
        {role === "client" ? (
          <>
            <Link to="/ClientDashboard" className="hover:text-orange-400">Accueil</Link>
            <Link to="/NewOrder" className="hover:text-orange-400">Nouvelle commande</Link>
            <Link to="/OrdersTracking" className="hover:text-orange-400">Suivi colis</Link>
            <Link to="/Profile" className="hover:text-orange-400">Profil</Link>
            <Link to="/Settings" className="hover:text-orange-400">Paramètres</Link>
          </>
        ) : (
          <>
            <Link to="/DriverDashboard" className="hover:text-orange-400">Accueil</Link>
            <Link to="/DriverHistory" className="hover:text-orange-400">Historique</Link>
            <Link to="/Profile" className="hover:text-orange-400">Profil</Link>
            <Link to="/Settings" className="hover:text-orange-400">Paramètres</Link>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
