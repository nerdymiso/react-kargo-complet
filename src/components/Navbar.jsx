import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import logo from "../assets/logo.png";
import { LogOut } from "lucide-react";

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // retour à l'accueil
    } catch (err) {
      console.error("❌ Erreur logout:", err.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a1d40] text-white shadow-lg z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Kargo Logo" className="h-12" />
        </Link>

        {/* Links */}
        <div className="flex gap-6 font-semibold items-center">
          <Link to="/" className="hover:text-[#F97316] transition">
            Accueil
          </Link>
          <Link to="/contact" className="hover:text-[#F97316] transition">
            Contact
          </Link>

          {user ? (
            <>
              <span className="text-orange-400">
                Hi, {user?.pseudo}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                aria-label="Se déconnecter"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#F97316] transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-[#F97316] transition">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
