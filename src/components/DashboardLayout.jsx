// components/DashboardLayout.jsx
import Sidebar from "./Sidebar";
import NavbarDashboard from "./NavbarDashboard";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar en haut */}
        <NavbarDashboard />

        {/* Zone de contenu */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
