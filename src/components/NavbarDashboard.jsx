// components/NavbarDashboard.jsx
function NavbarDashboard() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Tableau de bord</h2>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
        Déconnexion
      </button>
    </header>
  );
}

export default NavbarDashboard;
