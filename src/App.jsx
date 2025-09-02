import Header from "./components/Header";
import Services from "./components/Services";

function App() {
  const servicesList = ["Transport", "Livraison", "Suivi en temps réel"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 text-gray-800">
      <Header
        title="Kargo Website"
        slogan="Ta marchandise, notre mission"
      />

      <Services items={servicesList} />

      <footer className="mt-12 py-6 text-center text-gray-600 text-sm bg-blue-200">
        &copy; {new Date().getFullYear()} Kargo. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;
