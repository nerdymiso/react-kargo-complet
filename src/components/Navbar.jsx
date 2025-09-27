import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import logo from "../assets/logo.png"; // ✅ import instead of hardcoding path

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // ✅ go back to homepage ("/")
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
                Hi, {user.pseudo || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
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
