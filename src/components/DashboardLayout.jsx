import Sidebar from "./Sidebar";
import { useUser } from "../hooks/UserContext";

function DashboardLayout({ children }) {
  const { user } = useUser(); // récupère user (et setUser si besoin)

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Veuillez vous connecter...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar dynamique en fonction du rôle */}
      <Sidebar role={user.role} />

      {/* Contenu */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;
