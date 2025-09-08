import { Link } from "react-router-dom";
import Hero from "../components/Hero";

function Home() {
  return (
    <div>
      {/* Hero visible seulement ici */}
      <Hero />

      {/* Contenu d’accueil */}
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Bienvenue sur <span className="text-[#F97316]">Kargo</span>
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
          La solution moderne pour vos livraisons et transports.  
          Simple, rapide et fiable pour les expediteurs comme pour les transporteurs.
        </p>

        <div className="flex gap-6">
          <Link
            to="/login"
            className="px-6 py-3 bg-[#0a1d40] text-white rounded-xl shadow-md hover:bg-[#F97316] transition"
          >
            Se connecter
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 border-2 border-[#0a1d40] text-[#0a1d40] rounded-xl shadow-md hover:bg-[#0a1d40] hover:text-white transition"
          >
            S’inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
