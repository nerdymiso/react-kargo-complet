import Header from "./components/Header";
import Services from "./components/Services";

function App() {
  const servicesList = ["Transport", "Livraison", "Suivi en temps réel"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Header
        title="Kargo Website"
        slogan="Ta marchandise, notre mission"
      />

      <Services items={servicesList} />

      <footer className="mt-16 py-6 text-center text-gray-500 text-sm bg-gray-200">
        &copy; {new Date().getFullYear()} Kargo. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;
