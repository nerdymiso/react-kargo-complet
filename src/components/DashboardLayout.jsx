import Sidebar from "./Sidebar";
import useUserRole from "../hooks/useUserRole";

function DashboardLayout({ children }) {
  const { role, loading } = useUserRole();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar dynamique */}
      <Sidebar role={role} />

      {/* Contenu */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;
