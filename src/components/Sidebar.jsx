// components/Sidebar.jsx
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-[#0a1d40] text-white flex flex-col p-6 space-y-6">
      <h1 className="text-xl font-bold">Kargo</h1>

      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="hover:text-orange-400">Accueil</Link>
        <Link to="/NewOrder" className="hover:text-orange-400">Nouvelle commande</Link>
        <Link to="/OrdersTracking" className="hover:text-orange-400">Suivi colis</Link>
        <Link to="/Profile" className="hover:text-orange-400">Profil</Link>
        <Link to="/Settings" className="hover:text-orange-400">Paramètres</Link>
        <Link to="/DriverHistory" className="hover:text-orange-400">Historique</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
//**import { Link } from "react-router-dom";
//function Sidebar({role}) => {
  //return (
    // Exemple : Sidebar.jsx
//import React from "react";
//import { Link } from "react-router-dom";

/**const Sidebar = ({ role }) => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      
      {role === "shipper" ? (
        // Dashboard expéditeur
        <ul>
          <li><Link to="/NewOrder">Nouvelle commande</Link></li>
          <li><Link to="/ClientDashboard">Tableau de bord</Link></li>
          <li><Link to="/OrdersTracking">Suivi des commandes</Link></li>
          <li><Link to="/Settings">Paramètres</Link></li>
          <li><Link to="/Profile">Profil</Link></li>
        </ul>
      ) : (
        // Dashboard transporteur
        <ul>
          <li><Link to="/DriverDashboard">Tableau de bord</Link></li>
          <li><Link to="/DriverHistory">Historique des livraisons</Link></li>
          <li><Link to="/Profile">Profil</Link></li>
          <li><Link to="/Settings">Paramètres</Link>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;*/

