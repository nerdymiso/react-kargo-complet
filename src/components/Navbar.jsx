import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a1d40] text-white shadow-lg z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Kargo Logo" className="h-12" />
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6 font-semibold">
          <Link to="/" className="hover:text-[#F97316] transition">
            Accueil
          </Link>
          <Link to="/services" className="hover:text-[#F97316] transition">
            Services
          </Link>
          <Link to="/contact" className="hover:text-[#F97316] transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
