import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <p className="text-gray-700 text-lg mb-6">
        Oups 😅 La page que vous cherchez n’existe pas.
      </p>
      <Link
        to="/"
        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default NotFound;
