import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {
  const location = useLocation();

  // Define links for each role
  const links =
    role === "transporteur"
      ? [
          { to: "/DriverDashboard", label: "Accueil" },
          { to: "/DriverHistory", label: "Historique" },
          { to: "/Profile", label: "Profil" },
          { to: "/Settings", label: "Paramètres" },
        ]
      : [
          { to: "/ClientDashboard", label: "Accueil" },
          { to: "/NewOrder", label: "Nouvelle commande" },
          { to: "/OrdersTracking", label: "Suivi colis" },
          { to: "/Profile", label: "Profil" },
          { to: "/Settings", label: "Paramètres" },
        ];

  return (
    <aside className="w-64 bg-[#0a1d40] text-white flex flex-col p-6 space-y-8">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold text-center tracking-wide">Kargo</h1>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-2 rounded transition ${
              location.pathname === link.to
                ? "bg-orange-500 text-white font-semibold"
                : "hover:text-orange-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
